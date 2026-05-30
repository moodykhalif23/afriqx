// Command docgen auto-generates routing documentation from the chi router,
// emitting JSON and/or Markdown. It builds the real router (with stub deps,
// since handlers are never invoked) and walks it — so docs can never drift
// from the routes that are actually registered.
//
// Usage:
//
//	go run ./cmd/docgen                 # writes docs/api.json and docs/api.md
//	go run ./cmd/docgen -format md      # only Markdown
//	go run ./cmd/docgen -stdout         # print to stdout instead of files
//	go run ./cmd/docgen -out ./public   # custom output directory
package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/afriqx/server/internal/apidoc"
	"github.com/afriqx/server/internal/auth"
	"github.com/afriqx/server/internal/config"
	"github.com/afriqx/server/internal/httpapi"
	"github.com/go-chi/chi/v5"
)

func main() {
	format := flag.String("format", "both", "output format: json | md | both")
	outDir := flag.String("out", "docs", "output directory")
	toStdout := flag.Bool("stdout", false, "print to stdout instead of writing files")
	flag.Parse()

	if err := run(*format, *outDir, *toStdout); err != nil {
		fmt.Fprintln(os.Stderr, "docgen:", err)
		os.Exit(1)
	}
}

func run(format, outDir string, toStdout bool) error {
	// Build the real router. Handlers are method values that are never called
	// during a route walk, so stub store/hub (nil) are fine; cfg/auth must be
	// non-nil because Handler() references them while registering middleware.
	cfg := &config.Config{CORSOrigins: []string{"*"}}
	authn := auth.New("docgen", time.Hour)
	srv := httpapi.NewServer(nil, authn, nil, cfg, nil)

	router, ok := srv.Handler().(chi.Routes)
	if !ok {
		return fmt.Errorf("router does not implement chi.Routes")
	}

	routes, err := apidoc.Generate(router)
	if err != nil {
		return err
	}
	if missing := apidoc.Missing(routes); len(missing) > 0 {
		fmt.Fprintf(os.Stderr, "docgen: warning — %d route(s) lack metadata:\n", len(missing))
		for _, m := range missing {
			fmt.Fprintln(os.Stderr, "  -", m)
		}
	}

	wantJSON := format == "json" || format == "both"
	wantMD := format == "md" || format == "both"
	if !wantJSON && !wantMD {
		return fmt.Errorf("invalid -format %q (want json | md | both)", format)
	}

	jsonBytes, err := apidoc.RenderJSON(routes)
	if err != nil {
		return err
	}
	md := apidoc.RenderMarkdown(routes, "AFRIQX API Reference")

	if toStdout {
		if wantJSON {
			fmt.Println(string(jsonBytes))
		}
		if wantMD {
			fmt.Println(md)
		}
		return nil
	}

	if err := os.MkdirAll(outDir, 0o755); err != nil {
		return err
	}
	if wantJSON {
		p := filepath.Join(outDir, "api.json")
		if err := os.WriteFile(p, append(jsonBytes, '\n'), 0o644); err != nil {
			return err
		}
		fmt.Println("wrote", p)
	}
	if wantMD {
		p := filepath.Join(outDir, "api.md")
		if err := os.WriteFile(p, []byte(md), 0o644); err != nil {
			return err
		}
		fmt.Println("wrote", p)
	}
	fmt.Printf("documented %d routes\n", len(routes))
	return nil
}
