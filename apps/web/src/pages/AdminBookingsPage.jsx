
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient';
import Header from '@/components/Header.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download, Search, Trash2, Edit, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [toursMap, setToursMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Fetch tours to map IDs to names
      const tours = await pb.collection('tours').getFullList({ $autoCancel: false });
      const tMap = {};
      tours.forEach(t => { tMap[t.id] = t.tourName; });
      setToursMap(tMap);

      // Fetch bookings
      let filterStr = '';
      if (statusFilter !== 'all') {
        filterStr = `paymentStatus="${statusFilter}" || bookingStatus="${statusFilter}"`;
      }

      const records = await pb.collection('bookings').getFullList({
        sort: '-created',
        filter: filterStr,
        $autoCancel: false
      });
      setBookings(records);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bookings.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const response = await apiServerClient.fetch('/bookings/export-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: statusFilter !== 'all' ? { status: statusFilter } : {}
        })
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookings_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({ title: 'Export successful', description: 'CSV file downloaded.' });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export failed',
        description: 'Could not generate CSV file.',
        variant: 'destructive'
      });
    } finally {
      setExporting(false);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      await pb.collection('bookings').update(id, {
        bookingStatus: newStatus
      }, { $autoCancel: false });
      
      toast({ title: 'Status updated', description: `Booking marked as ${newStatus}.` });
      fetchBookings();
    } catch (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    }
  };

  const confirmDelete = (booking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!bookingToDelete) return;
    try {
      await pb.collection('bookings').delete(bookingToDelete.id, { $autoCancel: false });
      toast({ title: 'Booking deleted' });
      fetchBookings();
    } catch (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } finally {
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.bookingReference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.participantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (booking) => {
    if (booking.bookingStatus === 'cancelled') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1"/> Cancelled</span>;
    }
    if (booking.paymentStatus === 'fully_paid') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1"/> Fully Paid</span>;
    }
    if (booking.paymentStatus === 'deposit_paid') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1"/> Deposit Paid</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Pending</span>;
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Bookings | Rockin' Kitchen Sicily</title>
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Bookings Dashboard</h1>
              <p className="text-gray-500">Manage your tour reservations and payments</p>
            </div>
            
            <Button 
              onClick={handleExportCSV} 
              disabled={exporting}
              className="bg-[#1a1a1a] hover:bg-gray-800 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export to CSV'}
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search ref, name, email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white"
                />
              </div>
              
              <div className="w-full sm:max-w-[200px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="deposit_paid">Deposit Paid</SelectItem>
                    <SelectItem value="fully_paid">Fully Paid</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Ref / Date</TableHead>
                    <TableHead className="font-semibold text-gray-900">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-900">Tour</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-center">Pax</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Financials</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-center">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">Loading bookings...</TableCell>
                    </TableRow>
                  ) : filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">No bookings found.</TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell>
                          <div className="font-medium text-gray-900">{booking.bookingReference}</div>
                          <div className="text-xs text-gray-500">{new Date(booking.bookingDate).toLocaleDateString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{booking.participantName}</div>
                          <div className="text-xs text-gray-500">{booking.email}</div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {toursMap[booking.tourId] || 'Unknown Tour'}
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {booking.numberOfParticipants}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="text-sm font-bold text-gray-900">Total: €{booking.totalAmount?.toFixed(2)}</div>
                          <div className="text-xs text-[#FF6B35]">Dep: €{booking.depositPaid?.toFixed(2)}</div>
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(booking)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {booking.bookingStatus !== 'cancelled' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="h-8 text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                Cancel
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => confirmDelete(booking)}
                              className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the booking
              record for {bookingToDelete?.participantName} ({bookingToDelete?.bookingReference}).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminBookingsPage;
