
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Info } from 'lucide-react';

const TourBookingForm = ({ tour }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    participantName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    numberOfParticipants: 1,
    bookingDate: '',
    specialRequirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfParticipants' ? parseInt(value) || 1 : value
    }));
  };

  // Calculations
  const totalAmount = tour.price * formData.numberOfParticipants;
  const depositAmount = totalAmount * 0.30;
  const remainingAmount = totalAmount - depositAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate participant count
      if (tour.minParticipants && formData.numberOfParticipants < tour.minParticipants) {
        toast({
          title: 'Invalid participant count',
          description: `Minimum ${tour.minParticipants} participants required`,
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      if (tour.maxParticipants && formData.numberOfParticipants > tour.maxParticipants) {
        toast({
          title: 'Invalid participant count',
          description: `Maximum ${tour.maxParticipants} participants allowed`,
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      const bookingReference = 'BK' + Date.now();

      // Create booking
      const booking = await pb.collection('bookings').create({
        tourId: tour.id,
        userId: currentUser?.id || '',
        participantName: formData.participantName,
        email: formData.email,
        phone: formData.phone,
        numberOfParticipants: formData.numberOfParticipants,
        bookingDate: formData.bookingDate,
        specialRequirements: formData.specialRequirements,
        bookingStatus: 'pending',
        paymentStatus: 'unpaid',
        totalAmount: totalAmount,
        depositPaid: 0,
        bookingReference: bookingReference
      }, { $autoCancel: false });

      toast({
        title: 'Booking created!',
        description: `Booking reference: ${bookingReference}`
      });

      // Redirect to payment page
      navigate(`/payment/${booking.id}`);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking failed',
        description: error.message || 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="participantName" className="text-gray-900 font-semibold">Full Name *</Label>
          <Input
            id="participantName"
            name="participantName"
            type="text"
            required
            value={formData.participantName}
            onChange={handleChange}
            className="mt-1 bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#FF6B35]"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-900 font-semibold">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#FF6B35]"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-900 font-semibold">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#FF6B35]"
          />
        </div>

        <div>
          <Label htmlFor="bookingDate" className="text-gray-900 font-semibold">Preferred Date *</Label>
          <Input
            id="bookingDate"
            name="bookingDate"
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.bookingDate}
            onChange={handleChange}
            className="mt-1 bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#FF6B35]"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="numberOfParticipants" className="text-gray-900 font-semibold">Number of Participants *</Label>
        <Input
          id="numberOfParticipants"
          name="numberOfParticipants"
          type="number"
          min={tour.minParticipants || 1}
          max={tour.maxParticipants || 20}
          required
          value={formData.numberOfParticipants}
          onChange={handleChange}
          className="mt-1 bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#FF6B35] max-w-[200px]"
        />
        {tour.minParticipants && (
          <p className="text-sm text-gray-500 mt-1">Minimum: {tour.minParticipants} participants</p>
        )}
      </div>

      <div>
        <Label htmlFor="specialRequirements" className="text-gray-900 font-semibold">Special Dietary Requirements</Label>
        <Textarea
          id="specialRequirements"
          name="specialRequirements"
          rows={3}
          value={formData.specialRequirements}
          onChange={handleChange}
          placeholder="Please let us know about any allergies or dietary restrictions..."
          className="mt-1 bg-gray-50 border-gray-200 text-gray-900 focus-visible:ring-[#FF6B35]"
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 text-lg">Payment Summary</h4>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center text-gray-600">
            <span>Price per person:</span>
            <span>€{tour.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Participants:</span>
            <span>x {formData.numberOfParticipants}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Amount:</span>
            <span>€{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#FFD700] shadow-sm">
          <div className="flex justify-between items-center font-black text-lg mb-1">
            <span className="text-gray-900">Deposit Due Now (30%):</span>
            <span className="text-[#FF6B35]">€{depositAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Remaining Balance:</span>
            <span>€{remainingAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-start text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <Info className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Policy:</strong> You will pay the deposit now to secure your booking. 
            The deposit is non-refundable. Full payment of the remaining balance is due 7 days before the tour date.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      >
        {loading ? 'Processing...' : `Pay Deposit (€${depositAmount.toFixed(2)})`}
      </Button>
    </form>
  );
};

export default TourBookingForm;
