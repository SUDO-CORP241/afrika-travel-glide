
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bus, TrainFront, Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import TripFormDialog from './TripFormDialog';
import { useToast } from '@/components/ui/use-toast';

// Define trip type
interface TripType {
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

const TripManagement = () => {
  const [trips, setTrips] = useState<TripType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<TripType | null>(null);
  const { toast } = useToast();

  // Mock data for trips
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
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch trips
    setTimeout(() => {
      setTrips([...mockBusTrips, ...mockTrainTrips]);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleAddTrip = () => {
    setEditingTrip(null);
    setOpenForm(true);
  };

  const handleEditTrip = (trip: TripType) => {
    setEditingTrip(trip);
    setOpenForm(true);
  };

  const handleDeleteTrip = (tripId: string) => {
    // In a real app, you'd call an API to delete the trip
    setTrips(trips.filter(trip => trip.id !== tripId));
    
    toast({
      title: "Trip deleted",
      description: "The trip has been successfully deleted.",
    });
  };

  const handleSaveTrip = (trip: TripType) => {
    if (editingTrip) {
      // Update existing trip
      setTrips(trips.map(t => t.id === trip.id ? trip : t));
      toast({
        title: "Trip updated",
        description: "The trip has been successfully updated.",
      });
    } else {
      // Add new trip with a unique ID
      const newTrip = {
        ...trip,
        id: `${trip.type}${Date.now()}`
      };
      setTrips([...trips, newTrip]);
      toast({
        title: "Trip created",
        description: "A new trip has been successfully created.",
      });
    }
    setOpenForm(false);
  };

  const filteredTrips = trips.filter(trip => 
    trip.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
    trip.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Input
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddTrip} className="bg-travel-blue hover:bg-travel-blue/90">
          <Plus className="mr-1" size={16} /> Add New Trip
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="text-center py-8">
          <p>No trips found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Seats Left</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    {trip.type === 'bus' ? (
                      <Bus className="text-travel-blue" size={16} />
                    ) : (
                      <TrainFront className="text-travel-blue" size={16} />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{trip.from} → {trip.to}</div>
                    <div className="text-xs text-gray-500">{trip.duration}</div>
                  </TableCell>
                  <TableCell>
                    <div>{trip.departureTime} - {trip.arrivalTime}</div>
                  </TableCell>
                  <TableCell>{trip.company}</TableCell>
                  <TableCell className="text-right font-medium">
                    {trip.price.toLocaleString()} CFA
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={trip.seatsLeft < 5 ? "destructive" : "outline"}>
                      {trip.seatsLeft}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditTrip(trip)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteTrip(trip.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <TripFormDialog 
        open={openForm} 
        onOpenChange={setOpenForm}
        trip={editingTrip}
        onSave={handleSaveTrip}
      />
    </div>
  );
};

export default TripManagement;
