import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PaymentForm from "../../components/PaymentForm";
import bgpay from '../../assets/bookingbg.png';
import { toast } from 'react-toastify';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);
  const [bookingId, setBookingId] = useState(null); // Optional: for tracking
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('paymentData');
    if (stored) {
      const { bookingId: storedId, amount: storedAmount } = JSON.parse(stored);
      setAmount(storedAmount);
      setBookingId(storedId);
    } else {
      toast.error("Missing payment data. Redirecting...");
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = async (method) => {
    setIsPaying(true);
    toast.info(`Processing ${method} payment...`);
    try {
      // Simulate payment processing
      await new Promise(res => setTimeout(res, 1500));
      toast.success("Payment successful!");
      navigate('/payment-success'); // Adjust route as needed
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start"
      style={{
        backgroundImage: `url(${bgpay})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        paddingTop: '100px'
      }}
    >
      <h2 className="mb-4" style={{ fontWeight: '600', fontSize: '2rem', color: 'black' }}>
        Complete Your Payment
      </h2>

      <div style={{ width: '100%', maxWidth: '500px' }} className="px-3">
        {amount ? (
          <PaymentForm onPay={handlePayment} isPaying={isPaying} />
        ) : (
          <p className="text-muted">Loading payment form...</p>
        )}
      </div>
    </div>
  );
}
