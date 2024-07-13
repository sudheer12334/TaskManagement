import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="App-header">
      <h1>Task Manager</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;