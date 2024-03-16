import React from 'react';
import { Link } from 'react-router-dom';


function Header({ setShowProducts }) {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products" onClick={() => setShowProducts(true)}>Products</Link></li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;
