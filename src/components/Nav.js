// components/Nav.js
import React from 'react';
import Home from './Home';
import About from './About';
import Profile from './Profile';
import Archives from './Archives';
import Contact from './Contact';
import '../styles/Nav.css';

function Nav({ currentPage = 'home' }) {
  // Render the current page based on the URL hash
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'profile':
        return <Profile />;
      case 'archives':
        return <Archives />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <header>
        <h1>
          <a href="#home">prompted</a>
        </h1>
        <nav>
          <ul className="nav-bar">
            <li>
              <a 
                href="#about" 
                className={`section-link ${currentPage === 'about' ? 'active-link' : ''}`}
              >
                about
              </a>
            </li>
            <li>
              <a 
                href="#profile" 
                className={`section-link ${currentPage === 'profile' ? 'active-link' : ''}`}
              >
                profile
              </a>
            </li>
            <li>
              <a 
                href="#archives" 
                className={`section-link ${currentPage === 'archives' ? 'active-link' : ''}`}
              >
                archives
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`section-link ${currentPage === 'contact' ? 'active-link' : ''}`}
              >
                contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {renderPage()}
      </main>
    </>
  );
}

export default Nav;