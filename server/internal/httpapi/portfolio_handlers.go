package httpapi

import "net/http"

func (s *Server) handleGetPortfolio(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Portfolio(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleGetPortfolioSummary(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.PortfolioSummary(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleGetPositions(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Positions(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleGetAnalytics(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Analytics(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}
