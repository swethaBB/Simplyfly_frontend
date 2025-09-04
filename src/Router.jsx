import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchFlightPage from './pages/User/SearchFlightPage';
import SearchRoutePage from './pages/User/SearchRoutePage';
import SelectSeatPage from './pages/User/SelectSeatPage';
import BookingPage from './pages/User/BookingPage';
import PaymentPage from './pages/User/PaymentPage';
import SuccessPage from './pages/User/SuccessPage';
import UserDashboard from './pages/User/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateFlightPage from './pages/Admin/CreateFlightPage';
import ManageFlightsPage from './pages/Admin/ManageFlightsPage';
import FlightOwnerDashboard from './pages/Owner/FlightOwnerDashboard';
import AdminBookingList from './pages/Admin/BookingList'; // ✅ Import added

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/search-flight" element={<SearchFlightPage />} />
        <Route path="/search-route" element={<SearchRoutePage />} />
        <Route path="/select-seat/:flightId" element={<SelectSeatPage />} />
        <Route path="/booking/:flightId" element={<BookingPage />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/user/userdashboard" element={<UserDashboard />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/create-flight" element={<CreateFlightPage />} />
        <Route path="/manage-flights" element={<ManageFlightsPage />} />
        <Route path="/owner/flightownerdashboard" element={<FlightOwnerDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookingList />} /> {/* ✅ Route confirmed */}
      </Routes>
    </BrowserRouter>
  );
}
