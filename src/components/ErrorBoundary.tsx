import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode; // Тип ReactNode для дочерних элементов
  fallback?: ReactNode; // Опциональный запасной UI
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логика обработки ошибки (например, логирование)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
