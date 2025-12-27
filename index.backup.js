import React, { useState, useEffect, useRef } from 'react';
import {
    Github,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Download,
    ExternalLink,
    Code,
    Database,
    Cloud,
    Terminal,
    Cpu,
    Layers,
    ChevronDown,
    ChevronUp,
    Briefcase,
    GraduationCap,
    MessageSquare,
    X,
    Send,
    Sparkles,
    Loader2,
    Bot
} from 'lucide-react';

// --- Gemini API Helper ---
const callGemini = async (prompt, systemInstruction = "") => {
    const apiKey = ""; // Injected at runtime
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Sorry, I'm having trouble connecting to the AI service right now.";
    }
};

// --- Data Constants ---
const SKILLS_DATA = {
    salesforce: [
        "Apex & Visualforce",
        "Lightning Components (LWC/Aura)",
        "SOQL & SOSL",
        "Workflow & Triggers",
        "Community Cloud",
        "Salesforce Architecture",
        "Complex Data Models",
        "Heroku"
    ],
    web: [
        "React JS",
        "AngularJS",
        "Node.js",
        "JavaScript",
        "Python",
        "REST & SOAP APIs",
        "HTML/CSS"
    ],
    core: [
        "Performance Optimization",
        "Problem Solving",
        "Clean Code Practices",
        "Scalability",
        "System Integration",
        "Agile/Scrum"
    ]
};

const PROJECTS_DATA = [
    {
        title: "Real Estate Implementation",
        tech: ["Salesforce", "Heroku", "Node.js", "Smarty Street API"],
        details: [
            "Built a multi-format file upload system with custom metadata validation.",
            "Integrated Smarty Street API for real-time address verification.",
            "Engineered a Node.js migration script to handle 1L+ records, bypassing the 50k query limit using JSForce.",
            "Developed custom Lightning components for business logic automation."
        ]
    },
    {
        title: "Booking Site Sync API",
        tech: ["REST API", "Apex Batch", "Scheduled Jobs"],
        details: [
            "Designed a custom REST API iterator to handle pagination for large datasets.",
            "Implemented Scheduled Apex Batch classes to sync data seamlessly.",
            "Created duplication logic to ensure clean data merging between platforms."
        ]
    },
    {
        title: "Google Drive Integration",
        tech: ["Lightning Component", "JWT Auth", "REST API"],
        details: [
            "Created a Lightning component acting as a Google File Picker.",
            "Enabled upload, share, update, and delete functionality directly from Salesforce.",
            "Implemented secure JWT authentication for API communication."
        ]
    },
    {
        title: "NetDocs Integration",
        tech: ["Heroku", "Lightning Out", "Node.js", "Express"],
        details: [
            "Built an intermediate Express API on Heroku to handle large attachment queries.",
            "Utilized Lightning Out to embed components in Salesforce Classic.",
            "Features included PDF unlocking and bulk upload capabilities."
        ]
    },
    {
        title: "Twilio Service Integration",
        tech: ["Twilio API", "Streaming API", "Platform Events"],
        details: [
            "Integrated softphone capabilities for community users.",
            "Used Platform Events and Streaming API for real-time call status updates.",
            "Built custom controls for Call Hold and Retrieve functionality."
        ]
    },
    {
        title: "Advanced Search & Filters",
        tech: ["SearchJS", "Lightning Datatable", "Client-side Logic"],
        details: [
            "Developed a client-side search/filter engine using SearchJS.",
            "Created dynamic record creation forms that add rows instantly to tables.",
            "Implemented parent-child record views to improve user workflow efficiency."
        ]
    }
];

const EXPERIENCE_DATA = [
    {
        role: "Senior Salesforce Developer",
        company: "Caliberbyte Technologies LLP",
        period: "Aug 2018 - Present",
        desc: "Spearheaded development for 25+ projects involving complex Salesforce implementations. Focused on scalable architecture, API integrations, and custom component development using Lightning and modern web frameworks."
    }
];

