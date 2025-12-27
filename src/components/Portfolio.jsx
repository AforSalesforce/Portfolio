import React, { useState, useEffect } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Download,
    Code,
    Database,
    Cloud,
    Layers,
    Cpu,
    ArrowUpRight,
    BookOpen,
    Zap,
    Layout,
    Github,
    Linkedin
} from 'lucide-react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';
import { SKILLS_DATA, PROJECTS_DATA, EXPERIENCE_DATA, NOW_DATA } from '../data/constants';
import { BentoGrid, BentoWidget, CaseStudyCard } from './BentoGrid';
import { Carousel } from './Carousel';
import SmartBio from './SmartBio';

const Portfolio = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Social Links Data
    const socialLinks = [
        {
            title: "LinkedIn",
            icon: <Linkedin size={20} className="text-blue-600" />,
            href: "https://www.linkedin.com/in/arabinda-ghosh-a5715314b/",
            description: "Connect on LinkedIn",
            header: (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <Linkedin className="w-40 h-40 text-white/10 absolute -right-10 -bottom-10 rotate-12" />
                    <Linkedin className="w-24 h-24 text-white relative z-10" />
                </div>
            )
        },
        {
            title: "GitHub",
            icon: <Github size={20} className="text-slate-800" />,
            href: "https://github.com/AforSalesforce",
            description: "View Source Code",
            header: (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-800 to-black items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <Github className="w-40 h-40 text-white/10 absolute -right-10 -bottom-10 rotate-12" />
                    <Github className="w-24 h-24 text-white relative z-10" />
                </div>
            )
        },
        {
            title: "Email",
            icon: <Mail size={20} className="text-red-500" />,
            href: "mailto:ghosharabinda919@gmail.com",
            description: "ghosharabinda919@gmail.com",
            header: (
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-red-500 to-orange-600 items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <Mail className="w-40 h-40 text-white/10 absolute -right-10 -bottom-10 rotate-12" />
                    <Mail className="w-24 h-24 text-white relative z-10" />
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4 border-b border-slate-100' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif italic">A</div>
                        <span>Arabinda<span className="text-slate-400">.dev</span></span>
                    </div>

                    <a
                        href="/resume.pdf"
                        download="Arabinda_Ghosh_Resume.pdf"
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Resume</span>
                    </a>
                </div>
            </nav>

            {/* Main Content Wrapper */}
            <main className="pt-32 px-4 sm:px-6">

                {/* 1. HERO SECTION (Bento Style) */}
                <div className="max-w-7xl mx-auto mb-10">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* Left: Intro & Value Prop */}
                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-200">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Open to Work
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                                    I build scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">enterprise ecosystems.</span>
                                </h1>
                                <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                                    Salesforce Supervisor & Architect specializing in high-volume systems that handle millions of daily records. Bridging the gap between <strong>complex business logic</strong> and <strong>technical execution</strong>.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="mailto:ghosharabinda919@gmail.com"
                                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                                >
                                    Book a Strategy Call
                                    <ArrowUpRight size={20} className="text-slate-400" />
                                </a>
                                <button
                                    onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-all flex items-center gap-2"
                                >
                                    View Case Studies
                                </button>
                            </div>
                        </div>

                        {/* Right: Profile Card */}
                        <div className="lg:w-1/3 w-full">
                            <div className="bg-white p-2 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 rotate-2 hover:rotate-0 transition-all duration-300">
                                <div className="aspect-square rounded-[1.5rem] overflow-hidden relative bg-slate-100">
                                    <img src={profileImg} alt="Arabinda Ghosh" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                                        <div className="font-bold text-slate-900">7+ Years Experience</div>
                                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">PD2 • CPQ • Agentforce</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. THE "NOW" & SOCIAL BENTO GRID */}
                <BentoGrid className="mb-20">
                    {/* The "NOW" Card */}
                    <BentoWidget
                        colSpan={2}
                        title="Now"
                        icon={<Zap className="w-5 h-5 text-amber-500" />}
                        description="What I'm focused on this week."
                        className="bg-slate-900 text-white border-none"
                        header={
                            <div className="p-6 h-full flex flex-col justify-center space-y-4">
                                <div className="space-y-1">
                                    <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Current Focus</div>
                                    <div className="text-lg font-semibold text-white">{NOW_DATA.currentFocus}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-slate-500 text-[10px] uppercase font-bold">Learning</div>
                                        <div className="text-sm text-slate-300">{NOW_DATA.learning}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-500 text-[10px] uppercase font-bold">Reading</div>
                                        <div className="text-sm text-slate-300">{NOW_DATA.reading}</div>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    {/* Contact / Social Cards */}
                    {socialLinks.map((link, i) => (
                        <BentoWidget
                            key={i}
                            title={link.title}
                            icon={link.icon}
                            description={link.description}
                            header={link.header}
                            href={link.href}
                            className="bg-white"
                        />
                    ))}
                </BentoGrid>


                {/* 3. CASE STUDIES (THE "MEAT") */}
                <div id="case-studies" className="max-w-7xl mx-auto mb-10 pt-20">
                    <div className="flex items-end justify-between mb-8 px-2">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Proof of Work</h2>
                            <p className="text-slate-500 mt-1">Select deep dives into high-impact implementations.</p>
                        </div>
                    </div>

                    <Carousel>
                        {PROJECTS_DATA.map((project, i) => (
                            <BentoWidget
                                key={i}
                                title={project.title}
                                icon={<Layout className="w-5 h-5 text-indigo-500" />}
                                description=""
                                header={<CaseStudyCard {...project} />}
                                className="bg-slate-50 border-slate-200 h-full min-h-[300px]"
                            />
                        ))}
                    </Carousel>
                </div>


                {/* 4. TECH STACK (Mini Grid) */}
                <div className="max-w-7xl mx-auto mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 px-2">Technical Arsenal</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {SKILLS_DATA.salesforce.map((skill, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 hover:border-indigo-300 transition-colors">
                                <Cloud className="w-5 h-5 text-blue-500" />
                                <span className="font-semibold text-slate-700 text-sm">{skill}</span>
                            </div>
                        ))}
                        {SKILLS_DATA.stack.map((skill, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 hover:border-amber-300 transition-colors">
                                <Code className="w-5 h-5 text-amber-600" />
                                <span className="font-semibold text-slate-700 text-sm">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Simple Footer */}
            <footer className="border-t border-slate-200 py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">© 2025 Arabinda Ghosh. Built with React & AI.</p>
                    <div className="text-slate-400 text-sm">
                        Designed as a Product.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
