import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-black text-primary-fixed tracking-tighter font-headline-md">
          SolveX
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="text-on-surface-variant font-medium hover:text-primary-fixed transition-colors duration-200 font-label-bold"
            to="/about"
          >
            About us
          </Link>
          <Link
            className="text-on-surface-variant font-medium hover:text-primary-fixed transition-colors duration-200 font-label-bold"
            to="services"
          >
            Services 
          </Link>
        </nav>
        <button className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-fixed/30 bg-primary-fixed/5'>
          Get in touch
        </button>
        <div className="md:hidden">
          <span
            className="material-symbols-outlined text-primary-fixed cursor-pointer"
            data-icon="menu"
          >
            menu
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;