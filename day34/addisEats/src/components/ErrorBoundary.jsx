// src/components/ErrorBoundary.jsx
import { Component, Fragment } from "react";

/**
 * Class component — React still has no hook equivalent for
 * componentDidCatch / getDerivedStateFromError.
 *
 * `reset()` bumps an internal key so children remount cleanly after a fix.
 */
class ErrorBoundary extends Component {
  state = { error: null, resetKey: 0 };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Swap for your logger (Sentry, etc.) — this is the only place
    // that should touch the error object.
    console.error(`[ErrorBoundary:${this.props.label ?? "?"}]`, error, info);
  }

  reset = () =>
    this.setState((s) => ({ error: null, resetKey: s.resetKey + 1 }));

  render() {
    const { error, resetKey } = this.state;
    const { children, fallback, label } = this.props;

    if (error) {
      if (typeof fallback === "function") {
        return fallback({ error, reset: this.reset });
      }
      return (
        <div role="alert" className="error-boundary">
          <h3>Something went wrong{label ? ` in ${label}` : ""}.</h3>
          <p className="error-boundary__msg">{error.message}</p>
          <button type="button" onClick={this.reset}>
            Try again
          </button>
        </div>
      );
    }

    return <Fragment key={resetKey}>{children}</Fragment>;
  }
}

export default ErrorBoundary;
