import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { APP_NAME } from '../../utils/constants';
import './Navbar.css';

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/#features', label: 'Features' },
  { to: '/#contact', label: 'Contact' },
];

const appLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/assessment', label: 'Skill Analysis' },
  { to: '/resume', label: 'Resume Analysis' },
  { to: '/roadmap', label: 'Learning Roadmap' },
  { to: '/projects', label: 'Projects' },
  { to: '/interview', label: 'Interview Prep' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to={user ? '/dashboard' : '/'} className="navbar-logo">
          <span className="navbar-logo-icon">
            <BrainCircuit size={20} />
          </span>
          <span className="navbar-logo-text">{APP_NAME}</span>
        </Link>
        <nav className="navbar-links">
          {user ? (
            <>
              {appLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <button className="navbar-logout" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              {publicLinks.map((l) => (
                <a key={l.label} href={l.to} className="navbar-link">
                  {l.label}
                </a>
              ))}
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary navbar-cta">
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
