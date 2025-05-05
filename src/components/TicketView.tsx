
import React, { useRef } from 'react';
import { QrCode, Bus, TrainFront, Map, Calendar, Ticket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TicketProps {
  id: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  seat: number;
  passengerName: string;
  company: string;
  type: 'bus' | 'train';
}

const TicketView: React.FC<TicketProps> = ({
  id,
  from,
  to,
  date,
  departureTime,
  arrivalTime,
  seat,
  passengerName,
  company,
  type
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // In a real app, this would generate a PDF or image to download
    alert('Ticket downloaded successfully!');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert('Sharing functionality would be implemented here');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card ref={ticketRef} className="travel-card mb-6 border-2 border-travel-blue">
        <div className="p-4 bg-travel-blue text-white flex justify-between items-center">
          <div className="flex items-center">
            {type === 'bus' ? (
              <Bus className="mr-2" size={20} />
            ) : (
              <TrainFront className="mr-2" size={20} />
            )}
            <span className="font-bold">{type === 'bus' ? 'BUS TICKET' : 'TRAIN TICKET'}</span>
          </div>
          <span className="text-xs bg-white text-travel-blue px-2 py-1 rounded">
            E-TICKET
          </span>
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Ticket ID</div>
              <div className="font-medium">{id}</div>
            </div>
            <div className="bg-travel-soft-gray p-3 rounded">
              <QrCode size={64} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-bold">{departureTime}</div>
            <div className="flex-1 border-t-2 border-dotted mx-2 border-gray-300"></div>
            <div className="text-lg font-bold">{arrivalTime}</div>
          </div>
          
          <div className="flex justify-between mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">FROM</div>
              <div className="font-medium">{from}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">TO</div>
              <div className="font-medium">{to}</div>
            </div>
          </div>

          <Separator className="my-4" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 flex items-center">
                <Calendar size={14} className="mr-1" />
                Date
              </div>
              <div className="font-medium">{date}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 flex items-center">
                <Map size={14} className="mr-1" />
                Seat
              </div>
              <div className="font-medium">{seat}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 flex items-center">
                <Ticket size={14} className="mr-1" />
                Passenger
              </div>
              <div className="font-medium">{passengerName}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 flex items-center">
                {type === 'bus' ? (
                  <Bus size={14} className="mr-1" />
                ) : (
                  <TrainFront size={14} className="mr-1" />
                )}
                Company
              </div>
              <div className="font-medium">{company}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4">
        <Button 
          onClick={handleDownload} 
          className="flex-1 bg-travel-blue hover:bg-travel-sky"
        >
          Download Ticket
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="flex-1 border-travel-blue text-travel-blue hover:bg-travel-light-blue"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default TicketView;
