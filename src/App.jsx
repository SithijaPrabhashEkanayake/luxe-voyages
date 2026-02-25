import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import MyTripsPage from './pages/MyTripsPage';
import InspirePage from './pages/InspirePage';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/hotel/:id" element={<HotelDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/my-trips" element={<MyTripsPage />} />
                    <Route path="/inspire" element={<InspirePage />} />
                </Routes>
            </Layout>
        </Router>
    );
}
