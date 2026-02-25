import { useState } from 'react';
import { Heart, Star } from 'lucide-react';

export default function DestinationCard({ destination, isActive, onClick }) {
    const [saved, setSaved] = useState(false);
    const d = destination;

    const tagColors = {
        orange: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
        blue: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
        pink: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
        cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
        green: 'bg-green-500/20 text-green-300 border-green-400/30',
        amber: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    };

    return (
        <div
            onClick={onClick}
            className={`relative w-[180px] h-[260px] rounded-[22px] overflow-hidden cursor-pointer group transition-all duration-350 hover:-translate-y-2 hover:scale-[1.03] ${isActive
                    ? 'opacity-100 border border-gold-base/55 shadow-[0_16px_48px_rgba(180,120,40,0.3)]'
                    : 'opacity-[0.78] border border-transparent'
                }`}
        >
            {/* Photo */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    style={{ backgroundImage: `url(${d.image})` }}
                />
            </div>

            {/* Tag Pill */}
            <div className="absolute top-3 left-3 z-10">
                <span
                    className={`glass-pill font-body text-[10px] px-2.5 py-1 rounded-full border ${tagColors[d.tagColor] || tagColors.blue
                        }`}
                >
                    {d.tag}
                </span>
            </div>

            {/* Bookmark */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setSaved(!saved);
                }}
                className="absolute top-3 right-3 z-10 glass-micro w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <Heart
                    size={14}
                    className={`transition-all duration-300 ${saved ? 'fill-gold-light text-gold-light scale-110' : 'text-white/75'
                        }`}
                />
            </button>

            {/* Bottom Glass Panel */}
            <div
                className={`absolute bottom-0 left-0 right-0 p-3 glass-specular ${isActive
                        ? 'glass-card bg-gold-base/10'
                        : 'glass-card'
                    }`}
                style={{ borderRadius: '0 0 22px 22px' }}
            >
                <div className="relative z-20">
                    <h3 className="font-display text-lg text-white" style={{ fontWeight: 400 }}>
                        {d.location}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: d.stars }).map((_, i) => (
                                <Star key={i} size={10} className="fill-gold-light text-gold-light" />
                            ))}
                            <span className="font-body text-[11px] text-white/52 ml-1">{d.rating}</span>
                        </div>
                        <span className="font-mono text-sm text-gold-light">
                            {d.currency}{d.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
