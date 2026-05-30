package httpapi

import "net/http"

func (s *Server) handleNewsFeed(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.NewsFeed(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleNewsFeatured(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.NewsFeatured(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleExploreProducts(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.ExploreProducts(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleExploreLayers(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.ExploreLayers(r.Context())
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}
