import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useAuth } from './contexts/AuthContext';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { TimeContextProvider } from './contexts/timeContext';
import { ChipsContextProvider } from './contexts/chipsContext';
import { AuthProvider } from './contexts/AuthContext';
// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function AppProviders() {
  const { user } = useAuth();
  return (
    <ChipsContextProvider>
      <TimeContextProvider>
        <RouterProvider router={router} context={{ user }} />
      </TimeContextProvider>
    </ChipsContextProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProviders />
    </AuthProvider>
  </React.StrictMode>
);
