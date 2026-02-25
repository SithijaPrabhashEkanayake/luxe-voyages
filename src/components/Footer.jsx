import { Link } from 'react-router-dom';
import TrustBadges from './TrustBadges';

const footerLinks = {
    Destinations: ['Bali', 'Santorini', 'Kyoto', 'Maldives', 'Kerala', 'Thailand'],
    Company: ['About Us', 'Careers', 'Press', 'Blog', 'Partners'],
    Support: ['Help Center', 'Contact Us', 'Cancellation Policy', 'Travel Insurance', 'ATOL Protection'],
    Legal: ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'GDPR'],
};

const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'];

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-[#0a0f1a] to-[#060a12] pt-20 pb-8">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-base/30 to-transparent" />

            <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-gold-light text-lg">✦</span>
                            <span className="font-display text-lg tracking-[0.2em] text-white uppercase font-semibold">
                                Luxe <span className="text-gold-light">Voyages</span>
                            </span>
                        </Link>
                        <p className="font-body text-sm text-white/52 leading-relaxed max-w-xs mb-6">
                            Your personal travel concierge, available 24/7 on any device. Seamless booking, immersive discovery, unshakeable trust.
                        </p>
                        <TrustBadges compact />
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-body text-xs uppercase tracking-[0.14em] text-gold-light/80 mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="font-body text-sm text-white/52 hover:text-white transition-colors duration-300"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        {paymentMethods.map((method) => (
                            <span
                                key={method}
                                className="glass-micro rounded-md px-3 py-1.5 font-body text-[10px] uppercase tracking-wider text-white/40"
                            >
                                {method}
                            </span>
                        ))}
                    </div>
                    <p className="font-body text-xs text-white/35">
                        © 2025 Luxe Voyages. All rights reserved. ATOL Protected (T40281).
                    </p>
                </div>
            </div>
        </footer>
    );
}
