import React from 'react';
import './App.css';
import { Header, Footer } from './components';
import {
  About,
  Contact,
  LandingPage,
  Login,
  NotFound,
  Register,
} from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="page-container flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
