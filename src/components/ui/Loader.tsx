import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: number;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 24, className = '' }) => {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <Loader2 size={size} className="animate-spin text-primary-600" />
      <span className="ml-2 text-gray-700">Loading...</span>
    </div>
  );
};

export default Loader;