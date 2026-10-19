import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import AboutUs from "./components/AboutUs";
import "./App.css";

function Navbar() {
  const items = useSelector((state) => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link className="brand" to="/">Paradise Nursery</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">🛒 Cart ({count})</Link>
      </div>
    </nav>
  );
}

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Your destination for beautiful houseplants and a greener home.</p>
        <Link to="/plants">
          <button className="primary-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plants" element={<><Navbar /><ProductList /></>} />
      <Route path="/cart" element={<><Navbar /><CartItem /></>} />
      <Route path="/about" element={<><Navbar /><AboutUs /></>} />
    </Routes>
  );
}