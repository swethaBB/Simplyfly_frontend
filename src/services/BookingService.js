import axios from './Axios';

export const bookSeat = (bookingData) =>
  axios.post('/api/bookings/bookingseat', bookingData);

export const getBookingById = (id) =>
  axios.get(`/api/bookings/${id}`);

export const getMyBookings = () =>
  axios.get('/api/bookings/me');

export const getBookingsForFlight = (flightId) =>
  axios.get(`/api/bookings/flight/${flightId}`);

export const cancelBooking = (id) =>
  axios.delete(`/api/bookings/${id}`);

export const getAllBookings = () =>
  axios.get('/api/bookings/all');
