import { Shield, Lock, Star, Award } from 'lucide-react';

const badges = [
    { icon: Lock, label: 'SSL Secured', color: 'text-green-400' },
    { icon: Shield, label: 'ATOL T40281', color: 'text-blue-400' },
    { icon: Award, label: 'PCI DSS', color: 'text-purple-400' },
    { icon: Star, label: '4.9 Trustpilot', color: 'text-gold-light' },
];

export default function TrustBadges({ compact = false }) {
    return (
        <div className={`flex ${compact ? 'gap-2 flex-wrap' : 'gap-3 flex-wrap'}`}>
            {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                    <div
                        key={badge.label}
                        className={`glass-pill rounded-full flex items-center gap-2 border border-gold-base/20 ${compact ? 'h-7 px-3' : 'h-8 px-4'
                            }`}
                    >
                        <Icon size={compact ? 10 : 12} className={badge.color} />
                        <span
                            className={`font-body uppercase tracking-[0.1em] text-white/75 ${compact ? 'text-[8px]' : 'text-[10px]'
                                }`}
                        >
                            {badge.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
