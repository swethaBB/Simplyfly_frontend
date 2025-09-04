import { useEffect, useState } from 'react';
import axios from '../../services/Axios';
import { useRole } from '../../context/RoleContext';

export default function ManageFlightsPage() {
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [viewMode, setViewMode] = useState(null); 
  const role = useRole();

  useEffect(() => {
    if (viewMode) fetchFlights();
  }, [viewMode]);

  const fetchFlights = () => {
    axios.get('/api/flights/all')
      .then(res => setFlights(res.data))
      .catch(err => console.error('Error fetching flights:', err));
  };

  const handleDelete = (id) => {
    if (role !== 'ADMIN') return;
    axios.delete(`/api/flights/${id}`)
      .then(() => setFlights(prev => prev.filter(f => f.id !== id)))
      .catch(err => console.error('Delete failed:', err));
  };

  const handleUpdate = () => {
    if (role !== 'ADMIN') return;
    axios.put(`/api/flights/${editingFlight.id}`, editingFlight)
      .then(() => {
        setEditingFlight(null);
        fetchFlights();
      })
      .catch(err => console.error('Update failed:', err));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Flights</h2>

      <div className="mb-4 d-flex gap-3">
        <button className="btn btn-primary" onClick={() => setViewMode('LIST')}>List All Flights</button>
        <button className="btn btn-warning" onClick={() => setViewMode('EDIT')}>Edit</button>
        {role === 'ADMIN' && (
          <button className="btn btn-danger" onClick={() => setViewMode('DELETE')}>Delete</button>
        )}
      </div>

      {viewMode === 'LIST' && flights.map(f => (
        <div key={f.id} className="card mb-2 p-3">
          <h5>{f.flightName} ({f.flightNumber})</h5>
          <p>From {f.route.origin} to {f.route.destination}</p>
          <p>Fare: ₹{f.fare} | Seats: {f.totalSeats}</p>
          <p>Baggage: {f.baggageInfo}</p>
          <p>Departure: {f.departureDateTime} | Arrival: {f.arrivalDateTime}</p>
        </div>
      ))}

      {viewMode === 'EDIT' && flights.map(f => (
        <div key={f.id} className="card mb-2 p-3">
          <h5>{f.flightName} ({f.flightNumber})</h5>
          <p>From {f.route.origin} to {f.route.destination}</p>
          <button className="btn btn-warning" onClick={() => setEditingFlight(f)}>Edit</button>
        </div>
      ))}

      {viewMode === 'DELETE' && flights.map(f => (
        <div key={f.id} className="card mb-2 p-3">
          <h5>{f.flightName} ({f.flightNumber})</h5>
          <p>From {f.route.origin} to {f.route.destination}</p>
          <button className="btn btn-danger" onClick={() => handleDelete(f.id)}>Delete</button>
        </div>
      ))}

      {editingFlight && (
        <div className="card mt-4 p-3">
          <h4>Edit Flight</h4>
          <input
            type="text"
            className="form-control mb-2"
            value={editingFlight.flightName}
            onChange={(e) => setEditingFlight({ ...editingFlight, flightName: e.target.value })}
            placeholder="Flight Name"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={editingFlight.flightNumber}
            onChange={(e) => setEditingFlight({ ...editingFlight, flightNumber: e.target.value })}
            placeholder="Flight Number"
          />
          <input
            type="number"
            className="form-control mb-2"
            value={editingFlight.fare}
            onChange={(e) => setEditingFlight({ ...editingFlight, fare: e.target.value })}
            placeholder="Fare"
          />
          <input
            type="number"
            className="form-control mb-2"
            value={editingFlight.totalSeats}
            onChange={(e) => setEditingFlight({ ...editingFlight, totalSeats: e.target.value })}
            placeholder="Total Seats"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={editingFlight.baggageInfo}
            onChange={(e) => setEditingFlight({ ...editingFlight, baggageInfo: e.target.value })}
            placeholder="Baggage Info"
          />
          <input
            type="datetime-local"
            className="form-control mb-2"
            value={editingFlight.departureDateTime}
            onChange={(e) => setEditingFlight({ ...editingFlight, departureDateTime: e.target.value })}
            placeholder="Departure DateTime"
          />
          <input
            type="datetime-local"
            className="form-control mb-2"
            value={editingFlight.arrivalDateTime}
            onChange={(e) => setEditingFlight({ ...editingFlight, arrivalDateTime: e.target.value })}
            placeholder="Arrival DateTime"
          />
          <input
            type="number"
            className="form-control mb-2"
            value={editingFlight.route.id}
            onChange={(e) => setEditingFlight({
              ...editingFlight,
              route: { ...editingFlight.route, id: parseInt(e.target.value) }
            })}
            placeholder="Route ID"
          />

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleUpdate}>Save Changes</button>
            <button className="btn btn-secondary" onClick={() => setEditingFlight(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
