import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import bdadmin from '../../assets/bgadmin.png';

export default function AdminDashboard() {
  const role = useRole();
  if (role !== 'ADMIN') return <div>Access Denied</div>;

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${bdadmin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div className="text-center">
        <h2 style={{ color: 'white', fontWeight: '600', fontSize: '2rem', marginBottom: '30px' }}>
          Admin Dashboard
        </h2>

        <div className="d-flex flex-column gap-3 align-items-center">
          <Link to="/create-flight" className="btn btn-success w-75">✈️ Create Flight</Link>
          <Link to="/manage-flights" className="btn btn-primary w-75">🛠️ Manage Flights</Link>
          <Link to="/admin/bookings" className="btn btn-warning w-75">📋 View All Bookings</Link>
        </div>
      </div>
    </div>
  );
}
