import React from 'react';
import { CheckCircle as CircleCheckBig } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#0B3954] to-[#204E6A] text-white p-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CircleCheckBig className="h-8 w-8 text-[#FF6B35]" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SHL Assessment Recommender</h1>
              <p className="text-sm opacity-80">Find the perfect assessment for your hiring needs</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="px-3 py-1 bg-[#FF6B35] rounded-full text-xs font-medium animate-pulse">
              Live API Status: Healthy
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;