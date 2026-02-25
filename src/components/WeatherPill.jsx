export default function WeatherPill({ weather, location }) {
    if (!weather) return null;

    return (
        <div className="glass-pill glass-specular rounded-full h-9 px-4 flex items-center gap-3 relative">
            <span className="text-base">{weather.condition}</span>
            <span className="font-mono text-base text-white">{weather.temp}°C</span>
            <span className="w-px h-4 bg-white/18" />
            <span className="font-body text-xs text-white/75">{location}</span>
            {weather.bestTime && (
                <>
                    <span className="w-px h-4 bg-white/18" />
                    <span className="glass-gold rounded-full px-2 py-0.5 font-body text-[9px] uppercase tracking-wider text-[#3A2000]">
                        Best time ✓
                    </span>
                </>
            )}
        </div>
    );
}
