
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TripManagement from '@/components/admin/TripManagement';
import AdminStats from '@/components/admin/AdminStats';
import { Shield } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("trips");

  return (
    <div className="min-h-screen bg-travel-soft-gray">
      <Header isAdmin={true} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-travel-blue" size={24} />
            <h1 className="text-xl font-bold">Administration Dashboard</h1>
          </div>
          
          <Tabs 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="trips">Trip Management</TabsTrigger>
              <TabsTrigger value="stats">Stats & Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trips">
              <TripManagement />
            </TabsContent>
            
            <TabsContent value="stats">
              <AdminStats />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
