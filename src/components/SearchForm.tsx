
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Search, Bus, TrainFront } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TravelMode = 'bus' | 'train';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [travelMode, setTravelMode] = useState<TravelMode>('bus');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search-results', { 
      state: { from, to, date, travelMode } 
    });
  };

  return (
    <Card className="w-full bg-white animate-fade-in">
      <CardContent className="p-6">
        <Tabs defaultValue="bus" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="bus" 
              onClick={() => setTravelMode('bus')}
              className="data-[state=active]:bg-travel-blue data-[state=active]:text-white"
            >
              <Bus className="mr-2" size={18} />
              Bus
            </TabsTrigger>
            <TabsTrigger 
              value="train" 
              onClick={() => setTravelMode('train')}
              className="data-[state=active]:bg-travel-blue data-[state=active]:text-white"
            >
              <TrainFront className="mr-2" size={18} />
              Train
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="from" className="travel-label block">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="from"
                type="text"
                placeholder="Departure city"
                className="travel-input pl-10"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="to" className="travel-label block">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="to"
                type="text"
                placeholder="Arrival city"
                className="travel-input pl-10"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="date" className="travel-label block">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="date"
                type="date"
                className="travel-input pl-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-travel-blue hover:bg-travel-sky text-white font-medium py-3"
          >
            <Search className="mr-2" size={18} />
            Search Trips
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
