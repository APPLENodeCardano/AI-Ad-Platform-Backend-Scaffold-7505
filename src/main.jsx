import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Add error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Add navigation debugging with more details
const originalPushState = history.pushState;
history.pushState = function(...args) {
  console.log('Navigation: pushState', args[2], 'State:', args[0]);
  return originalPushState.apply(this, args);
};

const originalReplaceState = history.replaceState;
history.replaceState = function(...args) {
  console.log('Navigation: replaceState', args[2], 'State:', args[0]);
  return originalReplaceState.apply(this, args);
};

// Log all clicks for debugging
document.addEventListener('click', function(e) {
  const target = e.target.closest('a[href], button');
  if (target) {
    const tagName = target.tagName.toLowerCase();
    const href = target.getAttribute('href');
    console.log(`Clicked ${tagName}${href ? ' with href: ' + href : ''}`);
  }
});

// Render the app with more detailed error handling
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App successfully rendered');
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; margin: 20px;">
      <h1 style="color: #b91c1c; font-size: 24px;">App Failed to Load</h1>
      <pre style="background-color: #ffffff; padding: 10px; border-radius: 4px; overflow: auto;">${error.message}\n\n${error.stack}</pre>
    </div>
  `;
}