// App.js - Using window.location.hash for simple routing
import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';

function App() {
  // Get the current route from the URL hash
  const getRouteFromHash = () => {
    return window.location.hash.replace('#', '') || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getRouteFromHash());

  // Update the current page when the hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="App">
      <Nav currentPage={currentPage || 'home'} />
    </div>
  );
}

export default App;