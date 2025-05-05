
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import TripCard from '@/components/TripCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, TrainFront, Calendar } from 'lucide-react';

interface LocationState {
  from: string;
  to: string;
  date: string;
  travelMode: 'bus' | 'train';
}

// Create a common trip type that works for both bus and train
interface TripType {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  company: string;
  type: 'bus' | 'train';  // Allow both 'bus' and 'train'
  duration: string;
  seatsLeft: number;
}

const mockBusTrips: TripType[] = [
  {
    id: 'bus1',
    from: 'Accra',
    to: 'Kumasi',
    departureTime: '08:00',
    arrivalTime: '13:30',
    price: 85000,
    company: 'STC Transport',
    type: 'bus',
    duration: '5h 30m',
    seatsLeft: 12
  },
  {
    id: 'bus2',
    from: 'Accra',
    to: 'Kumasi',
    departureTime: '10:45',
    arrivalTime: '16:15',
    price: 75000,
    company: 'VIP Transport',
    type: 'bus',
    duration: '5h 30m',
    seatsLeft: 4
  },
  {
    id: 'bus3',
    from: 'Accra',
    to: 'Kumasi',
    departureTime: '14:00',
    arrivalTime: '19:30',
    price: 90000,
    company: 'Metro Mass',
    type: 'bus',
    duration: '5h 30m',
    seatsLeft: 18
  }
];

const mockTrainTrips: TripType[] = [
  {
    id: 'train1',
    from: 'Accra',
    to: 'Kumasi',
    departureTime: '07:30',
    arrivalTime: '12:15',
    price: 120000,
    company: 'Ghana Railways',
    type: 'train',
    duration: '4h 45m',
    seatsLeft: 32
  },
  {
    id: 'train2',
    from: 'Accra',
    to: 'Kumasi',
    departureTime: '13:00',
    arrivalTime: '17:45',
    price: 110000,
    company: 'Ghana Railways',
    type: 'train',
    duration: '4h 45m',
    seatsLeft: 8
  }
];

const SearchResults = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [activeTab, setActiveTab] = useState<'bus' | 'train'>(state?.travelMode || 'bus');
  const [trips, setTrips] = useState<TripType[]>([]);  // Updated type here

  useEffect(() => {
    // Simulate API call to fetch trips
    setTimeout(() => {
      if (activeTab === 'bus') {
        setTrips(mockBusTrips);
      } else {
        setTrips(mockTrainTrips);
      }
    }, 500);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-travel-soft-gray">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">
                {state?.from} → {state?.to}
              </div>
              <div className="flex items-center text-sm mt-1">
                <Calendar size={14} className="mr-1 text-gray-500" />
                <span>{state?.date}</span>
              </div>
            </div>
            
            <Tabs value={activeTab} className="w-auto">
              <TabsList className="grid grid-cols-2 w-28">
                <TabsTrigger 
                  value="bus" 
                  onClick={() => setActiveTab('bus')}
                >
                  <Bus size={16} />
                </TabsTrigger>
                <TabsTrigger 
                  value="train" 
                  onClick={() => setActiveTab('train')}
                >
                  <TrainFront size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Available trips</h2>
          
          {trips.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-travel-light-blue rounded-full flex items-center justify-center mb-4">
                  {activeTab === 'bus' ? (
                    <Bus className="text-travel-blue" />
                  ) : (
                    <TrainFront className="text-travel-blue" />
                  )}
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <div>
              {trips.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
