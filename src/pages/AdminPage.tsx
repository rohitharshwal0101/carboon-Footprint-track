import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Users, Globe, Calendar, Download, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import Loader from '../components/ui/Loader';

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  country: string;
  profileImage?: string;
  totalPoints: number;
  createdAt: string;
  gender?: string;
  age?: number;
}

interface FilterOptions {
  country: string;
  gender: string;
  ageRange: string;
  pointsRange: string;
  searchQuery: string;
}

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    country: '',
    gender: '',
    ageRange: '',
    pointsRange: '',
    searchQuery: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Country list for filters
  const countries = ['All', 'United States', 'United Kingdom', 'India', 'China', 'Brazil', 'Mexico', 'Australia', 'Germany'];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        
        if (filters.country && filters.country !== 'All') {
          queryParams.append('country', filters.country);
        }
        if (filters.gender) {
          queryParams.append('gender', filters.gender);
        }
        if (filters.ageRange) {
          queryParams.append('ageRange', filters.ageRange);
        }
        if (filters.pointsRange) {
          queryParams.append('pointsRange', filters.pointsRange);
        }
        if (filters.searchQuery) {
          queryParams.append('search', filters.searchQuery);
        }
        
        queryParams.append('page', page.toString());
        queryParams.append('limit', '10');
        
        const response = await api.get(`/api/admin/users?${queryParams.toString()}`);
        setUsers(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    // In development, use mock data
    const mockUsers: User[] = [
      {
        _id: '1',
        name: 'Emma Johnson',
        email: 'emma@example.com',
        mobile: '+1234567890',
        country: 'United States',
        profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
        totalPoints: 387,
        createdAt: '2023-01-15T00:00:00.000Z',
        gender: 'Female',
        age: 28
      },
      {
        _id: '2',
        name: 'Michael Chen',
        email: 'michael@example.com',
        mobile: '+1234567891',
        country: 'China',
        profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        totalPoints: 254,
        createdAt: '2023-02-10T00:00:00.000Z',
        gender: 'Male',
        age: 35
      },
      {
        _id: '3',
        name: 'Raj Patel',
        email: 'raj@example.com',
        mobile: '+1234567892',
        country: 'India',
        profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        totalPoints: 312,
        createdAt: '2023-03-05T00:00:00.000Z',
        gender: 'Male',
        age: 31
      },
      {
        _id: '4',
        name: 'Sophia Torres',
        email: 'sophia@example.com',
        mobile: '+1234567893',
        country: 'Mexico',
        profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        totalPoints: 198,
        createdAt: '2023-04-20T00:00:00.000Z',
        gender: 'Female',
        age: 26
      },
      {
        _id: '5',
        name: 'James Wilson',
        email: 'james@example.com',
        mobile: '+1234567894',
        country: 'United Kingdom',
        profileImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
        totalPoints: 276,
        createdAt: '2023-05-12T00:00:00.000Z',
        gender: 'Male',
        age: 42
      },
      {
        _id: '6',
        name: 'Aisha Mohammed',
        email: 'aisha@example.com',
        mobile: '+1234567895',
        country: 'UAE',
        profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        totalPoints: 345,
        createdAt: '2023-06-08T00:00:00.000Z',
        gender: 'Female',
        age: 29
      },
      {
        _id: '7',
        name: 'Carlos Silva',
        email: 'carlos@example.com',
        mobile: '+1234567896',
        country: 'Brazil',
        profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
        totalPoints: 231,
        createdAt: '2023-07-14T00:00:00.000Z',
        gender: 'Male',
        age: 33
      },
      {
        _id: '8',
        name: 'Olivia Schmidt',
        email: 'olivia@example.com',
        mobile: '+1234567897',
        country: 'Germany',
        profileImage: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg',
        totalPoints: 289,
        createdAt: '2023-08-22T00:00:00.000Z',
        gender: 'Female',
        age: 38
      }
    ];

    setUsers(mockUsers);
    setTotalPages(3);
    setLoading(false);

    // Uncomment the following line when connecting to the real API
    // fetchUsers();
  }, [filters, page]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect dependency
  };

  const handleExport = () => {
    // In a real app, this would trigger an API call to download user data
    alert('Export functionality would download user data CSV');
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-error-600 mb-4">Access Denied</h2>
          <p className="text-secondary-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-secondary-900 mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Total Users</p>
                <h3 className="text-3xl font-bold text-secondary-900">10,435</h3>
              </div>
              <div className="p-3 bg-secondary-100 rounded-full">
                <Users className="h-6 w-6 text-secondary-700" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Total Carbon Entries</p>
                <h3 className="text-3xl font-bold text-secondary-900">87,269</h3>
              </div>
              <div className="p-3 bg-secondary-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-secondary-700" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">Trees Planted</p>
                <h3 className="text-3xl font-bold text-secondary-900">5,829</h3>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <Globe className="h-6 w-6 text-primary-700" />
              </div>
            </div>
          </div>
        </div>

        {/* User List Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold text-secondary-900">User Management</h2>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-md flex items-center hover:bg-secondary-200 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    name="searchQuery"
                    value={filters.searchQuery}
                    onChange={handleFilterChange}
                    placeholder="Search users..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <select
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 appearance-none"
                  >
                    <option value="">Filter by Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 appearance-none"
                  >
                    <option value="">Filter by Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <select
                    name="pointsRange"
                    value={filters.pointsRange}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 appearance-none"
                  >
                    <option value="">Filter by Points</option>
                    <option value="high">High (300+)</option>
                    <option value="medium">Medium (100-300)</option>
                    <option value="low">Low (0-100)</option>
                    <option value="negative">Negative</option>
                  </select>
                  <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </form>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <Loader className="py-8" />
            ) : error ? (
              <div className="text-center text-error-600 py-8">{error}</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-secondary-600">No users found matching the criteria.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {user.profileImage ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={user.profileImage}
                                alt={user.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <User className="h-6 w-6 text-primary-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-secondary-900">{user.name}</div>
                            <div className="text-sm text-secondary-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-secondary-500 mr-2" />
                          <span className="text-sm text-secondary-600">{user.country}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.totalPoints > 300
                            ? 'bg-success-100 text-success-800'
                            : user.totalPoints > 0
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-error-100 text-error-800'
                        }`}>
                          {user.totalPoints}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-secondary-500 mr-2" />
                          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          View
                        </button>
                        <button className="text-secondary-600 hover:text-secondary-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-secondary-700">
              Showing page {page} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-3 py-1 rounded ${
                  page === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-secondary-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded ${
                  page === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-secondary-700 hover:bg-gray-100'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;