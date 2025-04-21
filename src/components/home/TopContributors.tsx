import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Filter, Award, ArrowUpRight } from 'lucide-react';
import api from '../../utils/api';
import Loader from '../ui/Loader';

interface Contributor {
  _id: string;
  name: string;
  country: string;
  profileImage: string;
  totalPoints: number;
}

const TopContributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState('month'); // 'day', 'month', 'year'

  useEffect(() => {
    const fetchTopContributors = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/users/top-contributors?timeFrame=${timeFilter}`);
        setContributors(response.data.data);
      } catch (err) {
        console.error('Error fetching top contributors:', err);
        setError('Failed to load top contributors');
      } finally {
        setLoading(false);
      }
    };

    // In development, use mock data
    const mockContributors = [
      {
        _id: '1',
        name: 'Olivia Johnson',
        country: 'United States',
        profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        totalPoints: 387
      },
      {
        _id: '2',
        name: 'Raj Patel',
        country: 'India',
        profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        totalPoints: 342
      },
      {
        _id: '3',
        name: 'Emma Wilson',
        country: 'United Kingdom',
        profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        totalPoints: 315
      },
      {
        _id: '4',
        name: 'Miguel Hernandez',
        country: 'Mexico',
        profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        totalPoints: 298
      },
      {
        _id: '5',
        name: 'Fatima Al-Farsi',
        country: 'UAE',
        profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
        totalPoints: 276
      },
      {
        _id: '6',
        name: 'Chen Wei',
        country: 'China',
        profileImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
        totalPoints: 254
      }
    ];

    setContributors(mockContributors);
    setLoading(false);

    // Uncomment the following line when connecting to the real API
    // fetchTopContributors();
  }, [timeFilter]);

  const handleFilterChange = (filter: string) => {
    setTimeFilter(filter);
  };

  if (loading) {
    return <Loader className="py-8" />;
  }

  if (error) {
    return <div className="text-error-500 text-center py-8">{error}</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">Top Carbon Footprint Reducers</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Meet the environmental champions making the biggest positive impact. Join them in the fight against climate change!
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <Filter size={16} />
            <span>Filter by:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('day')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                timeFilter === 'day'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-700 border border-secondary-200 hover:bg-secondary-50'
              }`}
            >
              <Calendar size={16} />
              Today
            </button>
            <button
              onClick={() => handleFilterChange('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                timeFilter === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-700 border border-secondary-200 hover:bg-secondary-50'
              }`}
            >
              <Calendar size={16} />
              This Month
            </button>
            <button
              onClick={() => handleFilterChange('year')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                timeFilter === 'year'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-700 border border-secondary-200 hover:bg-secondary-50'
              }`}
            >
              <Calendar size={16} />
              This Year
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {contributors.map((contributor, index) => (
            <div key={contributor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform duration-300">
              <div className="relative">
                {index < 3 && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    #{index + 1}
                  </div>
                )}
                <img 
                  src={contributor.profileImage} 
                  alt={contributor.name} 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{contributor.name}</h3>
                <div className="flex items-center text-secondary-600 mb-4">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{contributor.country}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">{contributor.totalPoints}</div>
                    <div className="text-sm text-secondary-500">Eco Points</div>
                  </div>
                  <button className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
                    View Profile <ArrowUpRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-6 py-3 bg-white border border-primary-500 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors">
            View All Contributors
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopContributors;