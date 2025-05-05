
import React from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { Bus, TrainFront, Calendar, Check } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-travel-soft-gray">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-travel-blue mb-2">Afrika Travel</h1>
          <p className="text-gray-600">Book bus and train tickets across West Africa</p>
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <SearchForm />
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-bold text-center mb-6">Why travel with us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-travel-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-travel-blue" />
              </div>
              <h3 className="font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600 text-sm">Book your tickets in minutes, anytime, anywhere</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-travel-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-travel-blue" />
              </div>
              <h3 className="font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Pay securely with your favorite mobile money provider</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-travel-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Bus className="text-travel-blue" />
              </div>
              <h3 className="font-bold mb-2">Wide Coverage</h3>
              <p className="text-gray-600 text-sm">Access tickets for major bus and train routes across West Africa</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>&copy; 2025 Afrika Travel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
