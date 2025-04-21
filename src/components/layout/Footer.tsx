import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Facebook, Instagram, Github as GitHub, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-display font-bold">EcoTrack</span>
            </Link>
            <p className="mt-4 text-sm text-primary-100">
              Tracking and reducing your carbon footprint one step at a time. Join our community of eco-conscious individuals making a difference.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-primary-100 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-100 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Carbon Offsetting Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Sustainable Living Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  Environmental News
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-100 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary-100 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors">
                <GitHub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
            <p className="text-sm text-primary-100">
              <Mail size={16} className="inline mr-2" />
              rohitjangir093@gmail.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-700">
          <p className="text-sm text-center text-primary-200">
            &copy; {new Date().getFullYear()} EcoTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;