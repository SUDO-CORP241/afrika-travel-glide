
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, TrainFront, Clock, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TripCardProps {
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

const TripCard: React.FC<TripCardProps> = ({
  id,
  from,
  to,
  departureTime,
  arrivalTime,
  price,
  company,
  type,
  duration,
  seatsLeft
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/trip/${id}`, { 
      state: { 
        id, 
        from, 
        to, 
        departureTime, 
        arrivalTime, 
        price, 
        company, 
        type, 
        duration,
        seatsLeft 
      } 
    });
  };

  return (
    <Card className="travel-card mb-4 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              {type === 'bus' ? (
                <Bus size={16} className="text-travel-blue" />
              ) : (
                <TrainFront size={16} className="text-travel-blue" />
              )}
              <span className="font-medium text-sm">{company}</span>
            </div>
            
            <div className="flex items-center">
              <div className="text-lg font-bold">{departureTime}</div>
              <ArrowRight size={16} className="mx-2 text-gray-400" />
              <div className="text-lg font-bold">{arrivalTime}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold text-travel-blue">
              {price.toLocaleString()} CFA
            </div>
            <Badge variant={seatsLeft < 5 ? "destructive" : "outline"} className="mt-1">
              {seatsLeft} seats left
            </Badge>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{duration}</span>
          </div>
          
          <div className="text-sm">
            {from} → {to}
          </div>
        </div>
        
        <Button 
          onClick={handleViewDetails} 
          variant="outline" 
          className="w-full mt-4 border-travel-blue text-travel-blue hover:bg-travel-light-blue"
        >
          Select this trip
        </Button>
      </CardContent>
    </Card>
  );
};

export default TripCard;
