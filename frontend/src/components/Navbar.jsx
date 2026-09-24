import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Menu, X, Activity, BarChart2, Database, Info, ShieldAlert } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-wrapper">
            <Heart className="logo-icon" fill="#DC2626" color="#DC2626" size={24} />
          </div>
          <span className="logo-text">Cardio<span className="logo-accent">Predict</span></span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>

          <NavLink to="/assessment" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Risk Assessment
          </NavLink>

          <NavLink to="/results" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Results
          </NavLink>

          <NavLink to="/performance" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Model Performance
          </NavLink>

          <NavLink to="/dataset" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Dataset
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About
          </NavLink>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation">
          {mobileMenuOpen ? <X size={26} color="#0F2747" /> : <Menu size={26} color="#0F2747" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          <NavLink to="/" className="mobile-link" onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink to="/assessment" className="mobile-link" onClick={closeMobileMenu}>
            Risk Assessment
          </NavLink>
          <NavLink to="/results" className="mobile-link" onClick={closeMobileMenu}>
            Results
          </NavLink>
          <NavLink to="/performance" className="mobile-link" onClick={closeMobileMenu}>
            Model Performance
          </NavLink>
          <NavLink to="/dataset" className="mobile-link" onClick={closeMobileMenu}>
            Dataset
          </NavLink>
          <NavLink to="/about" className="mobile-link" onClick={closeMobileMenu}>
            About
          </NavLink>
        </div>
      )}

      <style>{`
        .navbar-header {
          background-color: #FFFFFF;
          border-bottom: 1.5px solid #E2E8F0;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(15, 39, 71, 0.04);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }

        .logo-icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F2747;
          letter-spacing: -0.02em;
        }

        .logo-accent {
          color: #2563EB;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link {
          font-size: 0.92rem;
          font-weight: 600;
          color: #475569;
          padding: 0.5rem 0.9rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .nav-link:hover {
          color: #2563EB;
          background-color: #EFF6FF;
        }

        .nav-link.active {
          color: #2563EB;
          background-color: #EFF6FF;
          font-weight: 700;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.3rem;
        }

        .mobile-menu {
          display: flex;
          flex-direction: column;
          background-color: #FFFFFF;
          border-bottom: 1.5px solid #E2E8F0;
          padding: 1rem 1.5rem;
          gap: 0.5rem;
        }

        .mobile-link {
          font-size: 1rem;
          font-weight: 600;
          color: #1E293B;
          padding: 0.75rem;
          border-radius: 8px;
          text-decoration: none;
        }

        .mobile-link:hover {
          background-color: #EFF6FF;
          color: #2563EB;
        }

        @media (max-width: 850px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
