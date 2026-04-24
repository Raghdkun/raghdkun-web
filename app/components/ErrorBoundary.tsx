"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0a0a0a", zIndex: 99998 }}
        >
          {/* Film grain */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Frame corners */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-8 left-8 w-10 h-10 border-l border-t border-white/20" />
            <div className="absolute top-8 right-8 w-10 h-10 border-r border-t border-white/20" />
            <div className="absolute bottom-8 left-8 w-10 h-10 border-l border-b border-white/20" />
            <div className="absolute bottom-8 right-8 w-10 h-10 border-r border-b border-white/20" />
          </div>

          {/* Error indicator top-left */}
          <div
            className="absolute top-10 left-10 flex items-center gap-3"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span
              className="text-red-400/70"
              style={{ fontSize: "11px", letterSpacing: "0.35em" }}
            >
              REEL ERROR — SIGNAL LOST
            </span>
          </div>

          {/* Center content */}
          <div className="relative z-10 text-center px-6 max-w-lg">
            {/* Glitch title */}
            <h1
              className="hero-title glitch mb-6"
              data-text="CUT!"
              style={{
                color: "#f0ede8",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                letterSpacing: "0.08em",
                lineHeight: 0.9,
              }}
            >
              CUT!
            </h1>

            <p
              className="playfair italic text-white/50 text-lg mb-2"
              style={{ lineHeight: 1.6 }}
            >
              Something went wrong during the scene.
            </p>

            <p
              className="text-white/20 mb-10"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                wordBreak: "break-word",
              }}
            >
              {process.env.NODE_ENV === "development"
                ? this.state.error?.message || "Unknown error"
                : "An unexpected error occurred."}
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={this.handleRetry}
                className="btn-cine border border-white/40 px-8 py-4 text-xs tracking-[0.2em] text-white/80"
              >
                <span>RETRY SCENE</span>
              </button>
              <button
                onClick={this.handleReload}
                className="btn-cine border border-white/20 px-8 py-4 text-xs tracking-[0.2em] text-white/50"
              >
                <span>RELOAD REEL</span>
              </button>
            </div>
          </div>

          {/* Film counter bottom-right */}
          <span
            className="absolute bottom-10 right-10 text-white/15"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1rem, 3vw, 2rem)",
              letterSpacing: "0.1em",
            }}
          >
            ERR_001
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}
