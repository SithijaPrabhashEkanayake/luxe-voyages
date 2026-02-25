import { Star, CheckCircle } from 'lucide-react';

export default function ReviewCard({ review }) {
    const r = review;

    return (
        <div className="glass-card glass-specular rounded-[20px] p-6 relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-base/40 to-gold-rich/30 flex items-center justify-center">
                        <span className="font-body text-sm font-medium text-gold-light">
                            {r.name.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-body text-sm text-white font-medium">{r.name}</span>
                            {r.verified && (
                                <span className="flex items-center gap-1 glass-pill rounded-full px-2 py-0.5 border-green-500/30">
                                    <CheckCircle size={10} className="text-green-400" />
                                    <span className="font-body text-[9px] uppercase tracking-wider text-green-400">
                                        Verified
                                    </span>
                                </span>
                            )}
                        </div>
                        <span className="font-body text-xs text-white/52">
                            {r.type} · {r.destination}, {r.date}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={12} className="fill-gold-light text-gold-light" />
                    ))}
                </div>
            </div>

            {/* Review Text */}
            <p className="font-body text-sm text-white/75 leading-relaxed italic mb-4">
                "{r.text}"
            </p>

            {/* Sub-scores */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {Object.entries(r.scores).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                        <span className="font-body text-[11px] text-white/52 capitalize w-16">{key}</span>
                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-gold-base to-gold-light rounded-full"
                                style={{ width: `${(value / 5) * 100}%` }}
                            />
                        </div>
                        <span className="font-mono text-[11px] text-white/52">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
