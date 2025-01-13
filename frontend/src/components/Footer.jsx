import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-300 bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-xl font-bold text-yellow-200">ODC - On-Demand Cinema</h3>
            <p className="mb-4 text-sm">
              Revolutionizing the movie-going experience by letting you vote for the films 
              you want to see on the big screen. Join us in shaping the future of cinema.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-yellow-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="transition-colors hover:text-yellow-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="transition-colors hover:text-yellow-200">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/top-movies" className="transition-colors hover:text-yellow-200">
                  Top Movies
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-yellow-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-yellow-200">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:contact@odc.com" 
                  className="transition-colors hover:text-yellow-200"
                >
                  kayhere003@gmail.com
                </a>
              
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between text-sm md:flex-row">
          <div className="mb-4 md:mb-0">
            © {currentYear} On-Demand Cinema. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="transition-colors hover:text-yellow-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-yellow-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="transition-colors hover:text-yellow-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;