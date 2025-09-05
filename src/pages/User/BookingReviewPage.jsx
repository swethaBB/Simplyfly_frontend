import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../services/Axios';
import bgreview from '../../assets/bgadmin.png';
import { toast } from 'react-toastify';

export default function BookingReviewPage() {
  const location = useLocation();
  const [flight, setFlight] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const {
    bookingId,
    passengerName,
    email,
    seatNumbers,
    totalPrice,
    flightId
  } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      toast.error("Missing booking data.");
    }
  }, [location.state]);

  useEffect(() => {
    if (flightId) {
      axios.get(`/api/flights/${flightId}`)
        .then(res => setFlight(res.data))
        .catch(err => {
          console.error('Error fetching flight:', err);
          toast.error("Failed to load flight details.");
        });
    }
  }, [flightId]);

  const handlePayment = async (method) => {
    if (!bookingId || !totalPrice) {
      toast.error("Missing booking details.");
      return;
    }

    setIsPaying(true);
    toast.info(`Processing ${method} payment...`);

    try {
      await new Promise(res => setTimeout(res, 1500));
      localStorage.setItem('paymentData', JSON.stringify({ bookingId, amount: totalPrice }));
      toast.success("Payment successful!");
      setPaymentSuccess(true);
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  if (!location.state) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger">Booking data not found.</h4>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start"
      style={{
        backgroundImage: `url(${bgreview})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        paddingTop: '100px'
      }}
    >
      <h2 className="mb-4" style={{ fontWeight: '600', fontSize: '2rem', color: 'black' }}>
        Review Your Booking
      </h2>

      <div style={{ width: '100%', maxWidth: '600px' }} className="px-3">
        <div className="mb-3">
          <p className="fs-5"><strong>Passenger Name:</strong> {passengerName}</p>
          <p className="fs-5"><strong>Email:</strong> {email}</p>
        </div>

        {flight ? (
          <div className="mb-3">
            <p className="fs-5"><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p className="fs-5"><strong>Flight Name:</strong> {flight.flightName}</p>
            <p className="fs-5"><strong>From:</strong> {flight.route?.origin}</p>
            <p className="fs-5"><strong>To:</strong> {flight.route?.destination}</p>
          </div>
        ) : (
          <p className="text-muted">Loading flight details...</p>
        )}

        <p className="fs-5"><strong>Seats Selected:</strong> {seatNumbers?.join(', ')}</p>
        <p className="fs-5"><strong>Total Fare:</strong> ₹{totalPrice}</p>

        {!paymentSuccess ? (
          <div className="mt-4 p-4 bg-white rounded shadow-sm">
            <h4 className="mb-3 text-center" style={{ fontWeight: '600' }}>Choose Payment Method</h4>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary me-2"
                disabled={isPaying}
                onClick={() => handlePayment('CARD')}
              >
                {isPaying ? 'Processing...' : 'Pay with Card'}
              </button>

              <button
                className="btn btn-success"
                disabled={isPaying}
                onClick={() => handlePayment('UPI')}
              >
                {isPaying ? 'Processing...' : 'Pay with UPI'}
              </button>
            </div>

            <p className="mt-3 text-muted text-center" style={{ fontSize: '0.9rem' }}>
              Your payment is secure and encrypted.
            </p>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-light rounded text-center">
            <h5 className="text-success">✅ Payment completed successfully!</h5>
            <p className="text-muted">Thank you for booking with SimplyFly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
