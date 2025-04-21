import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Leaf, TrendingUp, Award } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Monitor & Reduce Your Carbon Footprint
            </h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-xl">
              Join thousands of eco-conscious individuals tracking their impact on the environment. Together, we can make a difference.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link
                  to="/carbon-entry"
                  className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors inline-flex items-center"
                >
                  <Leaf className="mr-2 h-5 w-5" />
                  Log Your Activity
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors inline-flex items-center"
                >
                  <Leaf className="mr-2 h-5 w-5" />
                  Join The Movement
                </Link>
              )}
              <Link
                to="/about"
                className="px-6 py-3 bg-transparent hover:bg-primary-800 border border-white text-white font-medium rounded-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-accent-400 mr-2" />
                <span className="text-primary-100">Track Daily Activities</span>
              </div>
              <div className="flex items-center">
                <Award className="h-6 w-6 text-accent-400 mr-2" />
                <span className="text-primary-100">Join Top Contributors</span>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3698534/pexels-photo-3698534.jpeg" 
                alt="Person planting a tree" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Environmental Impact Tracking</h3>
                  <div className="bg-success-500 text-white text-xs font-bold px-2 py-1 rounded-full">LIVE</div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-primary-100">
                  <div>
                    <span className="block text-2xl font-bold text-white">10,435</span>
                    <span>Users</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white">87,269</span>
                    <span>Activities Logged</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white">5,829</span>
                    <span>Trees Planted</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-500 rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-500 rounded-full opacity-20 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;