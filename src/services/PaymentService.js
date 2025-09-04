import axios from './Axios';

export const makePayment = (paymentData) =>
  axios.post('/api/payments/pay', paymentData);

export const initiatePayment = (bookingId, amount) =>
  axios.get('/api/payments/initiate', {
    params: { bookingId, amount }
  });

export const getPaymentById = (id) =>
  axios.get(`/api/payments/${id}`);

export const refundPayment = (id) =>
  axios.post(`/api/payments/refund/${id}`);
