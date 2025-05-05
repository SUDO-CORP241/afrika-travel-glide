
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto p-4 flex items-center justify-between">
        {!isHomePage ? (
          <Link to="/" className="flex items-center text-gray-600">
            <ArrowLeft size={20} />
            <span className="ml-1">Back</span>
          </Link>
        ) : (
          <div></div>
        )}
        
        <div className="text-xl font-bold text-travel-blue">Afrika Travel</div>
        
        <div className="w-8"></div>
      </div>
    </header>
  );
};

export default Header;
