import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Upload, Loader2, Leaf, ArrowRight, X } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    bio: '',
    gender: '',
    age: '',
  });
  
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.country || !formData.gender || !formData.age) {
      setError('Please fill all required fields');
      return;
    }
    
    if (!profileImage) {
      setError('Please upload a profile image');
      return;
    }

    // Create form data to send
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    if (profileImage) {
      submitData.append('profileImage', profileImage);
    }

    try {
      await register(submitData);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 shadow-md rounded-lg">
          <div className="text-center mb-8">
            <Leaf className="mx-auto h-12 w-12 text-primary-600" />
            <h2 className="mt-4 text-3xl font-display font-bold text-secondary-900">
              Join EcoTrack
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              Create your account to start tracking your carbon footprint
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error-50 text-error-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-8 flex flex-col items-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-secondary-100 border-4 border-white shadow-md">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile Preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Camera className="h-12 w-12 text-secondary-400" />
                    </div>
                  )}
                </div>
                {previewUrl && (
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="absolute top-0 right-0 bg-error-500 text-white rounded-full p-1 shadow-md"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 flex items-center text-sm text-primary-600 hover:text-primary-800"
              >
                <Upload className="h-4 w-4 mr-1" />
                {previewUrl ? 'Change Profile Photo' : 'Upload Profile Photo'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                  Full Name <span className="text-error-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                  Email Address <span className="text-error-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-secondary-700 mb-1">
                  Mobile Number <span className="text-error-500">*</span>
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-1">
                  Country <span className="text-error-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select your country</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="UAE">UAE</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-secondary-700 mb-1">
                  Gender <span className="text-error-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-secondary-700 mb-1">
                  Age <span className="text-error-500">*</span>
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="13"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your age"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="bio" className="block text-sm font-medium text-secondary-700 mb-1">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Tell us a bit about yourself and your environmental interests..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-secondary-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;