import React from "react";
import { BrowserRouter as Router, Link, Routes, Route, Navigate } from "react-router-dom";
import About from './About';
import Archives from './Archives';
import Profile from './Profile'
import Contact from './Contact';
import Home from './Home';

function Nav() {
  return (
    <Router>
      <header className="flex-row px-1">
        <h1>
          <Link to="/">prompted</Link>
        </h1>
        <nav>
          <ul className="flex-row nav-bar">
            <li>
              <Link to="/about" className="section-link">
                about
              </Link>
            </li>
            <li>
              <Link to="/profile" className="section-link">
                profile
              </Link>
            </li>
            <li>
              <Link to="/archives" className="section-link">
                archives
              </Link>
            </li>
            <li>
              <Link to="/contact" className="section-link">
                contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route 
        path="*"
        element={<Navigate to="/home" />}
        >
        </Route>
        <Route 
        path="/about"
        element={<About/>}
        >
        </Route>
        <Route 
        path="/profile"
        element={<Profile/>}
        >
        </Route>
        <Route 
        path="/archives"
        element={<Archives/>}
        >
        </Route>
        <Route path="/contact"
        element={<Contact/>}
        >
        </Route>
        <Route path="/home" element={<Home/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default Nav;