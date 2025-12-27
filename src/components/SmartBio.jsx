import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { callGemini } from '../utils/gemini';

const SmartBio = () => {
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("Certified Developer (PD2, CPQ, Agentforce) with over 7 years of specialized experience in Apex, Lightning, and the full Salesforce ecosystem. Bridging the gap between complex backend logic and modern frontend frameworks like React and Angular.");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleTailor = async () => {
        if (!role.trim()) return;
        setIsGenerating(true);

        const prompt = `
      Rewrite the following professional summary to specifically target a recruiter hiring for a "${role}" position.
      Original Summary: "${bio}"
      Data to draw from: Salesforce, Node.js, React, API Integration, 25+ projects, PD2, CPQ, and Agentforce Certified.
      
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

            {/* 
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
            */}
        </div>
    );
};

export default SmartBio;
