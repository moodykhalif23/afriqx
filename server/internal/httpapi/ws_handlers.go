package httpapi

import (
	"log/slog"
	"net/http"

	"github.com/afriqx/server/internal/ws"
)

// handleWS upgrades the connection and joins it to the live-feed hub. The
// upgrade is gated by the configured CORS origins.
func (s *Server) handleWS(w http.ResponseWriter, r *http.Request) {
	if err := ws.Serve(s.hub, w, r, s.cfg.CORSOrigins); err != nil {
		slog.Warn("websocket upgrade failed", "err", err)
	}
}
