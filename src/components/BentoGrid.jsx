import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import { ExternalLink, Star, ArrowRight } from 'lucide-react';

export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={clsx(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoWidget = ({
    className,
    title,
    description,
    header,
    icon,
    href,
    colSpan = 1
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Determine the component to render: 'a' for links, 'motion.div' for others
    const Component = href ? motion.a : motion.div;
    const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <Component
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={clsx(
                "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-black dark:border-white/[0.2] bg-white border border-slate-100 border-transparent justify-between flex flex-col space-y-4 hover:border-slate-200",
                colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
                colSpan === 3 ? "md:col-span-3" : "",
                className
            )}
            {...props}
        >
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
                {/* Gradient background for visual interest if no header */}
                {!header && <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-50 -z-10" />}
                {header}
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-200 relative">
                <div className="flex items-center gap-2 mb-2 font-sans font-bold text-slate-700 dark:text-slate-200">
                    {icon}
                    {title}
                </div>
                <div className="font-sans font-normal text-slate-600 text-xs dark:text-slate-300">
                    {description}
                </div>
                {href && (
                    <div className="absolute right-0 top-0 opacity-0 group-hover/bento:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                )}
            </div>
        </Component>
    );
};

export const CaseStudyCard = ({ title, star, tags }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="space-y-4">
                {/* Result Highlighting - The "Proof" */}
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-green-600 mt-1 shrink-0 fill-current" />
                        <p className="text-sm font-semibold text-green-800 leading-snug">
                            {star.result}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Problem & Solution</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-medium text-slate-900">Situation:</span> {star.situation}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-medium text-slate-900">Action:</span> {star.action}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                {tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};
