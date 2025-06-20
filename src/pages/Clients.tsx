
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, Plus, Search, Mail, Phone, Building, Edit, Trash2, User } from 'lucide-react';

interface Client {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_at: string;
}

// Mock data for clients
const mockClients: Client[] = [
  {
    id: '1',
    full_name: 'Ambassador Johnson',
    email: 'ambassador.johnson@embassy.com',
    phone: '+1 (555) 123-4567',
    company: 'Embassy of Example',
    notes: 'High-profile diplomatic meetings',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    full_name: 'CEO Sarah Williams',
    email: 'sarah.williams@megacorp.com',
    phone: '+1 (555) 234-5678',
    company: 'MegaCorp International',
    notes: 'Corporate events and business summits',
    created_at: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    full_name: 'Minister David Chen',
    email: 'minister.chen@gov.example',
    phone: '+1 (555) 345-6789',
    company: 'Ministry of Trade',
    notes: 'Government protocol events',
    created_at: '2024-01-17T10:00:00Z'
  }
];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredClients = clients.filter((client) =>
    client.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClient = (client: Client) => {
    setClients(prev => prev.filter(c => c.id !== client.id));
    toast({
      title: "Client Deleted",
      description: `${client.full_name} has been removed from the client database.`,
    });
  };

  const handleAddClient = () => {
    toast({
      title: "Feature Unavailable",
      description: "Client management features require database connection.",
    });
  };

  const handleEditClient = (client: Client) => {
    toast({
      title: "Feature Unavailable",
      description: "Client editing features require database connection.",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-vip-gold">Client Management</h1>
            <p className="text-vip-gold/70 mt-1">Manage your VVIP client database</p>
          </div>
          <Button 
            onClick={handleAddClient}
            className="bg-vip-gold text-black hover:bg-vip-gold/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-vip-gold/60" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-vip-gold/30 bg-black text-vip-gold"
            />
          </div>
          <Badge variant="outline" className="border-vip-gold/30 text-vip-gold">
            {filteredClients.length} Clients
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="bg-black border-vip-gold/30 hover:border-vip-gold/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-vip-gold/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-vip-gold" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-vip-gold">{client.full_name || 'Unnamed Client'}</CardTitle>
                    {client.company && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Building className="h-3 w-3 text-vip-gold/60" />
                        <span className="text-sm text-vip-gold/70">{client.company}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClient(client)}
                    className="text-vip-gold hover:text-vip-gold-light hover:bg-vip-gold/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClient(client)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {client.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-vip-gold/60" />
                  <a 
                    href={`mailto:${client.email}`}
                    className="text-sm text-vip-gold/80 hover:text-vip-gold hover:underline"
                  >
                    {client.email}
                  </a>
                </div>
              )}
              {client.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-vip-gold/60" />
                  <span className="text-sm text-vip-gold/80">{client.phone}</span>
                </div>
              )}
              {client.notes && (
                <p className="text-sm text-vip-gold/70 line-clamp-2">{client.notes}</p>
              )}
              <div className="text-xs text-vip-gold/50 pt-2 border-t border-vip-gold/20">
                Added: {new Date(client.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredClients.length === 0 && (
          <div className="col-span-full">
            <Card className="bg-black border-vip-gold/30">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-vip-gold/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-vip-gold mb-2">No Clients Found</h3>
                <p className="text-vip-gold/70 mb-4">
                  {searchTerm ? 'No clients match your search criteria.' : 'Start building your VVIP client database.'}
                </p>
                <Button 
                  onClick={handleAddClient}
                  className="bg-vip-gold text-black hover:bg-vip-gold/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Client
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
