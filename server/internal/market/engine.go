package market

import (
	"context"
	"encoding/json"
	"math"
	"math/rand"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/afriqx/server/internal/store"
)

// Broadcaster is the subset of the WS hub the engine depends on.
type Broadcaster interface {
	Broadcast([]byte)
}

type tickState struct {
	label    string
	value    float64
	change   float64
	decimals int
	grouped  bool
}

type pairState struct {
	pair      string
	basePrice float64
	price     float64
	change    float64
}

// Engine holds live market state and emits periodic ticks.
type Engine struct {
	hub      Broadcaster
	interval time.Duration
	rng      *rand.Rand

	mu     sync.Mutex
	ticker []tickState
	pair   pairState
}

func New(hub Broadcaster, interval time.Duration, rngSeed int64) *Engine {
	return &Engine{
		hub:      hub,
		interval: interval,
		rng:      rand.New(rand.NewSource(rngSeed)),
	}
}

// Load seeds engine state from the current database values.
func (e *Engine) Load(ctx context.Context, s *store.Store) error {
	items, err := s.Ticker(ctx)
	if err != nil {
		return err
	}
	ts := make([]tickState, 0, len(items))
	for _, it := range items {
		v, dec, grouped := parseNumber(it.Value)
		ts = append(ts, tickState{label: it.Label, value: v, change: it.Change, decimals: dec, grouped: grouped})
	}

	ap, err := s.ActivePair(ctx)
	if err != nil {
		return err
	}

	e.mu.Lock()
	e.ticker = ts
	e.pair = pairState{pair: ap.Pair, basePrice: ap.Price, price: ap.Price, change: ap.Change}
	e.mu.Unlock()
	return nil
}

// Run emits a tick every interval until ctx is cancelled.
func (e *Engine) Run(ctx context.Context) {
	t := time.NewTicker(e.interval)
	defer t.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			e.hub.Broadcast(e.step())
		}
	}
}

// step advances the random walk one tick and returns the JSON snapshot.
func (e *Engine) step() []byte {
	e.mu.Lock()
	defer e.mu.Unlock()

	type tickOut struct {
		Label  string  `json:"label"`
		Value  string  `json:"value"`
		Change float64 `json:"change"`
	}
	out := struct {
		Type   string    `json:"type"`
		TS     int64     `json:"ts"`
		Ticker []tickOut `json:"ticker"`
		Pair   struct {
			Pair      string  `json:"pair"`
			Price     float64 `json:"price"`
			Change    float64 `json:"change"`
			ChangeAbs float64 `json:"changeAbs"`
		} `json:"activePair"`
	}{Type: "tick", TS: time.Now().UnixMilli()}

	for i := range e.ticker {
		t := &e.ticker[i]
		drift := (e.rng.Float64() - 0.5) * 0.004 // ±0.2%
		t.value *= 1 + drift
		t.change = round2(t.change + (e.rng.Float64()-0.5)*0.15)
		out.Ticker = append(out.Ticker, tickOut{
			Label:  t.label,
			Value:  formatNumber(t.value, t.decimals, t.grouped),
			Change: t.change,
		})
	}

	drift := (e.rng.Float64() - 0.5) * 0.004
	e.pair.price *= 1 + drift
	e.pair.change = round2(e.pair.change + (e.rng.Float64()-0.5)*0.1)
	out.Pair.Pair = e.pair.pair
	out.Pair.Price = round4(e.pair.price)
	out.Pair.Change = e.pair.change
	out.Pair.ChangeAbs = round4(e.pair.price - e.pair.basePrice)

	b, _ := json.Marshal(out)
	return b
}

// parseNumber extracts a float from a formatted string like "2,158.45",
// returning the value, its decimal-place count and whether it was grouped.
func parseNumber(s string) (value float64, decimals int, grouped bool) {
	grouped = strings.Contains(s, ",")
	clean := strings.ReplaceAll(s, ",", "")
	if dot := strings.IndexByte(clean, '.'); dot >= 0 {
		decimals = len(clean) - dot - 1
	}
	value, _ = strconv.ParseFloat(clean, 64)
	return value, decimals, grouped
}

// formatNumber renders v with the given decimal places and optional thousands
// grouping, matching the original seed formatting.
func formatNumber(v float64, decimals int, grouped bool) string {
	s := strconv.FormatFloat(v, 'f', decimals, 64)
	if !grouped {
		return s
	}
	intPart, frac, _ := strings.Cut(s, ".")
	neg := strings.HasPrefix(intPart, "-")
	intPart = strings.TrimPrefix(intPart, "-")

	var b strings.Builder
	n := len(intPart)
	for i, ch := range intPart {
		if i > 0 && (n-i)%3 == 0 {
			b.WriteByte(',')
		}
		b.WriteRune(ch)
	}
	res := b.String()
	if frac != "" {
		res += "." + frac
	}
	if neg {
		res = "-" + res
	}
	return res
}

func round2(v float64) float64 { return math.Round(v*100) / 100 }
func round4(v float64) float64 { return math.Round(v*10000) / 10000 }
