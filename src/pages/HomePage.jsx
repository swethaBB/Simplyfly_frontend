import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/home.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-start align-items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        overflowY: 'auto',
        paddingTop: '100px',
        color: '#000',
      }}
    >
      {/* Header Section */}
      <div className="p-4 rounded text-center w-75" style={{ backgroundColor: 'transparent' }}>
        <h1 className="display-5 fw-bold">Welcome to SimplyFly</h1>
        <p className="lead">Your gateway to seamless travel</p>
        <button className="btn btn-primary mt-2" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>

      <div className="container mt-5">
        {/* Offers Section */}
        <div className="mb-5">
          <h2 className="text-center mb-3">🔥 Latest Offers</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2">Up to ₹2500 off every Friday – Use code <strong>FLYFRIDAY</strong></li>
            <li className="mb-2">Special fares for students & senior citizens</li>
            <li className="mb-2">₹3000 off on Air India international routes</li>
          </ul>
        </div>

        {/* Popular Destinations */}
        <div className="mb-5">
          <h2 className="text-center mb-4">🌍 Popular Destinations</h2>
          <div className="row justify-content-center">
            {["Goa", "Delhi", "Bangalore", "Jaipur", "Pattaya"].map((place) => (
              <div className="col-md-4 col-sm-6 mb-4 text-center" key={place}>
                <img
                  src={`/assets/${place.toLowerCase()}.jpg`}
                  alt={place}
                  style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
                  onError={(e) => { e.target.src = '/assets/default.jpg'; }}
                />
                <p className="mt-2">Explore {place} with SimplyFly</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-5">
          <h2 className="text-center mb-3">📖 About SimplyFly</h2>
          <div className="p-3 rounded" style={{ backgroundColor: 'transparent' }}>
            <p>
              SimplyFly is your trusted travel partner, offering seamless booking experiences for flights, hotels, and more.
              We’re committed to clarity, speed, and customer-first service. Whether you're an admin, owner, or traveler—
              SimplyFly is built for you.
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mb-5">
          <h2 className="text-center mb-3">🆘 Help & Support</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li className="mb-2">24/7 customer care</li>
            <li className="mb-2">Easy cancellation & refund policies</li>
            <li className="mb-2">Support for visa rejections & medical emergencies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
