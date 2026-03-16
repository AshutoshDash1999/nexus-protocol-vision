
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { GraphComplexityProvider } from './contexts/GraphComplexityContext';
import { ErrorStateProvider } from './contexts/ErrorStateContext';
import { DiagnosticLogProvider } from './contexts/DiagnosticLogContext';
import { RealTimeProvider } from './contexts/RealTimeContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <GraphComplexityProvider>
          <ErrorStateProvider>
            <DiagnosticLogProvider>
              <RealTimeProvider>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </RealTimeProvider>
            </DiagnosticLogProvider>
          </ErrorStateProvider>
        </GraphComplexityProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
