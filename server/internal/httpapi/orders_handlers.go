package httpapi

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/afriqx/server/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

func (s *Server) handleGetOrders(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Orders(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

type placeOrderRequest struct {
	Symbol   string  `json:"symbol"`
	Type     string  `json:"type"`     // Market | Limit | Stop
	Side     string  `json:"side"`     // Buy | Sell
	Qty      float64 `json:"qty"`      // number of units
	Price    float64 `json:"price"`    // unit price
	Currency string  `json:"currency"` // e.g. "NGN" (optional)
}

var validOrderType = map[string]bool{"Market": true, "Limit": true, "Stop": true}
var validOrderSide = map[string]bool{"Buy": true, "Sell": true}

func (s *Server) handlePlaceOrder(w http.ResponseWriter, r *http.Request) {
	var req placeOrderRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	req.Symbol = strings.TrimSpace(req.Symbol)
	req.Currency = strings.TrimSpace(req.Currency)

	switch {
	case req.Symbol == "":
		writeError(w, http.StatusBadRequest, "symbol is required")
		return
	case !validOrderType[req.Type]:
		writeError(w, http.StatusBadRequest, "type must be Market, Limit or Stop")
		return
	case !validOrderSide[req.Side]:
		writeError(w, http.StatusBadRequest, "side must be Buy or Sell")
		return
	case req.Qty <= 0:
		writeError(w, http.StatusBadRequest, "qty must be positive")
		return
	case req.Price < 0:
		writeError(w, http.StatusBadRequest, "price cannot be negative")
		return
	}

	// Market orders fill immediately; resting orders stay pending.
	status := "Pending"
	if req.Type == "Market" {
		status = "Filled"
	}

	order := &models.Order{
		ID:     uuid.NewString(),
		Symbol: req.Symbol,
		Type:   req.Type,
		Side:   req.Side,
		Qty:    formatThousands(req.Qty),
		Price:  formatMoney(req.Price, req.Currency),
		Status: status,
	}
	if err := s.store.CreateOrder(r.Context(), mustUserID(r), order); err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, order)
}

func (s *Server) handleCancelOrder(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	order, err := s.store.CancelOrder(r.Context(), mustUserID(r), id)
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, order)
}

// formatThousands renders a quantity with comma grouping, dropping a trailing
// ".00" for whole numbers (e.g. 12500 -> "12,500", 1.5 -> "1.5").
func formatThousands(v float64) string {
	whole := v == float64(int64(v))
	var s string
	if whole {
		s = strconv.FormatInt(int64(v), 10)
	} else {
		s = strconv.FormatFloat(v, 'f', -1, 64)
	}
	intPart, frac, hasFrac := strings.Cut(s, ".")
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
	if hasFrac {
		res += "." + frac
	}
	if neg {
		res = "-" + res
	}
	return res
}

// formatMoney renders a price with two decimals and optional currency prefix.
func formatMoney(v float64, currency string) string {
	amount := formatThousands2dp(v)
	if currency == "" {
		return amount
	}
	return currency + " " + amount
}

func formatThousands2dp(v float64) string {
	s := strconv.FormatFloat(v, 'f', 2, 64)
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
	res := b.String() + "." + frac
	if neg {
		res = "-" + res
	}
	return res
}
