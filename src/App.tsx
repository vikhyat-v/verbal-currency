import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import About from './pages/About';
import FAQPage from './pages/FAQ';
import Contact from './pages/Contact';
import Simulator from './pages/Simulator';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
