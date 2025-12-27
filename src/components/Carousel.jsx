import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Carousel = ({ children, className }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className={`relative group ${className}`}>
            {/* Scroll Buttons */}
            <button
                onClick={() => scroll('left')}
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 focus:opacity-100"
                aria-label="Scroll left"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={() => scroll('right')}
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 text-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 disabled:opacity-0 focus:opacity-100"
                aria-label="Scroll right"
            >
                <ChevronRight size={24} />
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {React.Children.map(children, (child) => (
                    <div className="w-[85vw] md:w-[450px] lg:w-[500px] snap-start flex-shrink-0 h-full">
                        {child}
                    </div>
                ))}
            </div>

            {/* Scroll Indicator / Hint */}
            <div className="flex justify-center gap-1 mt-2">
                {[...Array(React.Children.count(children))].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                ))}
            </div>
        </div>
    );
};
