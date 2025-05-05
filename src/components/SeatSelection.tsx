
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface SeatSelectionProps {
  totalSeats: number;
  unavailableSeats: number[];
  onSeatSelect: (seatNumber: number) => void;
  selectedSeat: number | null;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  totalSeats,
  unavailableSeats,
  onSeatSelect,
  selectedSeat
}) => {
  const rows = Math.ceil(totalSeats / 4);
  
  const getSeatStatus = (seatNumber: number) => {
    if (selectedSeat === seatNumber) return 'selected';
    if (unavailableSeats.includes(seatNumber)) return 'unavailable';
    return 'available';
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-6 text-center">
        <div className="font-medium text-lg mb-3">Select your seat</div>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-travel-soft-gray border border-gray-300 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-gray-400 mr-2"></div>
            <span>Unavailable</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-travel-blue mr-2"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between mb-4">
          <div className="font-medium">Driver</div>
          <div className="font-medium">Entrance</div>
        </div>
        
        <div className="w-full h-0.5 bg-gray-200 mb-6"></div>
        
        <div className="grid gap-y-2">
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-between">
              {[0, 1].map((colLeft) => {
                const seatNumber = rowIndex * 4 + colLeft + 1;
                const status = getSeatStatus(seatNumber);
                return (
                  <button
                    key={`left-${colLeft}`}
                    disabled={status === 'unavailable'}
                    onClick={() => onSeatSelect(seatNumber)}
                    className={`w-12 h-12 rounded flex items-center justify-center ${
                      status === 'available' ? 'bg-travel-soft-gray border border-gray-300 hover:bg-travel-light-blue' :
                      status === 'selected' ? 'bg-travel-blue text-white' :
                      'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {status === 'selected' ? <Check size={16} /> : seatNumber}
                  </button>
                );
              })}
              
              <div className="w-8"></div>
              
              {[0, 1].map((colRight) => {
                const seatNumber = rowIndex * 4 + colRight + 3;
                const status = getSeatStatus(seatNumber);
                return (
                  <button
                    key={`right-${colRight}`}
                    disabled={status === 'unavailable'}
                    onClick={() => onSeatSelect(seatNumber)}
                    className={`w-12 h-12 rounded flex items-center justify-center ${
                      status === 'available' ? 'bg-travel-soft-gray border border-gray-300 hover:bg-travel-light-blue' :
                      status === 'selected' ? 'bg-travel-blue text-white' :
                      'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {status === 'selected' ? <Check size={16} /> : seatNumber}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
