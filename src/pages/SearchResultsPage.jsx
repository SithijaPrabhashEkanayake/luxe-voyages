import { useState, useEffect, useRef } from 'react';
import { Star, Heart, MapPin, Filter, Map } from 'lucide-react';
import { searchResults } from '../data/destinations';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const filterSections = [
    { title: '☆ Star Rating', options: ['★★★★★ (5 Star)', '★★★★ (4 Star)', '★★★ (3 Star)'] },
    { title: '🏨 Property Type', options: ['Hotel', 'Villa', 'Resort', 'Boutique', 'Hostel'] },
    { title: '✈ Board Basis', options: ['All Inclusive', 'Half Board', 'Breakfast', 'Room Only'] },
];
const sortOptions = ['Best Value', 'Cheapest', 'Highest Rated', 'Duration'];

export default function SearchResultsPage() {
    const [activeSort, setActiveSort] = useState('Best Value');
    const [savedItems, setSavedItems] = useState({});
    const [priceRange, setPriceRange] = useState([400, 3000]);
    const [showFilters, setShowFilters] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [sidebarRef] = useInView();

    useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

    const toggleSave = (id) => setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="min-h-screen bg-[#0a0f1a] pt-[72px]">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80)`, filter: 'blur(32px)' }} />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-8">
                <div className={`reveal reveal-down ${loaded ? 'in-view' : ''} glass-ultra glass-specular rounded-[20px] p-5 mb-6`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-display text-2xl text-white font-semibold">Bali, Indonesia</h1>
                            <p className="font-body text-sm text-white/52 mt-1">Mar 14 – Mar 21, 2025 · 2 Adults · {searchResults.length} properties found</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowFilters(!showFilters)} className="glass-pill rounded-full h-10 px-5 flex items-center gap-2 font-body text-xs uppercase tracking-[0.14em] text-white/75 hover:-translate-y-0.5 pill-transition lg:hidden">
                                <Filter size={14} /> Filters
                            </button>
                            <button className="glass-pill rounded-full h-10 px-5 flex items-center gap-2 font-body text-xs uppercase tracking-[0.14em] text-white/75 hover:-translate-y-0.5 pill-transition">
                                <Map size={14} /> Map View
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`reveal reveal-up stagger-1 ${loaded ? 'in-view' : ''} flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2`}>
                    <span className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 mr-2 whitespace-nowrap">Sort by:</span>
                    {sortOptions.map((opt) => (
                        <button key={opt} onClick={() => setActiveSort(opt)}
                            className={`rounded-full h-9 px-4 font-body text-xs uppercase tracking-[0.1em] pill-transition whitespace-nowrap ${activeSort === opt ? 'glass-gold text-[#3A2000] font-medium' : 'glass-pill text-white/75 hover:-translate-y-0.5'}`}
                        >{opt}</button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                    <aside ref={sidebarRef} className={`${showFilters ? 'block' : 'hidden lg:block'} reveal reveal-left space-y-6`}>
                        <div className="glass-ultra glass-specular rounded-[20px] p-5 sticky top-[88px]">
                            <h3 className="font-body text-sm font-medium text-white mb-5">Filters</h3>
                            <div className="mb-6">
                                <h4 className="font-body text-xs uppercase tracking-[0.12em] text-white/52 mb-3">£ Price Range</h4>
                                <input type="range" min="200" max="5000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full accent-gold-base" />
                                <div className="flex justify-between mt-2">
                                    <span className="font-mono text-xs text-white/52">£{priceRange[0]}</span>
                                    <span className="font-mono text-xs text-white/52">£{priceRange[1]}</span>
                                </div>
                            </div>
                            {filterSections.map((section) => (
                                <div key={section.title} className="mb-6">
                                    <h4 className="font-body text-xs uppercase tracking-[0.12em] text-white/52 mb-3">{section.title}</h4>
                                    <div className="space-y-2">
                                        {section.options.map((opt) => (
                                            <label key={opt} className="flex items-center gap-3 font-body text-sm text-white/75 cursor-pointer hover:text-white pill-transition group">
                                                <div className="w-4 h-4 rounded border border-white/28 group-hover:border-gold-base/60 pill-transition flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-sm bg-gold-base scale-0 group-hover:scale-100 pill-transition" />
                                                </div>
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button className="w-full glass-gold rounded-full h-10 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect">Apply Filters</button>
                        </div>
                    </aside>

                    <div className="space-y-5">
                        {searchResults.map((hotel, i) => (
                            <HotelResultCard key={hotel.id} hotel={hotel} index={i} saved={savedItems[hotel.id]} onToggleSave={() => toggleSave(hotel.id)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function HotelResultCard({ hotel, index, saved, onToggleSave }) {
    const [ref] = useInView();
    return (
        <div ref={ref} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
            <Link to={`/hotel/${hotel.id}`} className="block">
                <div className="glass-card glass-specular rounded-[20px] overflow-hidden group hover-lift cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_200px]">
                        <div className="relative h-[200px] md:h-full overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${hotel.image})` }} />
                            <button onClick={(e) => { e.preventDefault(); onToggleSave(); }}
                                className="absolute top-3 right-3 glass-micro w-[34px] h-[34px] rounded-full flex items-center justify-center z-10 hover:scale-110 pill-transition">
                                <Heart size={14} className={`pill-transition ${saved ? 'fill-gold-light text-gold-light' : 'text-white/75'}`} />
                            </button>
                            <div className="absolute top-3 left-3 glass-pill rounded-full px-2.5 py-1 font-body text-[10px] text-white/75">{hotel.type}</div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-display text-xl text-white font-semibold mb-1">{hotel.name}</h3>
                            <div className="flex items-center gap-2 mb-3"><MapPin size={12} className="text-white/52" /><span className="font-body text-xs text-white/52">{hotel.location}</span></div>
                            <div className="flex items-center gap-2 mb-3">
                                {Array.from({ length: hotel.stars }).map((_, j) => <Star key={j} size={12} className="fill-gold-light text-gold-light" />)}
                                <span className="font-body text-xs text-white/52 ml-1">{hotel.rating} ({hotel.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="glass-micro rounded-full px-3 py-1 font-body text-[10px] text-white/60 uppercase tracking-wider">{hotel.board}</span>
                                {hotel.cancellation.includes('Free') && <span className="text-green-400 font-body text-xs">✓ {hotel.cancellation}</span>}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col items-end justify-center border-t md:border-t-0 md:border-l border-white/10">
                            <span className="font-body text-[9px] uppercase tracking-wider text-white/35">From</span>
                            <span className="font-mono text-[22px] text-gold-light" style={{ letterSpacing: '-0.01em' }}>£{hotel.price.toLocaleString()}</span>
                            <span className="font-body text-[11px] text-white/52">per person · incl. taxes ✓</span>
                            <button className="mt-3 glass-gold rounded-full h-9 px-5 font-body text-[10px] font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect">View Deal →</button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
