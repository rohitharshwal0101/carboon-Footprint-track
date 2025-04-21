import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Car, Flame, TreePine, Wind, Thermometer, Upload, Check, AlertCircle } from 'lucide-react';
import Webcam from 'react-webcam';
import api from '../utils/api';

type ActivityType = 'carbon-producing' | 'carbon-reducing';
type ActivityItem = {
  id: string;
  title: string;
  question: string;
  icon: React.ReactNode;
  pointsPerUnit: number;
  requiresPhoto?: boolean;
  maxValue?: number;
};

const CarbonEntryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActivityType>('carbon-producing');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [activityValue, setActivityValue] = useState<number>(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const webcamRef = React.useRef<Webcam>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const carbonProducingActivities: ActivityItem[] = [
    {
      id: 'vehicle-usage',
      title: 'Vehicle Usage',
      question: 'How many kilometers have you driven today?',
      icon: <Car className="h-6 w-6" />,
      pointsPerUnit: -1,
      maxValue: 1000
    },
    {
      id: 'coal-burning',
      title: 'Coal Burning',
      question: 'How many kilograms of coal have you burned today?',
      icon: <Flame className="h-6 w-6" />,
      pointsPerUnit: -2,
      maxValue: 100
    },
    {
      id: 'ac-usage',
      title: 'AC Usage',
      question: 'How many hours have you used AC today?',
      icon: <Thermometer className="h-6 w-6" />,
      pointsPerUnit: -0.5,
      maxValue: 24
    }
  ];

  const carbonReducingActivities: ActivityItem[] = [
    {
      id: 'tree-planting',
      title: 'Tree Planting',
      question: 'How many trees have you planted today?',
      icon: <TreePine className="h-6 w-6" />,
      pointsPerUnit: 5,
      requiresPhoto: true,
      maxValue: 100
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy',
      question: 'How many kWh of renewable energy have you used today?',
      icon: <Wind className="h-6 w-6" />,
      pointsPerUnit: 0.5,
      maxValue: 100
    }
  ];

  const activities = activeTab === 'carbon-producing' 
    ? carbonProducingActivities 
    : carbonReducingActivities;

  const handleActivitySelect = (activity: ActivityItem) => {
    setSelectedActivity(activity);
    setActivityValue(0);
    setPhoto(null);
    setIsWebcamOpen(false);
  };

  const capturePhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
      setIsWebcamOpen(false);
    }
  }, [webcamRef]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedActivity) return;
    
    if (selectedActivity.requiresPhoto && !photo) {
      setError('Please upload or capture a photo for this activity');
      return;
    }
    
    if (activityValue <= 0) {
      setError('Please enter a valid value greater than 0');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const totalPoints = activityValue * selectedActivity.pointsPerUnit;
      
      // Prepare form data
      const formData = new FormData();
      formData.append('activityId', selectedActivity.id);
      formData.append('activityValue', activityValue.toString());
      formData.append('points', totalPoints.toString());
      formData.append('activityType', activeTab);
      
      if (photo) {
        // Convert base64 to blob
        const base64Response = await fetch(photo);
        const blob = await base64Response.blob();
        formData.append('photo', blob, 'activity-photo.jpg');
      }
      
      // Submit to API
      await api.post('/api/carbon-entries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess(`Activity logged successfully! ${Math.abs(totalPoints)} points ${totalPoints > 0 ? 'added to' : 'deducted from'} your profile.`);
      
      // Reset form
      setSelectedActivity(null);
      setActivityValue(0);
      setPhoto(null);
      
      // After 3 seconds, navigate to profile
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to log activity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-secondary-900">Log Your Carbon Activity</h1>
          <p className="mt-2 text-lg text-secondary-600">
            Track your daily activities to monitor and reduce your carbon footprint
          </p>
        </div>

        {/* Activity Type Tabs */}
        <div className="bg-white shadow-sm rounded-lg mb-8">
          <div className="flex">
            <button
              onClick={() => {
                setActiveTab('carbon-producing');
                setSelectedActivity(null);
              }}
              className={`flex-1 py-4 text-center font-medium rounded-tl-lg ${
                activeTab === 'carbon-producing'
                  ? 'bg-error-50 text-error-700 border-b-2 border-error-500'
                  : 'text-secondary-600 hover:text-secondary-900 border-b border-secondary-200'
              }`}
            >
              Carbon Producing Activities
            </button>
            <button
              onClick={() => {
                setActiveTab('carbon-reducing');
                setSelectedActivity(null);
              }}
              className={`flex-1 py-4 text-center font-medium rounded-tr-lg ${
                activeTab === 'carbon-reducing'
                  ? 'bg-success-50 text-success-700 border-b-2 border-success-500'
                  : 'text-secondary-600 hover:text-secondary-900 border-b border-secondary-200'
              }`}
            >
              Carbon Reducing Activities
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activities List */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 bg-secondary-50 border-b border-secondary-200">
                <h2 className="text-lg font-semibold text-secondary-900">
                  Select an Activity
                </h2>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {activities.map(activity => (
                    <li key={activity.id}>
                      <button
                        onClick={() => handleActivitySelect(activity)}
                        className={`w-full text-left p-3 rounded-md flex items-center ${
                          selectedActivity?.id === activity.id
                            ? activeTab === 'carbon-producing'
                              ? 'bg-error-50 border border-error-200'
                              : 'bg-success-50 border border-success-200'
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded-full mr-3 ${
                          activeTab === 'carbon-producing' ? 'bg-error-100 text-error-600' : 'bg-success-100 text-success-600'
                        }`}>
                          {activity.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-secondary-900">{activity.title}</h3>
                          <p className="text-xs text-secondary-500">
                            {activity.pointsPerUnit > 0 ? '+' : ''}{activity.pointsPerUnit} points per unit
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Activity Input */}
          <div className="lg:col-span-2">
            {selectedActivity ? (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className={`p-4 ${
                  activeTab === 'carbon-producing' ? 'bg-error-50' : 'bg-success-50'
                } border-b border-secondary-200`}>
                  <h2 className="text-lg font-semibold text-secondary-900">{selectedActivity.title}</h2>
                  <p className="text-sm text-secondary-600">{selectedActivity.question}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Input for activity value */}
                  <div>
                    <label htmlFor="activityValue" className="block text-sm font-medium text-secondary-700 mb-2">
                      Value
                    </label>
                    <input
                      type="number"
                      id="activityValue"
                      min="0"
                      max={selectedActivity.maxValue}
                      value={activityValue}
                      onChange={(e) => setActivityValue(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                    {selectedActivity.maxValue && (
                      <p className="mt-1 text-xs text-secondary-500">Maximum value: {selectedActivity.maxValue}</p>
                    )}
                  </div>

                  {/* Photo upload if required */}
                  {selectedActivity.requiresPhoto && (
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Photo Evidence
                      </label>
                      
                      {photo ? (
                        <div className="relative">
                          <img 
                            src={photo} 
                            alt="Activity evidence" 
                            className="h-64 w-full object-cover rounded-md"
                          />
                          <button 
                            onClick={() => setPhoto(null)}
                            className="absolute top-2 right-2 bg-error-500 text-white p-1 rounded-full"
                          >
                            <AlertCircle size={16} />
                          </button>
                        </div>
                      ) : isWebcamOpen ? (
                        <div className="space-y-4">
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full rounded-md"
                          />
                          <div className="flex space-x-4">
                            <button
                              onClick={capturePhoto}
                              className="flex-1 bg-primary-100 text-primary-600 py-2 rounded-md font-medium hover:bg-primary-200 transition-colors"
                            >
                              <Camera className="inline-block mr-2 h-5 w-5" />
                              Capture
                            </button>
                            <button
                              onClick={() => setIsWebcamOpen(false)}
                              className="flex-1 bg-secondary-100 text-secondary-600 py-2 rounded-md font-medium hover:bg-secondary-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-secondary-300 rounded-md p-6 flex flex-col items-center">
                            <Camera className="h-12 w-12 text-secondary-400 mb-2" />
                            <p className="text-sm text-secondary-600 mb-4">
                              Upload a photo as evidence of your activity
                            </p>
                            <div className="flex space-x-4">
                              <button
                                onClick={() => setIsWebcamOpen(true)}
                                className="px-4 py-2 bg-primary-100 text-primary-600 rounded-md font-medium hover:bg-primary-200 transition-colors"
                              >
                                <Camera className="inline-block mr-2 h-5 w-5" />
                                Use Camera
                              </button>
                              <label className="px-4 py-2 bg-primary-100 text-primary-600 rounded-md font-medium hover:bg-primary-200 transition-colors cursor-pointer">
                                <Upload className="inline-block mr-2 h-5 w-5" />
                                Upload Photo
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={handleFileUpload}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Points calculation */}
                  <div className={`p-4 rounded-md ${
                    activeTab === 'carbon-producing' ? 'bg-error-50' : 'bg-success-50'
                  }`}>
                    <h3 className="font-medium text-secondary-900 mb-1">Impact Summary</h3>
                    <p className="text-sm text-secondary-600 mb-2">
                      This activity will {selectedActivity.pointsPerUnit > 0 ? 'add' : 'deduct'} points from your profile.
                    </p>
                    <div className="flex justify-between">
                      <span>Points per unit:</span>
                      <span className={selectedActivity.pointsPerUnit > 0 ? 'text-success-600' : 'text-error-600'}>
                        {selectedActivity.pointsPerUnit > 0 ? '+' : ''}{selectedActivity.pointsPerUnit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Units:</span>
                      <span>{activityValue}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-secondary-200 mt-2 pt-2">
                      <span>Total impact:</span>
                      <span className={selectedActivity.pointsPerUnit > 0 ? 'text-success-600' : 'text-error-600'}>
                        {selectedActivity.pointsPerUnit > 0 ? '+' : ''}{(selectedActivity.pointsPerUnit * activityValue).toFixed(1)} points
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-error-50 text-error-700 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="p-3 bg-success-50 text-success-700 rounded-md text-sm flex items-center">
                      <Check className="h-5 w-5 mr-2" />
                      {success}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedActivity(null);
                        setActivityValue(0);
                        setPhoto(null);
                      }}
                      className="flex-1 py-3 px-4 border border-secondary-300 rounded-md text-secondary-700 font-medium hover:bg-secondary-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`flex-1 py-3 px-4 rounded-md text-white font-medium ${
                        activeTab === 'carbon-producing'
                          ? 'bg-error-600 hover:bg-error-700'
                          : 'bg-success-600 hover:bg-success-700'
                      } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Submitting...' : 'Submit Activity'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center justify-center text-center h-full">
                <div className={`p-4 rounded-full mb-4 ${
                  activeTab === 'carbon-producing' ? 'bg-error-100 text-error-600' : 'bg-success-100 text-success-600'
                }`}>
                  {activeTab === 'carbon-producing' ? <Flame className="h-8 w-8" /> : <TreePine className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  Select an activity to begin
                </h3>
                <p className="text-secondary-600 max-w-md mb-6">
                  Choose an activity from the list on the left to log your environmental impact.
                </p>
                <p className="text-sm text-secondary-500">
                  {activeTab === 'carbon-producing' 
                    ? 'These activities contribute to your carbon footprint'
                    : 'These activities help reduce your carbon footprint'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonEntryPage;