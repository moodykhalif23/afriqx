package httpapi

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
)

func (s *Server) handleGetWatchlist(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Watchlist(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleGetCatalog(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Catalog(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

type addWatchlistRequest struct {
	Symbol string `json:"symbol"`
}

func (s *Server) handleAddWatchlist(w http.ResponseWriter, r *http.Request) {
	var req addWatchlistRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	req.Symbol = strings.TrimSpace(req.Symbol)
	if req.Symbol == "" {
		writeError(w, http.StatusBadRequest, "symbol is required")
		return
	}
	if err := s.store.AddToWatchlist(r.Context(), mustUserID(r), req.Symbol); err != nil {
		writeStoreError(w, err)
		return
	}
	data, err := s.store.Watchlist(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, data)
}

func (s *Server) handleRemoveWatchlist(w http.ResponseWriter, r *http.Request) {
	symbol := chi.URLParam(r, "symbol")
	if err := s.store.RemoveFromWatchlist(r.Context(), mustUserID(r), symbol); err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusNoContent, nil)
}
