import { useState, useEffect } from 'react';
import { Plane, Calendar, Download, Edit3, ClipboardList, Settings } from 'lucide-react';
import { userTrips } from '../data/destinations';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const tabOptions = ['Upcoming', 'Past', 'Cancelled'];
const statusColors = {
    confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    past: 'bg-white/10 text-white/52 border-white/20',
};

export default function MyTripsPage() {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

    const filteredTrips = userTrips.filter((trip) => {
        if (activeTab === 'Upcoming') return trip.status === 'confirmed' && trip.daysAway > 0;
        if (activeTab === 'Past') return trip.status === 'past' || trip.daysAway === 0;
        return trip.status === 'cancelled';
    });

    return (
        <div className="min-h-screen bg-[#0a0f1a] pt-[72px]">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)`, filter: 'blur(60px)', opacity: 0.15 }} />
            </div>
            <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8 py-8">
                <div className={`reveal reveal-down ${loaded ? 'in-view' : ''} flex items-center justify-between mb-8`}>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-base/40 to-gold-rich/30 flex items-center justify-center">
                            <span className="font-body text-lg font-medium text-gold-light">S</span>
                        </div>
                        <div>
                            <h1 className="font-display text-2xl text-white font-semibold">Sarah Mitchell</h1>
                            <span className="font-body text-xs text-white/52">Gold Member · 3 trips booked</span>
                        </div>
                    </div>
                    <button className="glass-pill rounded-full h-9 px-4 flex items-center gap-2 font-body text-xs text-white/75 hover:-translate-y-0.5 pill-transition"><Settings size={14} /> Settings</button>
                </div>

                <div className={`reveal reveal-up stagger-1 ${loaded ? 'in-view' : ''} flex items-center gap-2 mb-8`}>
                    {tabOptions.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full h-10 px-5 font-body text-xs uppercase tracking-[0.14em] pill-transition ${activeTab === tab ? 'glass-gold text-[#3A2000] font-medium' : 'glass-pill text-white/75 hover:-translate-y-0.5'}`}>{tab}</button>
                    ))}
                </div>

                <div className="space-y-5">
                    {filteredTrips.length === 0 ? (
                        <div className="glass-ultra glass-specular rounded-[20px] p-12 text-center">
                            <span className="text-4xl block mb-4">✈️</span>
                            <h3 className="font-display text-xl text-white font-semibold mb-2">No {activeTab.toLowerCase()} trips</h3>
                            <p className="font-body text-sm text-white/52 mb-6">{activeTab === 'Cancelled' ? 'Great — no cancellations!' : 'Start planning your next adventure'}</p>
                            <Link to="/" className="glass-gold rounded-full h-11 px-6 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] inline-flex items-center gap-2 hover:-translate-y-0.5 press-effect">Explore Destinations →</Link>
                        </div>
                    ) : filteredTrips.map((trip, i) => <TripCard key={trip.id} trip={trip} index={i} />)}
                </div>
            </div>
        </div>
    );
}

function TripCard({ trip, index }) {
    const [ref] = useInView();
    const sc = statusColors[trip.status] || statusColors.confirmed;
    return (
        <div ref={ref} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)} glass-ultra glass-specular rounded-[20px] overflow-hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
                <div className="h-[160px] md:h-full bg-cover bg-center" style={{ backgroundImage: `url(${trip.image})` }} />
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-display text-xl text-white font-semibold">{trip.hotel}</h3>
                            <div className="font-body text-sm text-white/52 mt-1">{trip.room}</div>
                            <div className="flex items-center gap-2 mt-2 text-white/52"><Plane size={12} /><span className="font-body text-xs">{trip.flight} · {trip.airline} · {trip.class}</span></div>
                            <div className="flex items-center gap-2 mt-1 text-white/52"><Calendar size={12} /><span className="font-body text-xs">{trip.checkIn} – {trip.checkOut} · {trip.nights} nights · {trip.guests}</span></div>
                        </div>
                        <span className={`glass-pill rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-wider border ${sc}`}>● {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</span>
                    </div>
                    {trip.daysAway > 0 && (
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-body text-xs text-white/52">🗓 {trip.daysAway} days away</span>
                                <span className="font-mono text-xs text-gold-light">{Math.round((1 - trip.daysAway / 365) * 100)}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-gold-base to-gold-light rounded-full animate-progress" style={{ width: `${Math.round((1 - trip.daysAway / 365) * 100)}%` }} />
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                        {[{ icon: Download, label: 'e-Ticket' }, { icon: Edit3, label: 'Modify' }, { icon: ClipboardList, label: 'Checklist' }].map(({ icon: Icon, label }) => (
                            <button key={label} className="glass-pill rounded-full h-8 px-4 flex items-center gap-2 font-body text-[10px] uppercase tracking-wider text-white/75 hover:-translate-y-0.5 pill-transition"><Icon size={12} /> {label}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
