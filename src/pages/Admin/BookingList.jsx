import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Container } from 'react-bootstrap';
import { getAllBookings, cancelBooking } from "../../services/BookingService";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookings()
      .then(res => {
        if (Array.isArray(res)) {
          setBookings(res);
        } else {
          console.warn('Unexpected response format:', res);
          setBookings([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setBookings([]);
        setLoading(false);
      });
  }, []);

  const handleCancel = (bookingId) => {
    cancelBooking(bookingId)
      .then(() => {
        alert('Booking cancelled');
        setBookings(prev =>
          prev.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b)
        );
      })
      .catch(() => alert('Cancel failed'));
  };

  if (loading) return <Spinner animation="border" className="mt-5" />;

  return (
    <Container className="mt-4">
      <h3>📋 All Bookings (Admin View)</h3>
      {bookings.length === 0 ? (
        <div className="text-center mt-4">No bookings found.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th> {/* ✅ Added for admin traceability */}
              <th>Flight ID</th>
              <th>Email</th>
              <th>Passenger</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.userId ?? '—'}</td> {/* ✅ Safe fallback */}
                <td>{b.flightId}</td>
                <td>{b.email}</td>
                <td>{b.passengerName || '—'}</td>
                <td>{Array.isArray(b.seatNumbers) ? b.seatNumbers.join(', ') : '—'}</td>
                <td>{b.status}</td>
                <td>₹{b.totalPrice}</td>
                <td>
                  {b.status !== 'CANCELLED' && (
                    <Button variant="danger" size="sm" onClick={() => handleCancel(b.id)}>
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default BookingList;
