
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
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
        
        <div>
          {isAdmin ? (
            <div className="flex items-center text-travel-blue">
              <Shield size={16} className="mr-1" />
              <span className="text-sm">Admin</span>
            </div>
          ) : (
            <Link to="/admin" className="text-sm text-gray-500 hover:text-travel-blue">
              Admin
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
