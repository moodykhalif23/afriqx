package httpapi

import "net/http"

func (s *Server) handleIndices(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Indices(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleAFXI(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Benchmark(r.Context(), "AFXI")
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleFx(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.FxPairs(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleFxHeatmap(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.FxHeatmap(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleEquities(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Equities(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleCommodities(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Commodities(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleMovers(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Movers(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleTicker(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Ticker(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleActivePair(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.ActivePair(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleCandles(w http.ResponseWriter, r *http.Request) {
	pair := r.URL.Query().Get("pair")
	if pair == "" {
		pair = "NGN / KES"
	}
	data, err := s.store.Candles(r.Context(), pair)
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}
