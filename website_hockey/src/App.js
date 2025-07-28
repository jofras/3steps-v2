import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Contact from './pages/Contact';
import About from './pages/About';
import Multimedia from './pages/Multimedia';
import Partners from './pages/Partners';
import News from './pages/News';
import NewsPost from './pages/NewsArticle';
import Programs from './pages/Programs';
import SignUp from './pages/SignUp'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* <-- Add this right after <Router> */}
      <div className="min-h-screen bg-background font-body text-textdark flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about/*" element={<About />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/news" element={<News />} />
            <Route path="/multimedia/news/:slug" element={<NewsPost />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/signup" element={<SignUp />} />
            {/* More routes will be added here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
