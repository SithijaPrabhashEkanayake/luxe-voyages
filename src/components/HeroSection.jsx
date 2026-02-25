import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '../data/destinations';
import SearchBar from './SearchBar';
import WeatherPill from './WeatherPill';

const AUTO_CYCLE_MS = 6000;

/* ── Utility: split text into individually animated characters ── */
function SplitText({ text, baseDelay = 0, revealed, className = '' }) {
    return (
        <span className={className} aria-label={text}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`char-reveal ${revealed ? 'revealed' : ''}`}
                    style={{ '--char-d': `${baseDelay + i * 35}ms` }}
                    aria-hidden="true"
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}

/* ── Utility: text line that slides up from masked overflow ── */
function RevealLine({ children, delay = 0, revealed, className = '' }) {
    return (
        <span className="text-reveal-wrap">
            <span
                className={`text-reveal-line ${revealed ? 'revealed' : ''} ${className}`}
                style={{ '--d': `${delay}ms` }}
            >
                {children}
            </span>
        </span>
    );
}

/* ── Utility: stagger words with fade-up entrance ── */
function WordReveal({ text, baseDelay = 0, revealed }) {
    return (
        <>
            {text.split(' ').map((word, i) => (
                <span
                    key={i}
                    className={`word-reveal ${revealed ? 'revealed' : ''}`}
                    style={{ '--d': `${baseDelay + i * 80}ms` }}
                >
                    {word}&nbsp;
                </span>
            ))}
        </>
    );
}

