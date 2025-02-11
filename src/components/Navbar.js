// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            paddingLeft: '10px'
          }}
        >
          Emoji Survey 🎯😊
        </span>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{
            marginRight: '10px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          &#9776;
        </button>
      </div>
      {isOpen && (
        <ul
          className="nav-links"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <li style={{ margin: '10px 0' }}>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Questionario
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Admin
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
