import React from 'react';
import { Car, Flame, TreePine, Thermometer, Wind, Plus } from 'lucide-react';

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  color: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ icon, title, description, impact, color }) => {
  return (
    <div className={`bg-white border-l-4 ${color} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start">
        <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} ${color.replace('border-', 'text-')}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">{title}</h3>
          <p className="text-secondary-600 mb-4">{description}</p>
          <div className="text-sm font-medium">
            Carbon Impact: <span className="text-secondary-900">{impact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      icon: <Car size={24} />,
      title: 'Transportation',
      description: 'Track your vehicle usage and emissions from various modes of transport.',
      impact: 'High negative impact',
      color: 'border-error-500'
    },
    {
      icon: <Flame size={24} />,
      title: 'Fuel Consumption',
      description: 'Monitor coal, gas, and other fuel burning activities.',
      impact: 'High negative impact',
      color: 'border-error-500'
    },
    {
      icon: <Thermometer size={24} />,
      title: 'Energy Usage',
      description: 'Track usage of AC, refrigerators, and other high-energy appliances.',
      impact: 'Medium negative impact',
      color: 'border-warning-500'
    },
    {
      icon: <TreePine size={24} />,
      title: 'Tree Planting',
      description: 'Record how many trees you\'ve planted to offset your carbon footprint.',
      impact: 'High positive impact',
      color: 'border-success-500'
    },
    {
      icon: <Wind size={24} />,
      title: 'Renewable Energy',
      description: 'Track your usage of renewable energy sources at home and work.',
      impact: 'Medium positive impact',
      color: 'border-success-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">Track Your Environmental Impact</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Log your daily activities to understand and improve your carbon footprint. Every action counts towards a greener planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              impact={activity.impact}
              color={activity.color}
            />
          ))}
          <div className="bg-secondary-50 border border-dashed border-secondary-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-500 mb-4">
              <Plus size={24} />
            </div>
            <h3 className="text-lg font-semibold text-secondary-700 mb-2">Custom Activities</h3>
            <p className="text-secondary-600 mb-4">
              Track other eco-friendly actions or carbon-producing activities that matter to you.
            </p>
            <button className="mt-2 px-4 py-2 bg-secondary-200 text-secondary-700 rounded-md hover:bg-secondary-300 transition-colors">
              Log a Custom Activity
            </button>
          </div>
        </div>

        <div className="text-center">
          <a href="/carbon-entry" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
            Start Tracking Your Activities
          </a>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;