// --- Chat Widget Component ---
const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hi! I'm Arabinda's AI assistant. Ask me anything about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        const systemPrompt = `
      You are an AI assistant for Arabinda Ghosh's portfolio website. 
      Here is his resume data:
      SKILLS: ${JSON.stringify(SKILLS_DATA)}
      PROJECTS: ${JSON.stringify(PROJECTS_DATA)}
      EXPERIENCE: ${JSON.stringify(EXPERIENCE_DATA)}
      CONTACT: ghosharabinda919@gmail.com, +91 79080 57763, West Bengal, India.
      
      Your goal is to answer visitor questions professionally and concisely as if you are his agent.
      Highlight his strengths in Salesforce, Apex, and Full Stack development.
      If asked a question you don't have data for, simply state you don't know but suggest contacting him directly.
      Keep answers under 3 sentences unless asked for details.
    `;

        const reply = await callGemini(userMessage, systemPrompt);

        setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Chat Header */}
                    <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={20} className="text-blue-400" />
                            <span className="font-semibold">Portfolio Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 min-h-[300px]">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start mb-3">
                                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin text-blue-600" />
                                    <span className="text-xs text-slate-500">Typing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-slate-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about my skills..."
                                className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
                {isOpen ? <ChevronDown size={28} /> : <MessageSquare size={28} />}
            </button>
        </div>
    );
};

// --- Smart Bio Component ---
const SmartBio = () => {
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("Certified Developer (PD1) with over 2 years of specialized experience in Apex, Lightning, and the full Salesforce ecosystem. Bridging the gap between complex backend logic and modern frontend frameworks like React and Angular.");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleTailor = async () => {
        if (!role.trim()) return;
        setIsGenerating(true);

        const prompt = `
      Rewrite the following professional summary to specifically target a recruiter hiring for a "${role}" position.
      Original Summary: "${bio}"
      Data to draw from: Salesforce, Node.js, React, API Integration, 25+ projects, PD1 Certified.
      
      Keep it professional, impactful, and under 50 words. Do not use hashtags.
    `;

        const newBio = await callGemini(prompt);
        setBio(newBio);
        setIsGenerating(false);
    };

    return (
        <div className="mb-10 max-w-2xl">
            <p className="text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed transition-all duration-500 min-h-[100px]">
                {bio}
            </p>

            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex flex-col md:flex-row gap-3 items-center backdrop-blur-sm">
                <div className="flex items-center gap-2 text-blue-800 text-sm font-medium whitespace-nowrap">
                    <Sparkles size={16} />
                    <span>Tailor my bio for:</span>
                </div>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Technical Lead, Frontend Dev..."
                    className="flex-1 w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                />
                <button
                    onClick={handleTailor}
                    disabled={isGenerating || !role}
                    className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isGenerating ? <Loader2 size={14} className="animate-spin" /> : "✨ Magic Rewrite"}
                </button>
            </div>
        </div>
    );
};


