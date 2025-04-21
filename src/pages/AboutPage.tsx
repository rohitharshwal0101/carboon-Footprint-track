import React from 'react';
import { Leaf, BarChart2, Globe, Users, Github, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">About EcoTrack</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Building a sustainable future by helping individuals understand and reduce their carbon footprint.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6">Our Mission</h2>
            <p className="text-lg text-secondary-700 mb-4">
              At EcoTrack, we believe that small individual actions can collectively lead to significant environmental impact. Our mission is to empower people with the tools and knowledge to understand their carbon footprint and make informed decisions to reduce it.
            </p>
            <p className="text-lg text-secondary-700 mb-4">
              We aim to create a community of environmentally conscious individuals who inspire and motivate each other to adopt sustainable practices in their daily lives.
            </p>
            <p className="text-lg text-secondary-700">
              By gamifying the process of carbon footprint reduction through our points system and leaderboards, we make environmental awareness engaging and rewarding.
            </p>
          </div>
          <div>
            <img 
              src="https://images.pexels.com/photos/3059654/pexels-photo-3059654.jpeg" 
              alt="Team planting trees" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">How EcoTrack Works</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Our platform makes it easy to track, analyze, and improve your environmental impact through a simple process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">1. Create Your Profile</h3>
              <p className="text-secondary-600">
                Sign up using your mobile number and complete your profile with your information and a photo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">2. Log Your Activities</h3>
              <p className="text-secondary-600">
                Record your daily carbon-producing activities and carbon-reducing efforts with our simple questionnaire.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">3. Track Your Impact</h3>
              <p className="text-secondary-600">
                View your carbon footprint over time, analyze trends, and see your overall environmental impact.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary-100 text-primary-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">4. Reduce & Earn Points</h3>
              <p className="text-secondary-600">
                Implement changes to reduce your footprint, earn points, and become a top contributor in the community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">Our Team</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            A passionate group of environmentalists, developers, and data scientists dedicated to fighting climate change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team members would go here - using placeholders */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg" 
              alt="Team Member" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-1">Emma Wilson</h3>
              <p className="text-primary-600 mb-4">Founder & CEO</p>
              <p className="text-secondary-600 mb-4">
                Environmental scientist with a passion for making climate data accessible to everyone.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-400 hover:text-primary-600 transition-colors">
                  <Mail size={18} />
                </a>
                <a href="#" className="text-secondary-400 hover:text-primary-600 transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
              alt="Team Member" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-1">Michael Chen</h3>
              <p className="text-primary-600 mb-4">Lead Developer</p>
              <p className="text-secondary-600 mb-4">
                Full-stack developer specializing in data visualization and environmental applications.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-400 hover:text-primary-600 transition-colors">
                  <Mail size={18} />
                </a>
                <a href="#" className="text-secondary-400 hover:text-primary-600 transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
              alt="Team Member" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-1">Sophia Patel</h3>
              <p className="text-primary-600 mb-4">Environmental Analyst</p>
              <p className="text-secondary-600 mb-4">
                Climate researcher focusing on individual carbon footprint reduction strategies.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-400 hover:text-primary-600 transition-colors">
                  <Mail size={18} />
                </a>
                <a href="#" className="text-secondary-400 hover:text-primary-600 transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-secondary-600 mb-8">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;