
import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import QuickActions from '@/components/dashboard/QuickActions';
import VipCalendar from '@/components/dashboard/VipCalendar';
import RealtimeNotifications from '@/components/dashboard/RealtimeNotifications';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-vip-gold">
          Welcome back, {user?.email?.split('@')[0] || 'Sir Dennis'}
        </h1>
        <p className="text-vip-gold/70 mt-1">
          Your VVIP Protocol Dashboard - Live data updates automatically
        </p>
      </div>

      <div className="grid gap-6">
        {/* Stats Overview */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Quick Actions & Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />
            <VipCalendar />
          </div>

          {/* Right Column - Real-time Activity */}
          <div className="space-y-6">
            <RealtimeNotifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
