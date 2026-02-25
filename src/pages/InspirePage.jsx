import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { inspirationCollections, destinations } from '../data/destinations';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const moodFilters = [
    { emoji: '🏖', label: 'Beach' },
    { emoji: '🏙', label: 'City Break' },
    { emoji: '🏔', label: 'Adventure' },
    { emoji: '⛷', label: 'Ski' },
    { emoji: '🏛', label: 'Culture' },
    { emoji: '💑', label: 'Honeymoon' },
];

export default function InspirePage() {
    const [activeMood, setActiveMood] = useState(null);
    const [budget, setBudget] = useState(2000);
    const [departure, setDeparture] = useState('London');
    const [moodRef] = useInView();
    const [editRef] = useInView();
    const [collRef] = useInView();
    const [budgetRef] = useInView();
    const [trendRef] = useInView();

    return (
        <div className="min-h-screen bg-[#0a0f1a] pt-[72px]">
            <div className="relative h-[50vh] min-h-[350px] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center animate-ken-burns" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80)` }} />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-center px-5">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-gold-base" />
                        <span className="font-body text-[10px] uppercase tracking-[0.28em] text-white/52">Discover</span>
                        <div className="w-8 h-px bg-gold-base" />
                    </div>
                    <h1 className="font-display font-semibold text-white hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1 }}>
                        Where Will Your Story <br /><span className="text-gold-light italic">Take You?</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-12">
                <div ref={moodRef} className="reveal reveal-up flex items-center gap-3 justify-center flex-wrap mb-16">
                    {moodFilters.map((mood) => (
                        <button key={mood.label} onClick={() => setActiveMood(activeMood === mood.label ? null : mood.label)}
                            className={`rounded-full h-10 px-5 font-body text-xs uppercase tracking-[0.1em] pill-transition flex items-center gap-2 ${activeMood === mood.label ? 'glass-gold text-[#3A2000] font-medium' : 'glass-pill text-white/75 hover:-translate-y-0.5 hover:text-white'}`}><span>{mood.emoji}</span>{mood.label}</button>
                    ))}
                </div>

                <div ref={editRef} className="reveal reveal-up stagger-1 mb-16">
                    <div className="relative rounded-[28px] overflow-hidden h-[350px] group cursor-pointer">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80)` }} />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                        <div className="absolute inset-0 flex items-center p-10 lg:p-16 z-10">
                            <div className="max-w-lg">
                                <span className="font-body text-[10px] uppercase tracking-[0.28em] text-gold-light mb-3 block">Editor's Pick</span>
                                <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-3 hero-title" style={{ lineHeight: 1.1 }}>Kyoto in Cherry Blossom Season</h3>
                                <p className="font-body text-base text-white/75 mb-6">10 days from £2,150pp · Best: March–April 2025</p>
                                <Link to="/hotel/1" className="glass-gold rounded-full h-11 px-6 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] inline-flex items-center gap-2 hover:-translate-y-0.5 press-effect">Explore This Journey <ArrowRight size={14} /></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={collRef} className="reveal reveal-up mb-16">
                    <h2 className="font-display text-2xl font-semibold text-white mb-8 text-center">Curated <span className="text-gold-light italic">Collections</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {inspirationCollections.map((col) => (
                            <div key={col.id} className="relative rounded-[20px] overflow-hidden h-[240px] group cursor-pointer hover-lift">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${col.image})` }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                    <h4 className="font-display text-xl text-white font-semibold">{col.title}</h4>
                                    <p className="font-body text-sm text-white/60 mt-1">{col.subtitle}</p>
                                    <span className="font-body text-xs text-gold-light/80 mt-2 block">{col.count} destinations</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={budgetRef} className="reveal reveal-up mb-16">
                    <div className="glass-ultra glass-specular rounded-[28px] p-8 lg:p-12">
                        <div className="text-center mb-8">
                            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-2">Where Can I <span className="text-gold-light italic">Go?</span></h2>
                            <p className="font-body text-sm text-white/52">Enter your budget and departure city — we'll show you what's possible</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 max-w-2xl mx-auto">
                            <div>
                                <label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-2">💰 Budget per person</label>
                                <div className="glass-micro rounded-[14px] h-12 px-4 flex items-center">
                                    <span className="font-mono text-sm text-gold-light mr-1">£</span>
                                    <input type="number" value={budget} onChange={(e) => setBudget(parseInt(e.target.value) || 0)} className="bg-transparent font-mono text-sm text-white w-full outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-2">✈ Departure City</label>
                                <div className="glass-micro rounded-[14px] h-12 px-4 flex items-center">
                                    <input type="text" value={departure} onChange={(e) => setDeparture(e.target.value)} className="bg-transparent font-body text-sm text-white w-full outline-none" />
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button className="w-full glass-gold rounded-[14px] h-12 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect">Find Destinations</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {destinations.filter((d) => d.price <= budget).sort((a, b) => a.price - b.price).map((d) => (
                                <Link key={d.id} to="/search" className="block">
                                    <div className="glass-micro rounded-[14px] p-4 flex items-center gap-4 hover:bg-white/[0.05] hover-lift cursor-pointer">
                                        <div className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${d.image})` }} />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-body text-sm text-white font-medium">{d.name}</h4>
                                            <span className="font-body text-xs text-white/52">{d.country}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-mono text-sm text-gold-light">£{d.price.toLocaleString()}</span>
                                            <span className="font-body text-[10px] text-white/35 block">pp</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {destinations.filter((d) => d.price <= budget).length === 0 && (
                            <div className="text-center py-8"><span className="text-3xl block mb-2">😢</span><p className="font-body text-sm text-white/52">Increase your budget to unlock destinations</p></div>
                        )}
                    </div>
                </div>

                <div ref={trendRef} className="reveal reveal-up">
                    <h2 className="font-display text-2xl font-semibold text-white mb-8 text-center">Trending <span className="text-gold-light italic">Right Now</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {destinations.map((d) => (
                            <Link key={d.id} to="/search" className="block">
                                <div className="relative rounded-[16px] overflow-hidden h-[180px] group cursor-pointer hover-lift">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${d.image})` }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                                        <h4 className="font-display text-base text-white font-semibold">{d.name}</h4>
                                        <span className="font-mono text-xs text-gold-light">from £{d.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
