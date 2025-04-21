import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit, User, MapPin, Calendar, TrendingUp, TrendingDown, Award, TreePine, Car, Flame, Thermometer, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../utils/api';
import Loader from '../components/ui/Loader';

interface CarbonEntry {
  _id: string;
  activityId: string;
  activityValue: number;
  points: number;
  activityType: 'carbon-producing' | 'carbon-reducing';
  photoUrl?: string;
  createdAt: string;
  title: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<CarbonEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState('month'); // 'week', 'month', 'year', 'all'
  const [showAllEntries, setShowAllEntries] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/carbon-entries/user?timeFrame=${timeFilter}`);
        setEntries(response.data.data);
      } catch (err) {
        console.error('Error fetching carbon entries:', err);
        setError('Failed to load your activities');
      } finally {
        setLoading(false);
      }
    };

    // In development, use mock data
    const mockEntries: CarbonEntry[] = [
      {
        _id: '1',
        activityId: 'tree-planting',
        activityValue: 3,
        points: 15,
        activityType: 'carbon-reducing',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        title: 'Tree Planting'
      },
      {
        _id: '2',
        activityId: 'vehicle-usage',
        activityValue: 25,
        points: -25,
        activityType: 'carbon-producing',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
        title: 'Vehicle Usage'
      },
      {
        _id: '3',
        activityId: 'tree-planting',
        activityValue: 2,
        points: 10,
        activityType: 'carbon-reducing',
        photoUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        title: 'Tree Planting'
      },
      {
        _id: '4',
        activityId: 'ac-usage',
        activityValue: 5,
        points: -2.5,
        activityType: 'carbon-producing',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
        title: 'AC Usage'
      },
      {
        _id: '5',
        activityId: 'coal-burning',
        activityValue: 2,
        points: -4,
        activityType: 'carbon-producing',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
        title: 'Coal Burning'
      },
      {
        _id: '6',
        activityId: 'renewable-energy',
        activityValue: 10,
        points: 5,
        activityType: 'carbon-reducing',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
        title: 'Renewable Energy'
      }
    ];

    setEntries(mockEntries);
    setLoading(false);

    // Uncomment the following line when connecting to the real API
    // fetchEntries();
  }, [timeFilter]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-700">Please login to view your profile</p>
      </div>
    );
  }

  const totalPositivePoints = entries
    .filter(entry => entry.points > 0)
    .reduce((sum, entry) => sum + entry.points, 0);

  const totalNegativePoints = entries
    .filter(entry => entry.points < 0)
    .reduce((sum, entry) => sum + Math.abs(entry.points), 0);

  const netPoints = totalPositivePoints - totalNegativePoints;

  const getActivityIcon = (activityId: string) => {
    switch (activityId) {
      case 'tree-planting':
        return <TreePine className="h-5 w-5" />;
      case 'vehicle-usage':
        return <Car className="h-5 w-5" />;
      case 'coal-burning':
        return <Flame className="h-5 w-5" />;
      case 'ac-usage':
        return <Thermometer className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };

  const visibleEntries = showAllEntries ? entries : entries.slice(0, 5);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-primary-700 text-white p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                <div className="h-32 w-32 rounded-full bg-white/10 overflow-hidden border-4 border-white shadow-lg">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary-600">
                      <User className="h-16 w-16 text-white/70" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-display font-bold">{user.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-primary-100">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{user.country}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 max-w-xl">
                  <p className="text-primary-100">{user.bio || 'No bio provided yet.'}</p>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm flex items-center transition-colors">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="bg-success-50 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-success-700 text-sm font-medium">Positive Impact</p>
                  <h3 className="text-3xl font-bold text-success-600 mt-1">+{totalPositivePoints}</h3>
                </div>
                <div className="p-3 bg-success-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-success-600" />
                </div>
              </div>
              <p className="text-sm text-success-700 mt-4">Points from carbon-reducing activities</p>
            </div>

            <div className="bg-error-50 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-error-700 text-sm font-medium">Negative Impact</p>
                  <h3 className="text-3xl font-bold text-error-600 mt-1">-{totalNegativePoints}</h3>
                </div>
                <div className="p-3 bg-error-100 rounded-full">
                  <TrendingDown className="h-6 w-6 text-error-600" />
                </div>
              </div>
              <p className="text-sm text-error-700 mt-4">Points from carbon-producing activities</p>
            </div>

            <div className="bg-secondary-50 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-secondary-700 text-sm font-medium">Net Impact</p>
                  <h3 className={`text-3xl font-bold mt-1 ${
                    netPoints > 0 ? 'text-success-600' : netPoints < 0 ? 'text-error-600' : 'text-secondary-600'
                  }`}>
                    {netPoints > 0 ? '+' : ''}{netPoints}
                  </h3>
                </div>
                <div className="p-3 bg-secondary-100 rounded-full">
                  <Award className="h-6 w-6 text-secondary-600" />
                </div>
              </div>
              <p className="text-sm text-secondary-700 mt-4">Your overall environmental impact</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Your Activities</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeFilter('week')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeFilter === 'week'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeFilter('month')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeFilter === 'month'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeFilter('year')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeFilter === 'year'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Year
                </button>
                <button
                  onClick={() => setTimeFilter('all')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeFilter === 'all'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : error ? (
              <div className="text-center text-error-600 py-8">{error}</div>
            ) : entries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-secondary-600">No activities recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {visibleEntries.map((entry) => (
                  <div 
                    key={entry._id}
                    className={`p-4 rounded-lg border ${
                      entry.activityType === 'carbon-reducing'
                        ? 'border-success-200 bg-success-50'
                        : 'border-error-200 bg-error-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full mr-4 ${
                        entry.activityType === 'carbon-reducing'
                          ? 'bg-success-100 text-success-600'
                          : 'bg-error-100 text-error-600'
                      }`}>
                        {getActivityIcon(entry.activityId)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-secondary-900">{entry.title}</h3>
                          <span className={`font-semibold ${
                            entry.points > 0 ? 'text-success-600' : 'text-error-600'
                          }`}>
                            {entry.points > 0 ? '+' : ''}{entry.points} points
                          </span>
                        </div>
                        <p className="text-sm text-secondary-600 mt-1">
                          {entry.activityValue} {entry.activityId === 'tree-planting' ? 'trees planted' : 'units'}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-secondary-500">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </span>
                          {entry.photoUrl && (
                            <button className="text-xs text-primary-600">View Photo</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {entries.length > 5 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowAllEntries(!showAllEntries)}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800"
                    >
                      {showAllEntries ? (
                        <>
                          Show Less <ChevronUp className="ml-1 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show All ({entries.length}) <ChevronDown className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;