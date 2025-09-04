import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import flightownerbg from '../../assets/flightownerbg.png'; 

export default function FlightOwnerDashboard() {
  const role = useRole();
  if (role !== 'FLIGHT_OWNER') return <div>Access Denied</div>;

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${flightownerbg})`,
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
          Flight Owner Dashboard
        </h2>
        <Link to="/create-flight" className="btn btn-success me-3">Create Flight</Link>
        <Link to="/manage-flights" className="btn btn-primary">Manage My Flights</Link>
      </div>
    </div>
  );
}
