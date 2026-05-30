package httpapi

import (
	"net/http"
	"strings"

	"github.com/afriqx/server/internal/models"
)

func (s *Server) handleGetSettings(w http.ResponseWriter, r *http.Request) {
	data, err := s.store.Settings(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, data)
}

func (s *Server) handleUpdateSettings(w http.ResponseWriter, r *http.Request) {
	var st models.Settings
	if err := decodeJSON(r, &st); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	st.Name = strings.TrimSpace(st.Name)
	if st.Name == "" {
		writeError(w, http.StatusBadRequest, "name is required")
		return
	}
	if err := s.store.UpdateSettings(r.Context(), mustUserID(r), &st); err != nil {
		writeStoreError(w, err)
		return
	}
	// Return the persisted state (email/name re-joined from the account).
	updated, err := s.store.Settings(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, updated)
}
