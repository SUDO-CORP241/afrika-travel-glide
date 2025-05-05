
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, Train, Users, CreditCard } from 'lucide-react';

const AdminStats = () => {
  // Mock statistics data
  const stats = [
    {
      title: "Bus Trips",
      value: "24",
      icon: <Bus className="h-4 w-4 text-travel-blue" />,
      description: "Active trips this week"
    },
    {
      title: "Train Trips",
      value: "12",
      icon: <Train className="h-4 w-4 text-travel-blue" />,
      description: "Active trips this week"
    },
    {
      title: "Total Passengers",
      value: "842",
      icon: <Users className="h-4 w-4 text-travel-blue" />,
      description: "This month"
    },
    {
      title: "Revenue",
      value: "16.4M CFA",
      icon: <CreditCard className="h-4 w-4 text-travel-blue" />,
      description: "This month"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-medium mb-4">Trip Analytics</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This section will contain charts and detailed analytics about trips, bookings, and revenue.
        </p>
        <div className="h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
          <p className="text-muted-foreground">Analytics charts will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
