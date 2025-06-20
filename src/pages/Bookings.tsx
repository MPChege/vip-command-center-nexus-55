
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Calendar, Clock, User, MapPin, Eye, Edit, Trash2, FileText, DollarSign, TrendingUp, History, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { NewBookingModal } from '@/components/modals/NewBookingModal';
import { ViewEventDetailsModal } from '@/components/modals/ViewEventDetailsModal';
import { EditEventModal } from '@/components/modals/EditEventModal';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock bookings data
  const [bookings] = useState([
    {
      id: '1',
      client_name: 'Ambassador Johnson',
      service_type: 'Diplomatic Meeting',
      status: 'confirmed',
      approval_status: 'approved',
      scheduled_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      revenue: 150000,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      client_name: 'Minister Chen',
      service_type: 'State Reception',
      status: 'pending',
      approval_status: 'pending',
      scheduled_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      revenue: 250000,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      client_name: 'Sarah Williams',
      service_type: 'Corporate Event',
      status: 'completed',
      approval_status: 'approved',
      scheduled_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      revenue: 180000,
      created_at: new Date().toISOString()
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return { date: 'Not set', time: 'Not set' };
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredBookings = bookings.filter((booking: any) => {
    const matchesSearch = booking.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service_type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Separate upcoming and previous events
  const now = new Date();
  const upcomingEvents = filteredBookings.filter((booking: any) => {
    if (!booking.scheduled_at) return false;
    return new Date(booking.scheduled_at) >= now;
  });

  const previousEvents = filteredBookings.filter((booking: any) => {
    if (!booking.scheduled_at) return true; // Include events without dates in previous
    return new Date(booking.scheduled_at) < now;
  });

  const handleApproveEvent = (id: string) => {
    toast({
      title: "Demo Mode",
      description: "In a real application, this would approve the event.",
    });
  };

  const handleRejectEvent = (id: string) => {
    toast({
      title: "Demo Mode",
      description: "In a real application, this would reject the event.",
    });
  };

  const handleViewItem = (event: any) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const handleEditItem = (event: any) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    toast({
      title: "Demo Mode",
      description: "In a real application, this would delete the event.",
    });
  };

  const handleEventUpdated = () => {
    toast({
      title: "Demo Mode",
      description: "Event updated successfully in demo mode.",
    });
  };

  // Calculate total revenue from completed events
  const totalRevenue = previousEvents
    .filter((event: any) => event.status === 'completed')
    .reduce((sum: number, event: any) => {
      return sum + (event.revenue || 0);
    }, 0);

  const totalEvents = bookings.length;
  const confirmedEvents = bookings.filter((booking: any) => booking.status === 'confirmed').length;
  const completedEvents = previousEvents.filter((event: any) => event.status === 'completed').length;
  const pendingApproval = bookings.filter((booking: any) => booking.approval_status === 'pending').length;

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-vip-black">Events Management</h1>
          <p className="text-vip-gold/80 mt-2">Manage upcoming and previous VVIP events</p>
        </div>
        <NewBookingModal />
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="vip-glass border-vip-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-vip-gold/80">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vip-black">{totalEvents}</div>
            <p className="text-xs text-vip-gold/60">All events</p>
          </CardContent>
        </Card>
        
        <Card className="vip-glass border-vip-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-vip-gold/80">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vip-black">{pendingApproval}</div>
            <p className="text-xs text-yellow-600">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="vip-glass border-vip-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-vip-gold/80">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vip-black">{upcomingEvents.length}</div>
            <p className="text-xs text-green-600">Scheduled ahead</p>
          </CardContent>
        </Card>

        <Card className="vip-glass border-vip-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-vip-gold/80 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-vip-black">KSH {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">From completed events</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="vip-glass border-vip-gold/20">
        <CardHeader>
          <CardTitle className="text-vip-black">Search & Filter Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vip-gold/60" />
              <Input
                placeholder="Search by client or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-vip-gold/30 focus:border-vip-gold bg-white/80 text-vip-black placeholder:text-vip-gold/50"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-vip-gold/30 focus:border-vip-gold bg-white text-vip-black">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-vip-gold/30 z-50">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }} className="border-vip-gold/30 text-vip-gold hover:bg-vip-gold/10">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Upcoming and Previous Events */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Upcoming Events ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="previous" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Previous Events ({previousEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card className="vip-glass border-vip-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center text-vip-black">
                <Calendar className="h-5 w-5 mr-2 text-vip-gold" />
                Upcoming VVIP Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingEvents.map((event: any) => {
                    const { date, time } = formatDateTime(event.scheduled_at);
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.client_name || 'No client name'}</TableCell>
                        <TableCell>{event.service_type || 'Not specified'}</TableCell>
                        <TableCell>{date}</TableCell>
                        <TableCell>{time}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status?.charAt(0).toUpperCase() + event.status?.slice(1) || 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getApprovalStatusColor(event.approval_status)}>
                              {event.approval_status?.charAt(0).toUpperCase() + event.approval_status?.slice(1) || 'Unknown'}
                            </Badge>
                            {event.approval_status === 'pending' && (
                              <div className="flex gap-1">
                                <Button 
                                  onClick={() => handleApproveEvent(event.id)}
                                  variant="outline" 
                                  size="sm"
                                  className="border-green-300 text-green-600 hover:bg-green-50"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button 
                                  onClick={() => handleRejectEvent(event.id)}
                                  variant="outline" 
                                  size="sm"
                                  className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleViewItem(event)}
                              variant="outline" 
                              size="sm"
                              className="border-vip-gold/30 text-vip-gold hover:bg-vip-gold/10"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              onClick={() => handleEditItem(event)}
                              variant="outline" 
                              size="sm"
                              className="border-vip-gold/30 text-vip-gold hover:bg-vip-gold/10"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              onClick={() => handleDeleteItem(event.id)}
                              variant="outline" 
                              size="sm"
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-vip-gold/60">No upcoming events found. Add a new event to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous">
          <Card className="vip-glass border-vip-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center text-vip-black">
                <History className="h-5 w-5 mr-2 text-vip-gold" />
                Previous VVIP Events & Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previousEvents.map((event: any) => {
                    const { date } = formatDateTime(event.scheduled_at);
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.client_name || 'No client name'}</TableCell>
                        <TableCell>{event.service_type || 'Not specified'}</TableCell>
                        <TableCell>{date}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          KSH {(event.revenue || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status?.charAt(0).toUpperCase() + event.status?.slice(1) || 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleViewItem(event)}
                              variant="outline" 
                              size="sm"
                              className="border-vip-gold/30 text-vip-gold hover:bg-vip-gold/10"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              onClick={() => handleViewItem(event)}
                              variant="outline" 
                              size="sm"
                              className="border-vip-gold/30 text-vip-gold hover:bg-vip-gold/10"
                            >
                              <FileText className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {previousEvents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-vip-gold/60">No previous events found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ViewEventDetailsModal 
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        event={selectedEvent}
      />
      
      <EditEventModal 
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        event={selectedEvent}
        onEventUpdated={handleEventUpdated}
      />
    </div>
  );
};

export default Bookings;
