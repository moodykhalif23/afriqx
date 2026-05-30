package httpapi

import (
	"net/http"
	"strings"
	"time"

	"github.com/afriqx/server/internal/models"
	"github.com/google/uuid"
)

type authResponse struct {
	Token     string     `json:"token"`
	ExpiresAt time.Time  `json:"expiresAt"`
	User      publicUser `json:"user"`
}

type publicUser struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
	Tier  string `json:"tier"`
}

func toPublic(u *models.User) publicUser {
	return publicUser{ID: u.ID, Email: u.Email, Name: u.Name, Tier: u.Tier}
}

type registerRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

func (s *Server) handleRegister(w http.ResponseWriter, r *http.Request) {
	var req registerRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.Name = strings.TrimSpace(req.Name)

	if !strings.Contains(req.Email, "@") {
		writeError(w, http.StatusBadRequest, "a valid email is required")
		return
	}
	if len(req.Password) < 6 {
		writeError(w, http.StatusBadRequest, "password must be at least 6 characters")
		return
	}
	if req.Name == "" {
		req.Name = req.Email[:strings.IndexByte(req.Email, '@')]
	}

	hash, err := s.auth.HashPassword(req.Password)
	if err != nil {
		writeStoreError(w, err)
		return
	}

	user := &models.User{
		ID:           uuid.NewString(),
		Email:        req.Email,
		Name:         req.Name,
		Tier:         "Pro Trader",
		PasswordHash: hash,
	}
	if err := s.store.CreateUser(r.Context(), user); err != nil {
		writeStoreError(w, err)
		return
	}

	// Seed the new account with starter data so the app is populated.
	if err := s.provision(r.Context(), user.ID); err != nil {
		writeStoreError(w, err)
		return
	}

	s.issueToken(w, user, http.StatusCreated)
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *Server) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := decodeJSON(r, &req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))

	user, err := s.store.GetUserByEmail(r.Context(), req.Email)
	if err != nil || !s.auth.CheckPassword(user.PasswordHash, req.Password) {
		// Uniform message: do not leak whether the email exists.
		writeError(w, http.StatusUnauthorized, "invalid email or password")
		return
	}
	s.issueToken(w, user, http.StatusOK)
}

func (s *Server) issueToken(w http.ResponseWriter, user *models.User, status int) {
	token, exp, err := s.auth.Issue(user.ID)
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, status, authResponse{Token: token, ExpiresAt: exp, User: toPublic(user)})
}

func (s *Server) handleMe(w http.ResponseWriter, r *http.Request) {
	user, err := s.store.GetUserByID(r.Context(), mustUserID(r))
	if err != nil {
		writeStoreError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, toPublic(user))
}
