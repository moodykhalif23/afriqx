package httpapi

import (
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/afriqx/server/internal/models"
	"github.com/google/uuid"
)

func (s *Server) handleCurrencies(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Currencies(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

// handleFxQuote returns a direct conversion quote. Public — no settlement.
func (s *Server) handleFxQuote(w http.ResponseWriter, r *http.Request) {
	from := strings.ToUpper(strings.TrimSpace(r.URL.Query().Get("from")))
	to := strings.ToUpper(strings.TrimSpace(r.URL.Query().Get("to")))
	if from == "" || to == "" {
		writeError(w, http.StatusBadRequest, "from and to are required")
		return
	}
	amount := 1.0
	if raw := r.URL.Query().Get("amount"); raw != "" {
		v, err := strconv.ParseFloat(raw, 64)
		if err != nil || v < 0 {
			writeError(w, http.StatusBadRequest, "amount must be a non-negative number")
			return
		}
		amount = v
	}
	rate, err := s.store.FxRate(r.Context(), from, to)
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, models.FxQuote{
		From:      from,
		To:        to,
		Amount:    amount,
		Rate:      round6(rate),
		Converted: round2(amount * rate),
	})
}

type convertRequest struct {
	From   string  `json:"from"`
	To     string  `json:"to"`
	Amount float64 `json:"amount"`
}

// handleConvert executes and records a conversion for the authenticated user.
func (s *Server) handleConvert(w http.ResponseWriter, r *http.Request) {
	var req convertRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	req.From = strings.ToUpper(strings.TrimSpace(req.From))
	req.To = strings.ToUpper(strings.TrimSpace(req.To))
	switch {
	case req.From == "" || req.To == "":
		writeError(w, http.StatusBadRequest, "from and to are required")
		return
	case req.From == req.To:
		writeError(w, http.StatusBadRequest, "from and to must differ")
		return
	case req.Amount <= 0:
		writeError(w, http.StatusBadRequest, "amount must be positive")
		return
	}

	rate, err := s.store.FxRate(r.Context(), req.From, req.To)
	if err != nil {
		writeStoreError(w, err)
		return
	}

	conv := &models.Conversion{
		ID:        uuid.NewString(),
		From:      req.From,
		To:        req.To,
		Amount:    req.Amount,
		Rate:      round6(rate),
		Converted: round2(req.Amount * rate),
	}
	if err := s.store.ConvertFunds(r.Context(), mustUserID(r), conv); err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, conv)
}

// handleBalances returns the authenticated user's per-currency cash balances.
func (s *Server) handleBalances(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Balances(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleConversions(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Conversions(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func round2(v float64) float64 { return math.Round(v*100) / 100 }
func round6(v float64) float64 { return math.Round(v*1e6) / 1e6 }
