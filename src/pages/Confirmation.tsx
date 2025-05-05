
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import TicketView from '@/components/TicketView';
import { Check } from 'lucide-react';

interface LocationState {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  company: string;
  type: 'bus' | 'train';
  selectedSeat: number;
  passengerName: string;
  paymentMethod: string;
  date: string;
}

const Confirmation = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Generate a random ticket ID
  const ticketId = `AF${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="min-h-screen bg-travel-soft-gray">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
              <Check className="text-white" size={16} />
            </div>
            <div>
              <div className="font-medium">Payment Successful!</div>
              <div className="text-sm text-gray-600">
                Your ticket has been sent to your email
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-4">Your Ticket</h2>
          
          <TicketView 
            id={ticketId}
            from={state?.from}
            to={state?.to}
            date={state?.date}
            departureTime={state?.departureTime}
            arrivalTime={state?.arrivalTime}
            seat={state?.selectedSeat}
            passengerName={state?.passengerName}
            company={state?.company}
            type={state?.type}
          />
          
          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              Thank you for choosing Afrika Travel.<br />
              Need help? Contact our support at support@afrikatravel.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
