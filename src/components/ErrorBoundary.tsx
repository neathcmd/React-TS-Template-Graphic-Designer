import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }; // Initialize with no error
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }; // Update state with the error
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Reload Page
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
