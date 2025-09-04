import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import bgpayment from '../../assets/userbg.png';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('');
  const [error, setError] = useState('');

  const handlePayment = () => {
    if (!method) {
      setError('Please select a payment method');
      return;
    }

    navigate('/success');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bgpayment})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: '40px'
      }}
    >
      <div
        className="shadow-lg p-4 rounded"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          maxWidth: '500px',
          width: '100%'
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontWeight: '600', fontSize: '2rem', color: 'black' }}>
          Complete Your Payment
        </h2>

        <div className="mb-3">
          <label className="form-label" style={{ color: 'black' }}>Select Payment Method</label>
          <select
            className="form-select"
            value={method}
            onChange={e => setMethod(e.target.value)}
          >
            <option value="">-- Choose Method --</option>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
            <option value="NET_BANKING">Net Banking</option>
          </select>
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
