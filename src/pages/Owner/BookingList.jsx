import React, { useEffect, useState } from 'react';
import {
  getAllBookings,
  getBookingsByStatus,
  getBookingsByFlightAndStatus,
  getBookingsByDateRange,
  cancelBooking
} from '../../services/bookingService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    flightId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to fetch bookings');
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled');
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    }
  };

  const handleFilter = async () => {
    try {
      if (filters.flightId && filters.status) {
        const res = await getBookingsByFlightAndStatus(filters.flightId, filters.status);
        setBookings(res.data);
      } else if (filters.status) {
        const res = await getBookingsByStatus(filters.status);
        setBookings(res.data);
      } else if (filters.startDate && filters.endDate) {
        const res = await getBookingsByDateRange(filters.startDate, filters.endDate);
        setBookings(res.data);
      } else {
        fetchAllBookings();
      }
    } catch (err) {
      toast.error('Filter failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📋 Booking List</h2>

      <div className="card p-3 mb-4">
        <h5>🔍 Filter Bookings</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Status (e.g. PENDING)"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Flight ID"
              value={filters.flightId}
              onChange={(e) => setFilters({ ...filters, flightId: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="datetime-local"
              className="form-control"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="datetime-local"
              className="form-control"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleFilter}>Apply Filters</button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Passenger</th>
            <th>Email</th>
            <th>Flight ID</th>
            <th>Status</th>
            <th>Seats</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No bookings found</td>
            </tr>
          ) : (
            bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.passengerName}</td>
                <td>{b.email}</td>
                <td>{b.flightId}</td>
                <td>{b.status}</td>
                <td>{b.seatNumbers.join(', ')}</td>
                <td>₹{b.totalPrice}</td>
                <td>
                  {b.status !== 'CANCELLED' ? (
                    <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b.id)}>
                      Cancel
                    </button>
                  ) : (
                    <span className="text-muted">Cancelled</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;