// --- Main Portfolio Component ---
const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('about');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const projectIconMap = {
        briefcase: <Briefcase className="w-6 h-6 text-blue-500" />,
        database: <Database className="w-6 h-6 text-green-500" />,
        cloud: <Cloud className="w-6 h-6 text-yellow-500" />,
        layers: <Layers className="w-6 h-6 text-indigo-500" />,
        phone: <Phone className="w-6 h-6 text-red-500" />,
        code: <Code className="w-6 h-6 text-purple-500" />
    };

    // Helper to map icons since we moved data outside component
    const getIconForProject = (index) => {
        const icons = ['briefcase', 'database', 'cloud', 'layers', 'phone', 'code'];
        return projectIconMap[icons[index] || 'code'];
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">

            {/* Navigation */}
            <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="text-2xl font-bold text-slate-900 tracking-tight">
                        AG<span className="text-blue-600">.</span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wider"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                        <Download size={16} />
                        <span>Resume</span>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="about" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50 skew-x-12 opacity-50 -z-10 pointer-events-none"></div>

                <div className="container mx-auto">
                    <div className="max-w-4xl">
                        <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
                            Senior Salesforce Developer
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Arabinda Ghosh
                        </h1>

                        {/* Replaced static paragraph with SmartBio component */}
                        <SmartBio />

                        <div className="flex flex-wrap gap-4 mb-12">
                            <a href="mailto:ghosharabinda919@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                <Mail size={18} />
                                Contact Me
                            </a>
                            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
                                <MapPin size={18} />
                                West Bengal, India
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
                                <Phone size={18} />
                                +91 79080 57763
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200 pt-8">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">25+</h3>
                                <p className="text-sm text-slate-500 uppercase tracking-wide">Projects Completed</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">PD1</h3>
                                <p className="text-sm text-slate-500 uppercase tracking-wide">Certified</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">2.4+</h3>
                                <p className="text-sm text-slate-500 uppercase tracking-wide">Years Exp.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Arsenal</h2>
                        <div className="w-20 h-1 bg-blue-600"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Salesforce Column */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow group">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <Cloud size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Salesforce Ecosystem</h3>
                            <ul className="space-y-3">
                                {SKILLS_DATA.salesforce.map((skill, i) => (
                                    <li key={i} className="flex items-center text-slate-600">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Web Tech Column */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow group">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                                <Terminal size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Web Technologies</h3>
                            <ul className="space-y-3">
                                {SKILLS_DATA.web.map((skill, i) => (
                                    <li key={i} className="flex items-center text-slate-600">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Core Skills Column */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow group">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Core Competencies</h3>
                            <ul className="space-y-3">
                                {SKILLS_DATA.core.map((skill, i) => (
                                    <li key={i} className="flex items-center text-slate-600">
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="mb-16 flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Selected Projects</h2>
                            <div className="w-20 h-1 bg-blue-600"></div>
                        </div>
                        <div className="hidden md:block text-slate-500">
                            Showcasing complex integration & logic
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS_DATA.map((project, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                        {getIconForProject(index)}
                                    </div>
                                    <ExternalLink size={18} className="text-slate-400 hover:text-blue-600 cursor-pointer" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <ul className="space-y-2">
                                    {project.details.map((detail, i) => (
                                        <li key={i} className="text-sm text-slate-600 flex items-start">
                                            <span className="text-blue-400 mr-2 mt-1 min-w-[10px]">•</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience & Education */}
            <section id="experience" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16">

                        {/* Experience */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Briefcase className="text-blue-600" />
                                <h2 className="text-2xl font-bold text-slate-900">Experience</h2>
                            </div>

                            <div className="border-l-2 border-slate-200 pl-8 relative space-y-12">
                                {EXPERIENCE_DATA.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[39px] top-0 w-5 h-5 rounded-full border-4 border-white bg-blue-600"></div>
                                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                        <p className="text-slate-500 mb-2 font-medium">{exp.company}</p>
                                        <p className="text-sm text-slate-400 mb-4">{exp.period}</p>
                                        <p className="text-slate-600 leading-relaxed">
                                            {exp.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <GraduationCap className="text-blue-600" />
                                <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                            </div>

                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">B.Tech in Computer Science</h3>
                                <p className="text-slate-600">Govt. College of Engg. And Textile Technology</p>
                                <p className="text-slate-500 text-sm mt-1">Berhampore, West Bengal</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-4 text-slate-200 font-medium text-lg">Arabinda Ghosh</p>
                    <div className="flex justify-center gap-6 mb-8">
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="mailto:ghosharabinda919@gmail.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
                    </div>
                    <p className="text-sm">© {new Date().getFullYear()} All rights reserved. Powered by React & Gemini AI.</p>
                </div>
            </footer>

            {/* Chat Widget Overlay */}
            <ChatWidget />
        </div>
    );
};

export default Portfolio;