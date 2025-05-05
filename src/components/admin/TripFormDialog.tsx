
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Trip type definition
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

// Form props
interface TripFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: TripType | null;
  onSave: (trip: TripType) => void;
}

// Form validation schema
const formSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(2, "From location is required"),
  to: z.string().min(2, "To location is required"),
  departureTime: z.string().min(1, "Departure time is required"),
  arrivalTime: z.string().min(1, "Arrival time is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  company: z.string().min(2, "Company name is required"),
  type: z.enum(["bus", "train"]),
  duration: z.string().min(1, "Duration is required"),
  seatsLeft: z.coerce.number().min(0, "Seats cannot be negative"),
});

const TripFormDialog: React.FC<TripFormDialogProps> = ({
  open,
  onOpenChange,
  trip,
  onSave
}) => {
  // Initialize the form with trip data or default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: trip ? {...trip} : {
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      price: 0,
      company: "",
      type: "bus",
      duration: "",
      seatsLeft: 0,
    }
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onSave({
      id: trip?.id || "temp-id", // In a real app, the backend would generate an ID
      ...data
    });
  };

  // Calculate duration based on departure and arrival times
  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    if (!departureTime || !arrivalTime) return "";
    
    try {
      // Convert times to Date objects for calculation
      const [departHours, departMinutes] = departureTime.split(':').map(Number);
      const [arriveHours, arriveMinutes] = arrivalTime.split(':').map(Number);
      
      // Calculate total minutes
      let totalMinutes = (arriveHours * 60 + arriveMinutes) - (departHours * 60 + departMinutes);
      
      // Handle cases that cross midnight
      if (totalMinutes < 0) totalMinutes += 24 * 60;
      
      // Format the duration
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return "";
    }
  };

  // Update duration when departure or arrival time changes
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "departureTime" || name === "arrivalTime") {
        const departureTime = value.departureTime || "";
        const arrivalTime = value.arrivalTime || "";
        if (departureTime && arrivalTime) {
          const duration = calculateDuration(departureTime, arrivalTime);
          form.setValue("duration", duration);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{trip ? "Edit Trip" : "Add New Trip"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="train">Train</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="Origin city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input placeholder="Destination city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="departureTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="arrivalTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrival Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (CFA)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="seatsLeft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seats Available</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {trip ? "Update Trip" : "Create Trip"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TripFormDialog;
