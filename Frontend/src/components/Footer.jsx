import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest py-8 border-t border-white/5 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-7xl mx-auto gap-4">
        <div className="text-sm font-bold text-white font-headline-md">
          SolveX
        </div>
        <div className="flex gap-6">
          <Link
            className="text-on-surface-variant font-label-bold text-xs uppercase tracking-widest hover:text-primary-fixed transition-colors"
            to="#"
          >
            Privacy
          </Link>
          <Link
            className="text-on-surface-variant font-label-bold text-xs uppercase tracking-widest hover:text-primary-fixed transition-colors"
            to="#"
          >
            Terms
          </Link>
          <Link
            className="text-on-surface-variant font-label-bold text-xs uppercase tracking-widest hover:text-primary-fixed transition-colors"
            to="#"
          >
            Contact
          </Link>
        </div>
        <p className="text-on-surface-variant font-label-bold text-xs uppercase tracking-widest">
          © 2024 SolveX INC.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
