
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PaymentForm from '@/components/PaymentForm';
import { Card, CardContent } from "@/components/ui/card";
import { Bus, TrainFront } from 'lucide-react';

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
  selectedSeat: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');
  
  const handlePaymentComplete = (paymentMethod: string) => {
    navigate('/confirmation', {
      state: {
        ...state,
        passengerName,
        paymentMethod,
        date: 'May 6, 2025', // In a real app, this would be dynamic
      }
    });
  };

  return (
    <div className="min-h-screen bg-travel-soft-gray">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Passenger Information</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="travel-label block">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="travel-input"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="travel-label block">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="travel-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="text-xs text-gray-500">
                    We'll send your ticket to this email
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Trip Summary</h3>
              
              <div className="flex items-center space-x-2 mb-3">
                {state?.type === 'bus' ? (
                  <Bus size={18} className="text-travel-blue" />
                ) : (
                  <TrainFront size={18} className="text-travel-blue" />
                )}
                <span className="font-medium">{state?.company}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <div className="text-gray-600">Route:</div>
                <div className="font-medium">{state?.from} → {state?.to}</div>
              </div>
              
              <div className="flex justify-between mb-2">
                <div className="text-gray-600">Date:</div>
                <div className="font-medium">May 6, 2025</div>
              </div>
              
              <div className="flex justify-between mb-2">
                <div className="text-gray-600">Departure:</div>
                <div className="font-medium">{state?.departureTime}</div>
              </div>
              
              <div className="flex justify-between mb-2">
                <div className="text-gray-600">Arrival:</div>
                <div className="font-medium">{state?.arrivalTime}</div>
              </div>
              
              <div className="flex justify-between mb-2">
                <div className="text-gray-600">Seat:</div>
                <div className="font-medium">{state?.selectedSeat}</div>
              </div>
            </CardContent>
          </Card>
          
          <PaymentForm price={state?.price} onPaymentComplete={handlePaymentComplete} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
