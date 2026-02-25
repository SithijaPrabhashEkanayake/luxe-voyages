import HeroSection from '../components/HeroSection';
import TrustBadges from '../components/TrustBadges';
import { inspirationCollections } from '../data/destinations';
import { ArrowRight } from 'lucide-react';
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

function RevealSection({ children, direction = 'up', stagger = 0, hero = false, className = '' }) {
    const [ref] = useInView();
    const base = hero ? 'reveal-hero' : `reveal reveal-${direction}`;
    const delay = stagger > 0 ? `stagger-${Math.min(stagger, 6)}` : '';
    return (
        <div ref={ref} className={`${base} ${delay} ${className}`}>
            {children}
        </div>
    );
}

export default function HomePage() {
    const [inspireRef] = useInView();
    const [moodRef] = useInView();
    const [editorialRef] = useInView();
    const [collectionsRef] = useInView();
    const [trustRef] = useInView();
    const [newsletterRef] = useInView();

    return (
        <div className="min-h-screen bg-[#0a0f1a]">
            <HeroSection />

            <section className="relative py-20 lg:py-28">
                <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
                    <div ref={inspireRef} className="reveal reveal-up text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-8 h-px bg-gold-base" />
                            <span className="font-body text-[10px] uppercase tracking-[0.28em] text-white/52">Discover Your Next Adventure</span>
                            <div className="w-8 h-px bg-gold-base" />
                        </div>
                        <h2 className="font-display font-semibold text-white hero-title" style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1 }}>
                            Where Will Your Story <span className="text-gold-light italic">Take You?</span>
                        </h2>
                    </div>

                    <div ref={moodRef} className="reveal reveal-up stagger-1 flex items-center gap-3 justify-center flex-wrap mb-16">
                        {moodFilters.map((mood, i) => (
                            <button key={mood.label} className={`glass-pill rounded-full h-10 px-5 font-body text-xs uppercase tracking-[0.1em] text-white/75 hover:-translate-y-0.5 hover:text-white pill-transition flex items-center gap-2 ${i === 0 ? 'glass-gold !text-[#3A2000] font-medium' : ''}`}>
                                <span>{mood.emoji}</span>{mood.label}
                            </button>
                        ))}
                    </div>

                    <div ref={editorialRef} className="reveal reveal-up stagger-2 mb-16">
                        <div className="relative rounded-[28px] overflow-hidden h-[400px] group cursor-pointer">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80)` }} />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex items-center p-10 lg:p-16 z-10">
                                <div className="max-w-lg">
                                    <span className="font-body text-[10px] uppercase tracking-[0.28em] text-gold-light mb-3 block">Featured Journey</span>
                                    <h3 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-3 hero-title" style={{ lineHeight: 1.1 }}>Kyoto in Cherry Blossom Season</h3>
                                    <p className="font-body text-base text-white/75 mb-6">10 days from £2,150pp · Best: March–April 2025</p>
                                    <Link to="/hotel/1" className="glass-gold glass-specular rounded-full h-12 px-8 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect inline-flex items-center gap-2 relative overflow-hidden">
                                        Explore This Journey <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={collectionsRef} className="reveal reveal-up">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-display text-2xl font-semibold text-white">Curated Collections</h3>
                            <Link to="/inspire" className="font-body text-xs uppercase tracking-[0.14em] text-gold-light hover:text-gold-base pill-transition">View All →</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {inspirationCollections.slice(0, 3).map((col, i) => (
                                <RevealSection key={col.id} direction="up" stagger={i + 1} className="relative rounded-[20px] overflow-hidden h-[220px] group cursor-pointer">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${col.image})` }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                        <h4 className="font-display text-xl text-white font-semibold">{col.title}</h4>
                                        <p className="font-body text-sm text-white/60 mt-1">{col.subtitle}</p>
                                        <span className="font-body text-xs text-gold-light/80 mt-2 block">{col.count} destinations</span>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-20">
                <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
                    <div ref={trustRef} className="reveal reveal-up glass-ultra glass-specular rounded-[28px] p-10 lg:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-base/5 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-4" style={{ lineHeight: 1.1 }}>
                                Travel With <span className="text-gold-light italic">Confidence</span>
                            </h3>
                            <p className="font-body text-base text-white/60 max-w-2xl mx-auto mb-8">Every booking is ATOL protected, prices include all taxes and fees, and our verified reviews come from real travellers with confirmed stays.</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                                {[{ value: '50K+', label: 'Happy Travellers' }, { value: '4.9', label: 'Trust Rating' }, { value: '850+', label: 'Curated Properties' }, { value: '24/7', label: 'Concierge Support' }].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="font-display text-4xl text-gold-light" style={{ lineHeight: 1 }}>{stat.value}</div>
                                        <div className="font-body text-xs text-white/52 mt-2 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center"><TrustBadges /></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-20">
                <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
                    <div ref={newsletterRef} className="reveal reveal-up text-center">
                        <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-3">Never Miss a <span className="text-gold-light italic">Deal</span></h3>
                        <p className="font-body text-sm text-white/60 mb-6 max-w-md mx-auto">Get exclusive offers, price drop alerts, and curated travel inspiration delivered to your inbox.</p>
                        <div className="flex items-center gap-3 max-w-md mx-auto">
                            <div className="flex-1 glass-ultra rounded-full h-12 px-5 flex items-center">
                                <input type="email" placeholder="Enter your email" className="bg-transparent font-body text-sm text-white w-full outline-none placeholder-white/35" />
                            </div>
                            <button className="glass-gold rounded-full h-12 px-6 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect">Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
