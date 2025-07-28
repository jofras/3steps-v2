import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import mainIcon from '../assets/main_icon_cropped.png';

const navItems = [
  { label: 'Programs', to: '/programs' },
  { label: 'Multimedia', to: '/multimedia', dropdown: [
    { label: 'Gallery', href: '/multimedia#photos' },
    { label: 'Videos', to: '/multimedia#videos' },
    { label: 'News', href: '/news' }
  ]},
  { label: 'About', to: '/about/whoweare', dropdown: [
    { label: 'Who We Are', to: '/about/whoweare' }, 
    { label: 'Our Purpose', to: '/about/purpose' },
    { label: 'Why 3 Steps?', to: '/about/why-3-steps' }
  ]},
  { label: 'Partners', to: '/partners' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false); // close mobile menu on route change
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDropdownEnter = (label) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setDropdownTimeout(timeout);
  };

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-nav' : 'bg-transparent'} font-body`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5 md:py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
        <img
          src={mainIcon}
          alt="3Steps Athletics Logo"
          className="h-10 md:h-12 object-contain"
        />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item, idx) => (
            item.dropdown ? (
              <div 
                key={item.label} 
                className="relative group"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link to={item.to} className="font-medium text-textdark hover:text-primary transition-colors duration-200 focus:outline-none">
                  {item.label}
                </Link>
                <div className={`absolute left-0 mt-2 w-48 bg-white rounded shadow-lg transition-opacity duration-200 pointer-events-none z-20 ${activeDropdown === item.label ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
                  {item.dropdown.map((sub, i) => (
                    sub.href ? (
                      <a key={sub.label} href={sub.href} className="block px-4 py-2 text-sm text-textdark hover:bg-background hover:text-primary transition-colors duration-150">
                        {sub.label}
                      </a>
                    ) : (
                      <Link key={sub.label} to={sub.to} className="block px-4 py-2 text-sm text-textdark hover:bg-background hover:text-primary transition-colors duration-150">
                        {sub.label}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.label} to={item.to || `/${item.label.toLowerCase()}`} className="font-medium text-textdark hover:text-primary transition-colors duration-200">
                {item.label}
              </Link>
            )
          ))}
        </div>
        {/* Hamburger for mobile */}
        <button className="md:hidden flex flex-col items-center gap-[4px]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span className="w-6 h-1 bg-primary rounded transition-all duration-200"></span>
          <span className="w-6 h-1 bg-primary rounded transition-all duration-200"></span>
          <span className="w-6 h-1 bg-primary rounded transition-all duration-200"></span>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-nav px-4 py-2 space-y-2 animate-fade-in-down">
          {navItems.map((item) => (
            item.dropdown ? (
              <div key={item.label}>
                <div className="font-medium text-textdark mb-1">{item.label}</div>
                <div className="pl-2 space-y-1">
                  {item.dropdown.map((sub) => (
                    sub.href ? (
                      <a key={sub.label} href={sub.href} className="block text-sm text-textdark hover:text-primary transition-colors duration-150">
                        {sub.label}
                      </a>
                    ) : (
                      <Link key={sub.label} to={sub.to} className="block text-sm text-textdark hover:text-primary transition-colors duration-150">
                        {sub.label}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.label} to={item.to || `/${item.label.toLowerCase()}`} className="block font-medium text-textdark hover:text-primary transition-colors duration-200">
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
}