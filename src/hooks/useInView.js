import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that applies CSS animation classes when an element scrolls into view.
 * Uses IntersectionObserver (GPU-friendly, no layout thrashing) instead of
 * Framer Motion's JS-driven spring calculations on the main thread.
 *
 * @param {Object} options
 * @param {string} options.threshold - IntersectionObserver threshold (0-1)
 * @param {string} options.rootMargin - Margin around root
 * @param {boolean} options.once - Only trigger once
 * @returns {[React.RefObject, boolean]} [ref, isInView]
 */
export function useInView({ threshold = 0.15, rootMargin = '-60px', once = true } = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    // Add the in-view class directly for immediate GPU-composited animation
                    el.classList.add('in-view');
                    if (once) observer.unobserve(el);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return [ref, isInView];
}

/**
 * Utility to generate reveal class strings.
 * @param {'up'|'down'|'left'|'right'|'scale'|'fade'} direction
 * @param {number} stagger - stagger index (1-6)
 * @param {boolean} hero - use hero reveal (slower, larger)
 * @returns {string}
 */
export function revealClass(direction = 'up', stagger = 0, hero = false) {
    const base = hero ? 'reveal-hero' : `reveal reveal-${direction}`;
    const delay = stagger > 0 ? ` stagger-${Math.min(stagger, 6)}` : '';
    return `${base}${delay}`;
}
