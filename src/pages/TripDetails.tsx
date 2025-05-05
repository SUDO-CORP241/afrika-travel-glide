
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SeatSelection from '@/components/SeatSelection';
import { Button } from "@/components/ui/button";
import { Bus, TrainFront, Calendar, Clock, MapPin } from 'lucide-react';

interface LocationState {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  company: string;
  type: 'bus' | 'train';
  duration: string;
  seatsLeft: number;
}

// Mock unavailable seats
const unavailableSeats = [2, 5, 8, 11, 14, 17, 20, 23, 26];

const TripDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeat(seatNumber);
  };

  const handleProceedToCheckout = () => {
    if (selectedSeat) {
      navigate('/checkout', {
        state: {
          ...state,
          selectedSeat
        }
      });
    } else {
      alert('Please select a seat to continue');
    }
  };

  return (
    <div className="min-h-screen bg-travel-soft-gray">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              {state?.type === 'bus' ? (
                <Bus size={18} className="text-travel-blue" />
              ) : (
                <TrainFront size={18} className="text-travel-blue" />
              )}
              <span className="font-medium">{state?.company}</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className="text-xl font-bold">{state?.departureTime}</div>
                <div className="text-sm text-gray-500">{state?.from}</div>
              </div>
              
              <div className="flex-1 mx-3">
                <div className="h-0.5 bg-gray-300 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-500 px-2 text-xs">
                    {state?.duration}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold">{state?.arrivalTime}</div>
                <div className="text-sm text-gray-500">{state?.to}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>May 6, 2025</span>
              </div>
              
              <div className="font-bold text-travel-blue">
                {state?.price.toLocaleString()} CFA
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <SeatSelection 
              totalSeats={28}
              unavailableSeats={unavailableSeats}
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
            />
          </div>
          
          <Button 
            onClick={handleProceedToCheckout} 
            disabled={!selectedSeat}
            className="w-full bg-travel-blue hover:bg-travel-sky"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
