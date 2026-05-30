// Package ws implements a minimal WebSocket hub that fans broadcast messages
// out to all connected clients. It is transport for the live market feed.
package ws

import (
	"context"
	"log/slog"
)

// Hub tracks connected clients and broadcasts messages to all of them.
type Hub struct {
	register   chan *Client
	unregister chan *Client
	broadcast  chan []byte
	clients    map[*Client]struct{}
}

// NewHub constructs an empty hub. Call Run in a goroutine to start it.
func NewHub() *Hub {
	return &Hub{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan []byte, 16),
		clients:    make(map[*Client]struct{}),
	}
}

// Run owns the client set; all mutation happens on this goroutine so no locks
// are needed. It exits when ctx is cancelled.
func (h *Hub) Run(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			for c := range h.clients {
				close(c.send)
			}
			return
		case c := <-h.register:
			h.clients[c] = struct{}{}
		case c := <-h.unregister:
			if _, ok := h.clients[c]; ok {
				delete(h.clients, c)
				close(c.send)
			}
		case msg := <-h.broadcast:
			for c := range h.clients {
				select {
				case c.send <- msg:
				default:
					// Slow client: drop it rather than block the hub.
					delete(h.clients, c)
					close(c.send)
				}
			}
		}
	}
}

// Broadcast queues a message for delivery to all clients. Never blocks: if the
// buffer is full the message is dropped (the next tick supersedes it anyway).
func (h *Hub) Broadcast(msg []byte) {
	select {
	case h.broadcast <- msg:
	default:
		slog.Debug("ws hub broadcast buffer full; dropping message")
	}
}
