import { useState, useEffect } from 'react';
import { Star, Heart, Share2, ArrowLeft, ChevronLeft, ChevronRight, Check, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hotelData } from '../data/destinations';
import ReviewCard from '../components/ReviewCard';
import TrustBadges from '../components/TrustBadges';
import { useInView } from '../hooks/useInView';

const tabs = ['Overview', 'Rooms', 'Amenities', 'Reviews', 'Map'];

export default function HotelDetailPage() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [activeImage, setActiveImage] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [saved, setSaved] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const hotel = hotelData;

    const [descRef] = useInView();
    const [roomsRef] = useInView();
    const [amenRef] = useInView();
    const [reviewsRef] = useInView();
    const [bookRef] = useInView();

    useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

    return (
        <div className="min-h-screen bg-[#0a0f1a] pt-[72px]">
            <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <div key={activeImage} className="absolute inset-0 bg-cover bg-center crossfade-enter" style={{ backgroundImage: `url(${hotel.images[activeImage]})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-black/30" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                    <button onClick={() => setActiveImage((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)} className="glass-micro rounded-full w-8 h-8 flex items-center justify-center hover:-translate-y-0.5 pill-transition"><ChevronLeft size={16} /></button>
                    {hotel.images.map((_, i) => (<button key={i} onClick={() => setActiveImage(i)} className={`rounded-full pill-transition ${i === activeImage ? 'w-6 h-1.5 bg-gold-base' : 'w-1.5 h-1.5 bg-white/28'}`} />))}
                    <button onClick={() => setActiveImage((prev) => (prev + 1) % hotel.images.length)} className="glass-micro rounded-full w-8 h-8 flex items-center justify-center hover:-translate-y-0.5 pill-transition"><ChevronRight size={16} /></button>
                </div>
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <Link to="/search" className="glass-pill rounded-full h-9 px-4 flex items-center gap-2 font-body text-xs text-white/75 hover:-translate-y-0.5 pill-transition"><ArrowLeft size={14} /> Back</Link>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setSaved(!saved)} className="glass-pill rounded-full h-9 px-4 flex items-center gap-2 font-body text-xs text-white/75 hover:-translate-y-0.5 pill-transition"><Heart size={14} className={saved ? 'fill-gold-light text-gold-light' : ''} /> Save</button>
                        <button className="glass-pill rounded-full h-9 px-4 flex items-center gap-2 font-body text-xs text-white/75 hover:-translate-y-0.5 pill-transition"><Share2 size={14} /> Share</button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-8">
                <div className={`reveal reveal-up ${loaded ? 'in-view' : ''} mb-8`}>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-white">{hotel.name}</h1>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">{Array.from({ length: hotel.rating }).map((_, i) => <Star key={i} size={14} className="fill-gold-light text-gold-light" />)}</div>
                                <span className="font-body text-sm text-white/52">{hotel.reviewScore} · {hotel.reviewCount} verified reviews</span>
                                <span className="flex items-center gap-1 text-white/52"><MapPin size={12} /><span className="font-body text-sm">{hotel.location}</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`reveal reveal-up stagger-1 ${loaded ? 'in-view' : ''} flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2`}>
                    {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full h-10 px-5 font-body text-xs uppercase tracking-[0.14em] pill-transition whitespace-nowrap ${activeTab === tab ? 'glass-gold text-[#3A2000] font-medium' : 'glass-pill text-white/75 hover:-translate-y-0.5'}`}>{tab}</button>))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                    <div className="space-y-8">
                        <div ref={descRef} className="reveal reveal-up glass-card glass-specular rounded-[20px] p-6">
                            <h3 className="font-display text-xl text-white font-semibold mb-3">About This Property</h3>
                            <p className="font-body text-sm text-white/75 leading-relaxed">{hotel.description}</p>
                        </div>

                        <div ref={roomsRef} className="reveal reveal-up stagger-1 glass-card glass-specular rounded-[20px] p-6">
                            <h3 className="font-display text-xl text-white font-semibold mb-5">Choose Your Room</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {hotel.rooms.map((room, i) => (
                                    <div key={room.type} onClick={() => setSelectedRoom(i)} className={`rounded-[14px] p-4 cursor-pointer pill-transition hover-lift ${selectedRoom === i ? 'glass-ultra border-gold-base/50 shadow-[0_0_30px_rgba(180,120,40,0.2)]' : 'glass-micro hover:bg-white/[0.05]'}`}>
                                        <h4 className="font-body text-sm font-medium text-white mb-3">{room.type}</h4>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between"><span className="font-body text-xs text-white/52">Size</span><span className="font-body text-xs text-white">{room.size}</span></div>
                                            <div className="flex justify-between"><span className="font-body text-xs text-white/52">View</span><span className="font-body text-xs text-white">{room.view}</span></div>
                                            <div className="flex justify-between"><span className="font-body text-xs text-white/52">Bed</span><span className="font-body text-xs text-white">{room.bed}</span></div>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mb-4">{room.amenities.map((a) => <span key={a} className="glass-micro rounded-full px-2 py-0.5 font-body text-[9px] text-white/52">{a}</span>)}</div>
                                        <div className="pt-3 border-t border-white/10">
                                            <span className="font-mono text-lg text-gold-light">£{room.price.toLocaleString()}</span>
                                            <span className="font-body text-[10px] text-white/35 ml-1">pp</span>
                                        </div>
                                        {selectedRoom === i && (<button className="w-full mt-3 glass-gold rounded-full h-9 font-body text-[10px] font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect">Selected ✓</button>)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div ref={amenRef} className="reveal reveal-up stagger-2 glass-card glass-specular rounded-[20px] p-6">
                            <h3 className="font-display text-xl text-white font-semibold mb-5">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {hotel.amenities.map((amenity) => (
                                    <div key={amenity.name} className="glass-micro rounded-[14px] p-4 flex items-center gap-3 hover:bg-white/[0.05] pill-transition">
                                        <span className="text-2xl">{amenity.icon}</span>
                                        <span className="font-body text-sm text-white/75">{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div ref={reviewsRef} className="reveal reveal-up stagger-3">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-display text-xl text-white font-semibold">Verified Reviews</h3>
                                <div className="flex items-center gap-2">
                                    {['All', 'Solo', 'Couple', 'Family', 'Business'].map((type, i) => (
                                        <button key={type} className={`rounded-full h-8 px-3 font-body text-[10px] uppercase tracking-[0.1em] pill-transition ${i === 0 ? 'glass-gold text-[#3A2000]' : 'glass-pill text-white/75'}`}>{type}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">{hotel.reviews.map((review) => <ReviewCard key={review.id} review={review} />)}</div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-[88px] self-start">
                        <div ref={bookRef} className="reveal reveal-right glass-ultra glass-specular rounded-[20px] p-6 space-y-5">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <div><span className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block">Check-in</span><span className="font-body text-sm text-white">Mar 14, 2025</span></div>
                                    <div className="text-right"><span className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block">Check-out</span><span className="font-body text-sm text-white">Mar 21, 2025</span></div>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div><span className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block">Guests</span><span className="font-body text-sm text-white">2 Adults</span></div>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div>
                                <span className="font-body text-[9px] uppercase tracking-wider text-white/35">From</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-mono text-[28px] text-gold-light" style={{ letterSpacing: '-0.01em' }}>£{hotel.rooms[selectedRoom].price.toLocaleString()}</span>
                                    <span className="font-body text-sm text-white/52">pp</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1"><Check size={12} className="text-green-400" /><span className="font-body text-[11px] text-white/52">incl. all taxes & fees</span></div>
                                <span className="font-body text-xs text-green-400 mt-1 block">Free cancellation before Mar 7</span>
                            </div>
                            <TrustBadges compact />
                            <Link to="/checkout" className="block w-full glass-gold glass-specular rounded-full h-12 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect relative overflow-hidden text-center leading-[48px]">Book Now →</Link>
                            <p className="font-body text-[10px] text-white/35 text-center">You won't be charged yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
