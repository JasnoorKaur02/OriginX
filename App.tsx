
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import OriginXApp from './components/OriginXApp';

type RouteState = 'landing' | 'auth' | 'app';

const App: React.FC = () => {
  const [route, setRoute] = useState<RouteState>('landing');

  // Simple state-based routing
  const navigateToLanding = () => setRoute('landing');
  const navigateToAuth = () => setRoute('auth');
  const navigateToApp = () => setRoute('app');

  return (
    <>
      {route === 'landing' && (
        <LandingPage 
          onGetStarted={navigateToAuth} 
          onSignIn={navigateToAuth} 
        />
      )}
      
      {route === 'auth' && (
        <AuthPage 
          onAuthSuccess={navigateToApp} 
          onBack={navigateToLanding} 
        />
      )}
      
      {route === 'app' && (
        <div className="animate-in fade-in duration-700">
          <OriginXApp />
        </div>
      )}
    </>
  );
};

export default App;
