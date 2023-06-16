import * as React from 'react';

interface FallbackProps {
  error: Error;
  resetAndNotify: () => void;
  resetErrorState: () => void;
}

interface ErrorBoundaryPropsWithComponent {
  onReset?: () => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  FallbackComponent: React.ComponentType<FallbackProps>;
}

type ErrorBoundaryState = { error: Error | null };

const initialState: ErrorBoundaryState = { error: null };

class ErrorBoundary extends React.Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryPropsWithComponent>>,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  state = initialState;
  resetAndNotify = () => {
    this.props.onReset?.();
    this.reset();
  };
  resetErrorState = () => {
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    const { error } = this.state;
    const { FallbackComponent } = this.props;

    if (error !== null) {
      const props = {
        error,
        resetErrorState: this.resetErrorState,
        resetAndNotify: this.resetAndNotify
      };

      return <FallbackComponent {...props} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
export type { FallbackProps, ErrorBoundaryPropsWithComponent };
