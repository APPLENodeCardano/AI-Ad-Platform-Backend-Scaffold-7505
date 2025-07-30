import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import Analytics from './pages/Analytics';
import GeofenceManager from './pages/GeofenceManager';
import './App.css';

// Add console logging to track route changes
const RouteTracker = () => {
  useEffect(() => {
    console.log('Current route:', window.location.hash);
    console.log('Current pathname:', window.location.pathname);
  }, []);
  return null;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Routing error caught:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <details className="bg-white p-4 rounded-lg">
            <summary className="text-red-600 font-medium cursor-pointer">Show error details</summary>
            <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => window.location.href = '#/'}
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log("App rendering");
  
  // Log initial route for debugging
  useEffect(() => {
    console.log("Initial route:", window.location.hash);
    console.log("Initial pathname:", window.location.pathname);
  }, []);
  
  return (
    <Router>
      <ErrorBoundary>
        <RouteTracker />
        <Layout>
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/create" element={<CreateCampaign />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/geofences" element={<GeofenceManager />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;