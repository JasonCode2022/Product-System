import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import WelcomePage from './components/WelcomePage';




function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (

    <Router>
      <div className="App">
        <Header setShowProducts={setShowProducts} />

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          {showProducts && <Route path="/products" element={<ProductPage />} />}
        </Routes>
      </div>
    </Router>
    
  );
}




export default App;
