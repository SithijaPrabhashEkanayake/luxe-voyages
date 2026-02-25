import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Destinations', path: '/search' },
        { name: 'Inspiration', path: '/inspire' },
        { name: 'My Trips', path: '/my-trips' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                    ? 'backdrop-blur-[60px] bg-black/30'
                    : 'bg-gradient-to-b from-black/42 to-transparent'
                }`}
            style={{ height: '72px' }}
        >
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 h-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-gold-light text-lg">✦</span>
                    <span
                        className="font-display text-lg tracking-[0.2em] text-white uppercase"
                        style={{ fontWeight: 600 }}
                    >
                        Luxe <span className="text-gold-light">Voyages</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-body text-xs uppercase tracking-[0.14em] transition-colors duration-300 hover:text-white ${location.pathname === link.path
                                    ? 'text-white'
                                    : 'text-white/75'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/search"
                        className="glass-pill rounded-full p-2 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Search size={16} className="text-white/75" />
                    </Link>
                    <Link
                        to="/my-trips"
                        className="glass-pill rounded-full h-9 px-4 flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <div className="w-6 h-6 rounded-full bg-gold-base/30 flex items-center justify-center">
                            <User size={14} className="text-gold-light" />
                        </div>
                        <span className="font-body text-xs text-white/75">Hello, Sarah</span>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden glass-pill rounded-full p-2"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    className="md:hidden glass-ultra absolute top-[72px] left-0 right-0 p-6 space-y-4"
                    style={{ borderRadius: '0 0 20px 20px' }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="block font-body text-sm uppercase tracking-[0.1em] text-white/75 hover:text-white py-2"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-white/10">
                        <Link
                            to="/my-trips"
                            className="flex items-center gap-3 text-white/75 hover:text-white"
                        >
                            <User size={16} />
                            <span className="font-body text-sm">My Account</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
