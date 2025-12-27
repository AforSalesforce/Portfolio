export const SKILLS_DATA = {
    salesforce: [
        "Apex & Visualforce",
        "Lightning Components (LWC)",
        "Salesforce Architecture",
        "Agentforce",
        "CPQ",
        "OmniStudio"
    ],
    stack: [
        "React.js & Node.js",
        "Python Automation",
        "REST/SOAP Integration",
        "AWS (Lambda/S3)",
        "PostgreSQL",
        "Docker"
    ]
};

export const PROJECTS_DATA = [
    {
        title: "Enterprise Real Estate File System",
        tags: ["System Architecture", "LWC", "Node.js"],
        star: {
            situation: "Client struggled with 50k+ daily records hitting Salesforce limits.",
            task: "Architect a scalable upload system bypassing standard limits.",
            action: "Built a Node.js middleware on Heroku with stream processing and offloaded storage to AWS S3.",
            result: "Processed 1L+ records/hour with 0% timeout rate."
        }
    },
    {
        title: "Booking Platform Sync Engine",
        tags: ["API Integration", "Apex", "Batch Processing"],
        star: {
            situation: "Data inconsistency between booking site and CRM caused $10k/month losses.",
            task: "Design a fault-tolerant bi-directional sync engine.",
            action: "Implemented a self-healing Apex batch framework with custom retry logic and error logging.",
            result: "Achieved 99.9% data accuracy and automated conflict resolution."
        }
    },
    {
        title: "Secure Document Portal",
        tags: ["Security", "JWT", "Salesforce Communities"],
        star: {
            situation: "External partners needed secure access to sensitive legal docs.",
            task: "Create a secure, branded portal with granular permission controls.",
            action: "Developed a custom LWC portal using JWT auth for stateless secure access.",
            result: "Onboarded 500+ partners with zero security incidents in 2 years."
        }
    }
];

export const EXPERIENCE_DATA = [
    {
        role: "Supervisor",
        company: "Caliberbyte Technologies LLP",
        period: "2018 - Present",
        desc: "Leading high-performance teams to deliver complex Salesforce implementations. Specialized in bridging the gap between business logic and technical execution."
    }
];

export const NOW_DATA = {
    currentFocus: "Leading Projects (AGLC, Comvest)",
    learning: "AI Prompting & Tool Building",
    reading: "Salesforce App Architect Cert",
    project: "Homeserve Implementation"
};
