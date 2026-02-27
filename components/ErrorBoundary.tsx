
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

// A separate functional component is needed to use the useTheme hook.
const ErrorFallbackUI: React.FC = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
            <div className="text-center p-8 border border-red-500/30 bg-gray-800/50 rounded-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-red-400 mb-4">An Unexpected Error Occurred</h1>
                <p className="text-gray-400 mb-6">Something went wrong on our end. Please try refreshing the page.</p>
                <button
                    onClick={() => window.location.reload()}
                    className={`${themeClasses.bg} text-white font-semibold px-6 py-3 rounded-lg ${themeClasses.hoverBg} transition-colors`}
                >
                    Refresh Page
                </button>
            </div>
        </div>
    );
}


interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary class component to catch rendering errors in the component tree.
 * Inheriting from Component ensures 'props' and 'state' are correctly typed and available on 'this'.
 */
class ErrorBoundary extends Component<Props, State> {
  // Explicitly declare props to resolve "Property 'props' does not exist" errors that can occur when inheritance is not correctly resolved in certain environments.
  public props: Props;

  // Use class property for state initialization to resolve "Property 'state' does not exist" errors that can occur when TypeScript fails to bind 'this' correctly in constructors for some environments.
  public state: State = {
    hasError: false
  };

  // Add constructor to explicitly handle property initialization for the props fix.
  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    // Use this.state.hasError to determine whether to show fallback UI or children.
    if (this.state.hasError) {
      // Render the theme-aware fallback UI
      return <ErrorFallbackUI />;
    }

    // Accessing children via this.props which is correctly inherited from the Component base class.
    return this.props.children;
  }
}

export default ErrorBoundary;
