export default function PaymentForm({ onPay }) {
  return (
    <div className="mt-4">
      <h4>Payment Method</h4>
      <button className="btn btn-primary" onClick={() => onPay('CARD')}>Pay with Card</button>
      <button className="btn btn-success ms-2" onClick={() => onPay('UPI')}>Pay with UPI</button>
    </div>
  );
}