export default function HeroSection() {
    const [active, setActive] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const timerRef = useRef(null);
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const d = destinations[active];

    const goTo = useCallback(
        (idx) => {
            if (transitioning) return;
            setTransitioning(true);
            setRevealed(false);
            setTimeout(() => {
                setActive(idx);
                setTransitioning(false);
                // Re-trigger entrance animation after slide change
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => setRevealed(true));
                });
            }, 500);
        },
        [transitioning]
    );

    // Initial reveal on mount
    useEffect(() => {
        const timer = setTimeout(() => setRevealed(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Auto-cycle
    useEffect(() => {
        timerRef.current = setInterval(
            () => goTo((active + 1) % destinations.length),
            AUTO_CYCLE_MS
        );
        return () => clearInterval(timerRef.current);
    }, [active, goTo]);

    // Scroll-driven parallax: scale up + blur + fade as user scrolls
    useEffect(() => {
        const hero = heroRef.current;
        const content = contentRef.current;
        if (!hero || !content) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = hero.getBoundingClientRect();
                const heroH = hero.offsetHeight;
                // progress: 0 at top, 1 when hero fully scrolled off
                const progress = Math.max(0, Math.min(1, -rect.top / heroH));

                const scale = 1 + progress * 0.15;       // 1 → 1.15
                const blur = progress * 12;               // 0 → 12px
                const opacity = 1 - progress * 0.7;       // 1 → 0.3

                content.style.transform = `scale(${scale})`;
                content.style.filter = `blur(${blur}px)`;
                content.style.opacity = opacity;

                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Bokeh particles
    const bokehParticles = useRef(
        Array.from({ length: 8 }, (_, i) => ({
            id: i,
            size: 3 + Math.random() * 6,
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            delay: `${i * 1.2}s`,
            duration: `${6 + Math.random() * 5}s`,
        }))
    ).current;

    return (
        <section ref={heroRef} className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
            {/* Background Image — Ken Burns */}
            <div
                key={active}
                className="absolute inset-0 bg-cover bg-center animate-ken-burns crossfade-enter"
                style={{ backgroundImage: `url(${d.heroImage || d.image})` }}
            />

            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

            {/* Breathing Radial Glow (Awwwards-style) */}
            <div className="hero-radial-glow" />

            {/* Bokeh Particles */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                {bokehParticles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full bg-white/20 animate-float"
                        style={{
                            width: p.size, height: p.size,
                            left: p.left, top: p.top,
                            animationDelay: p.delay, animationDuration: p.duration,
                        }}
                    />
                ))}
            </div>

            {/* Main Content — Parallax Zoom Layer */}
            <div
                ref={contentRef}
                className="hero-parallax relative z-10 h-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 flex flex-col justify-end pb-28 lg:pb-36"
            >
                {/* Weather Pill */}
                <RevealLine delay={0} revealed={revealed}>
                    <WeatherPill temp={d.weather.temp} condition={d.weather.condition} location={d.location} bestTime={d.weather.bestTime} />
                </RevealLine>

                {/* Eyebrow */}
                <div className="flex items-center gap-3 mt-6">
                    <RevealLine delay={100} revealed={revealed}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-px bg-gold-base" />
                            <span className="font-body text-[10px] uppercase tracking-[0.28em] text-white/52">
                                {d.tag || 'Explore Now'}
                            </span>
                        </div>
                    </RevealLine>
                </div>

                {/* Title — SPLIT CHARACTER REVEAL (Awwwards signature) */}
                <h1
                    className="font-display font-semibold text-white hero-title my-3"
                    style={{ fontSize: 'var(--t-hero)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                >
                    <SplitText
                        text={d.name.toUpperCase()}
                        baseDelay={200}
                        revealed={revealed}
                    />
                </h1>

                {/* Description — WORD-BY-WORD REVEAL */}
                <p className="font-body text-base md:text-lg text-white/75 max-w-xl glass-body-text mb-5">
                    <WordReveal text={d.description} baseDelay={500} revealed={revealed} />
                </p>

                {/* CTAs — SLIDE UP FROM MASK */}
                <div className="flex items-center gap-3 flex-wrap mb-8">
                    <RevealLine delay={800} revealed={revealed}>
                        <Link
                            to="/search"
                            className="glass-gold glass-specular rounded-full h-12 px-8 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect inline-flex items-center gap-2 relative overflow-hidden"
                        >
                            Explore Packages <ArrowRight size={14} />
                        </Link>
                    </RevealLine>
                    <RevealLine delay={900} revealed={revealed}>
                        <Link
                            to="/inspire"
                            className="glass-pill rounded-full h-12 px-8 font-body text-xs font-medium uppercase tracking-[0.14em] text-white/75 hover:-translate-y-0.5 hover:text-white pill-transition inline-flex items-center gap-2"
                        >
                            Get Inspired
                        </Link>
                    </RevealLine>
                </div>

                {/* Stats — STAGGERED LINE REVEAL */}
                <div className="flex items-center gap-6 flex-wrap">
                    {Object.entries(d.stats).map(([key, val], i) => (
                        <RevealLine key={key} delay={1000 + i * 100} revealed={revealed}>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xl text-gold-light" style={{ letterSpacing: '-0.01em' }}>{val}</span>
                                <span className="font-body text-[11px] text-white/52 uppercase tracking-wider">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        </RevealLine>
                    ))}
                </div>

                {/* Search Bar — SLIDE UP */}
                <div className="mt-8">
                    <RevealLine delay={1200} revealed={revealed}>
                        <SearchBar />
                    </RevealLine>
                </div>
            </div>

            {/* Slide Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                <button
                    onClick={() => goTo((active - 1 + destinations.length) % destinations.length)}
                    className="glass-micro rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 pill-transition"
                >
                    <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5 items-center">
                    {destinations.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`rounded-full pill-transition ${i === active ? 'w-6 h-1.5 bg-gold-base' : 'w-1.5 h-1.5 bg-white/28 hover:bg-white/52'
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={() => goTo((active + 1) % destinations.length)}
                    className="glass-micro rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 pill-transition"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Scroll to Explore — Awwwards-style */}
            <div className="absolute bottom-6 right-8 z-10 hidden lg:flex flex-col items-center gap-2">
                <span className="font-body text-[9px] uppercase tracking-[0.2em] text-white/35 [writing-mode:vertical-lr]">
                    Scroll to Explore
                </span>
                <ChevronDown size={14} className="text-white/35 scroll-indicator" />
            </div>
        </section>
    );
}
