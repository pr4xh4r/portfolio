export interface Project {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'systems';
  description: string;
  longDescription: string;
  metrics: string;
  status: 'LIVE' | 'ACTIVE' | 'SHIPPED';
  tags: string[];
  github: string;
  demo: string;
  year: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level: number;
  tier: 'CORE' | 'ADVANCED' | 'FAMILIAR';
  icon: string;
  detail: string;
}

export interface SkillCategory {
  sector: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  logo?: string;
  isFounder?: boolean;
  highlights: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'pr4xh4r',
    handle: 'pr4xh4r',
    tagline: 'Founder of Build x',
    bio: 'Founder of Build x. Architecting intelligence by building AI-native software and autonomous systems that make hardware think.',
    location: 'India (Remote / Global)',
    status: 'AVAILABLE FOR NEW ROLES',
    github: 'https://github.com/pr4xh4r',
    linkedin: 'https://linkedin.com/in/pr4xh4r',
    twitter: 'https://x.com/pr4xh4r',
    email: 'pr4xh4r@gmail.com',
  },

  telemetry: {
    yearsExp: '4+ Years',
    missionsCompleted: '25+ Projects',
    availability: '99.9% Uptime',
    latency: 'Fast & Lean',
    codeUnitsCrafted: '100K+ Lines',
  },

  skills: [
    {
      sector: '01',
      title: 'Programming Languages',
      description: 'The core languages I use daily to build apps and systems.',
      skills: [
        { name: 'TypeScript / JavaScript', level: 95, tier: 'CORE', icon: '⚡', detail: 'Modern web apps, Node.js, Next.js, and strong type safety' },
        { name: 'Python', level: 90, tier: 'CORE', icon: '🐍', detail: 'Backend APIs, AI workflows, FastAPI, and data scripts' },
        { name: 'Go (Golang)', level: 82, tier: 'ADVANCED', icon: '🚀', detail: 'Fast microservices and lightweight network tools' },
        { name: 'SQL & Databases', level: 88, tier: 'CORE', icon: '💾', detail: 'PostgreSQL, database design, and fast queries' },
        { name: 'Rust', level: 78, tier: 'ADVANCED', icon: '🦀', detail: 'High-performance tools with zero memory bugs' },
        { name: 'C / C++', level: 75, tier: 'FAMILIAR', icon: '⚙️', detail: 'Algorithms, low-level data structures, and computer science' },
      ],
    },
    {
      sector: '02',
      title: 'Frontend & User Experience',
      description: 'Creating smooth, responsive websites that feel great on phone and laptop.',
      skills: [
        { name: 'React & Next.js', level: 96, tier: 'CORE', icon: '⚛️', detail: 'Fast page loads, interactive interfaces, and clean component design' },
        { name: 'Tailwind CSS', level: 95, tier: 'CORE', icon: '🎨', detail: 'Beautiful layouts, dark mode, responsive styling, and custom animations' },
        { name: 'Canvas & 2D/3D Visuals', level: 84, tier: 'ADVANCED', icon: '🌌', detail: 'Interactive animations, starfields, charts, and smooth graphics' },
        { name: 'Mobile Responsiveness', level: 94, tier: 'CORE', icon: '📱', detail: 'Looks perfect on iPhone, Android, tablets, and wide monitors' },
      ],
    },
    {
      sector: '03',
      title: 'Backend & Cloud Services',
      description: 'Solid servers and databases that never crash.',
      skills: [
        { name: 'Node.js & Express', level: 92, tier: 'CORE', icon: '🟢', detail: 'REST APIs, user auth, web sockets, and real-time chat' },
        { name: 'PostgreSQL & Supabase', level: 88, tier: 'CORE', icon: '🐘', detail: 'Reliable relational storage and instant backend integrations' },
        { name: 'Redis Caching', level: 85, tier: 'ADVANCED', icon: '⚡', detail: 'Super-fast memory storage to keep apps snappy' },
        { name: 'Docker & Cloud Hosting', level: 86, tier: 'ADVANCED', icon: '🐳', detail: 'Packaging apps and deploying to Vercel, AWS, and Cloudflare' },
        { name: 'Git & GitHub Actions', level: 90, tier: 'CORE', icon: '🔄', detail: 'Clean code branches and automatic tests on every push' },
      ],
    },
    {
      sector: '04',
      title: 'AI & Smart Tools',
      description: 'Connecting modern AI models to solve real-world tasks.',
      skills: [
        { name: 'LLM & Gemini API', level: 88, tier: 'CORE', icon: '🤖', detail: 'Building AI agents, smart search, and chat assistants' },
        { name: 'Vector Search & Embeddings', level: 84, tier: 'ADVANCED', icon: '🔍', detail: 'Helping AI search through private docs and codebases' },
        { name: 'Prompt Engineering', level: 90, tier: 'CORE', icon: '🧠', detail: 'Getting reliable, structured JSON answers from AI models' },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: 'aethermesh',
      title: 'AetherMesh // Real-Time Event Bus',
      category: 'systems',
      status: 'LIVE',
      year: '2026',
      metrics: '250K messages/sec // < 3ms response',
      description: 'A super fast data streaming system that lets apps talk to each other in milliseconds with zero dropped packets.',
      longDescription: 'Built with Go and WebSockets. Handles thousands of live updates simultaneously with zero drops, cutting server lag by over 60%.',
      tags: ['Go', 'WebSockets', 'Kafka', 'Redis', 'Docker'],
      github: 'https://github.com/pr4xh4r/aethermesh',
      demo: 'https://aethermesh.demo.dev',
      highlights: [
        'Transfers 250,000 real-time events per second across multiple servers.',
        'Cut server response time down to under 3 milliseconds.',
        'Runs reliably with automatic reconnection if a network drop occurs.',
      ],
    },
    {
      id: 'novamind',
      title: 'NovaMind // AI Coding Assistant',
      category: 'ai',
      status: 'SHIPPED',
      year: '2026',
      metrics: '4x faster coding // Automated PR checks',
      description: 'An AI assistant that reads through your codebase, answers questions, and writes clean code fixes directly.',
      longDescription: 'Built with TypeScript and modern LLM APIs. Can read entire repositories, spot security vulnerabilities, and propose GitHub pull requests automatically.',
      tags: ['TypeScript', 'Python', 'Gemini API', 'Vector Search', 'FastAPI'],
      github: 'https://github.com/pr4xh4r/novamind',
      demo: 'https://novamind.demo.dev',
      highlights: [
        'Understands multi-file projects to give accurate answers with source code links.',
        'Reduced AI token usage by 40% using smart prompt optimization.',
        'Includes an automated test runner before submitting any changes.',
      ],
    },
    {
      id: 'chronosdb',
      title: 'ChronosDB // Lightweight Time-Series DB',
      category: 'systems',
      status: 'ACTIVE',
      year: '2025',
      metrics: '10x data compression // Zero crashes',
      description: 'A tiny, lightning-fast database built for storing live sensor readings and time-stamped numbers.',
      longDescription: 'Written in Rust with zero external dependencies. Compresses data by 10x so you can store millions of data points using almost no memory.',
      tags: ['Rust', 'Database', 'Systems', 'Compression', 'CLI'],
      github: 'https://github.com/pr4xh4r/chronosdb',
      demo: 'https://chronosdb.demo.dev',
      highlights: [
        '10x smaller file sizes thanks to smart delta-number compression.',
        'Safe against sudden power cuts with append-only write logs.',
        'Simple Python and C connections ready out of the box.',
      ],
    },
    {
      id: 'cosmograph',
      title: 'CosmoGraph // 3D Galaxy Map in Browser',
      category: 'web',
      status: 'LIVE',
      year: '2025',
      metrics: 'Smooth 60 FPS // 50,000 stars',
      description: 'An interactive 3D universe visualizer that lets you fly between 50,000 stars directly in your browser.',
      longDescription: 'Built with React and WebGL. Renders thousands of glowing stars smoothly even on smartphones with touch zoom and pan controls.',
      tags: ['React', 'Three.js', 'WebGL', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/pr4xh4r/cosmograph',
      demo: 'https://cosmograph.demo.dev',
      highlights: [
        'Smooth 60 FPS animation on desktop and mobile devices.',
        'Custom pixel graphics style inspired by classic sci-fi games.',
        'Lightweight download that loads in under 1 second.',
      ],
    },
    {
      id: 'quantumshield',
      title: 'QuantumShield // API Security Gateway',
      category: 'systems',
      status: 'ACTIVE',
      year: '2025',
      metrics: 'Under 1ms overhead // Blocks spam & bots',
      description: 'A fast security layer that guards web apps from spam, bad bots, and DDoS overload before reaching servers.',
      longDescription: 'Placed in front of backend servers to check authentication tokens and block suspicious traffic before it can slow down your app.',
      tags: ['Go', 'Redis', 'Security', 'Reverse Proxy', 'Docker'],
      github: 'https://github.com/pr4xh4r/quantumshield',
      demo: 'https://quantumshield.demo.dev',
      highlights: [
        'Handles 40,000 checks per second with barely 1ms delay.',
        'Automatic rate-limiter prevents brute-force login attempts.',
        'Clean dashboard shows blocked traffic in real time.',
      ],
    },
    {
      id: 'nebulaforge',
      title: 'NebulaForge // Instant Cloud Functions',
      category: 'web',
      status: 'SHIPPED',
      year: '2024',
      metrics: 'Under 50ms startup // Instant deploys',
      description: 'A cloud tool where developers write simple code snippets in the browser and get instant live URLs.',
      longDescription: 'Full-stack platform with in-browser code editor, instant test execution, and live streaming console logs.',
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'WebSockets'],
      github: 'https://github.com/pr4xh4r/nebulaforge',
      demo: 'https://nebulaforge.demo.dev',
      highlights: [
        'Type your code in the browser and get a working API URL in seconds.',
        'Live streaming terminal logs so you can see errors right away.',
        'Automatic rollback if your latest code has syntax bugs.',
      ],
    },
  ] as Project[],

  hardware: [
    {
      id: 'hw-01',
      title: 'Physical AI Cyberdeck',
      category: 'Hardware & Edge AI',
      description: 'A custom portable terminal terminal built with mechanical keyboard, ultra-wide display, and edge AI coprocessor for local inference.',
      tags: ['Raspberry Pi 5', 'Mechanical Keypad', 'OLED', 'Python', 'Local LLM'],
      image: '/photos/a.jpg',
      logUrl: 'https://github.com/pr4xh4r',
    },
    {
      id: 'hw-02',
      title: 'Sound-Reactive LED Controller',
      category: 'Wearables & Microcontrollers',
      description: 'A wearable real-time audio FFT analyzer and WS2812B addressable LED driver pulsing to live music frequencies.',
      tags: ['ESP32', 'WS2812B', 'C++', 'FFT Audio', 'I2S Mic'],
      image: '/photos/b.jpg',
      logUrl: 'https://github.com/pr4xh4r',
    },
    {
      id: 'hw-03',
      title: 'Autonomous Rover Node',
      category: 'Robotics & Embedded',
      description: 'A differential drive mobile platform with ultrasonic navigation and camera stream for environmental mapping.',
      tags: ['Arduino', 'Motor Drivers', 'OpenCV', 'Sensors'],
      image: '/photos/c.jpg',
      logUrl: 'https://github.com/pr4xh4r',
    },
  ],

  experience: [
    {
      id: 'exp-buildx',
      period: '2024 - Present',
      role: 'Founder & Systems Architect',
      organization: 'Build X',
      location: 'Remote / Global',
      logo: '/buildx_logo_blue.png',
      isFounder: true,
      technologies: ['Autonomous AI', 'TypeScript', 'Go', 'Python', 'Edge Hardware', 'Distributed Systems'],
      highlights: [
        'Founded Build X to architect intelligence through AI-native software and autonomous embedded systems.',
        'Engineered high-throughput real-time pipelines and agentic reasoning loops that bridge software with edge hardware.',
        'Architected and shipped production-grade distributed architectures with low latency and high reliability.',
      ],
    },
    {
      id: 'exp-01',
      period: '2024 - Present',
      role: 'Full-Stack & Systems Developer',
      organization: 'Tech Labs & Independent Builder',
      location: 'Remote',
      technologies: ['TypeScript', 'Go', 'React', 'Next.js', 'Node.js', 'Docker'],
      highlights: [
        'Built and deployed high-performance web applications used by thousands of active users.',
        'Sped up backend API endpoints, cutting load times from 2 seconds down to under 200ms.',
        'Worked directly with founders and teams to turn ideas into working products quickly.',
      ],
    },
    {
      id: 'exp-02',
      period: '2022 - 2024',
      role: 'Software Engineer',
      organization: 'Web & Cloud Solutions',
      location: 'Hybrid',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Git'],
      highlights: [
        'Built full user interfaces and dashboards from Figma designs with pixel-perfect accuracy.',
        'Wrote clean database queries and APIs that kept servers fast during high traffic peaks.',
        'Helped junior developers review code and set up automated testing pipelines.',
      ],
    },
    {
      id: 'exp-03',
      period: '2021 - 2022',
      role: 'Junior Web Developer',
      organization: 'Digital Studio',
      location: 'On-site',
      technologies: ['JavaScript', 'HTML/CSS', 'Python', 'REST APIs'],
      highlights: [
        'Created responsive web pages that loaded fast and looked sharp across all device screens.',
        'Integrated third-party payment gateways, auth systems, and email notifications.',
        'Wrote clean documentation so the rest of the team could easily maintain the codebase.',
      ],
    },
  ] as ExperienceItem[],

  terminalCommands: {
    help: 'Available commands:\n  • about        - Learn about me in plain English\n  • buildx       - Dossier on Build X venture lab\n  • skills       - See the technologies I work with\n  • projects     - View my favorite projects\n  • experience   - Check out where I have worked\n  • contact      - Get my email and socials\n  • warp [sec]   - Jump to section (projects, skills, contact)\n  • clear        - Clear the screen',
    about: "PR4XH4R // FULL-STACK DEVELOPER & BUILDER\nI build clean websites, smart AI tools, and fast backends.\nMy goal is simple: write reliable code that works well and makes users happy.",
    buildx: 'BUILD X // AUTONOMOUS SYSTEMS & AI-NATIVE SOFTWARE\nFounder:     pr4xh4r\nStatus:      ACTIVE // IN OPERATION\nMission:     Architecting intelligence by building AI-native software\n             and autonomous systems that make hardware think.\nCore Stack:  Autonomous Agents, Edge Microcontrollers, Low-Latency Streaming',
    skills: 'TECH STACK:\n• Languages: TypeScript, JavaScript, Python, Go, SQL, Rust\n• Frontend:  React, Next.js, Tailwind CSS, Canvas\n• Backend:   Node.js, PostgreSQL, Redis, Docker\n• AI:        Gemini API, Vector Search, Smart Agents',
    contact: 'CONTACT INFO:\n• Email:    pr4xh4r@gmail.com\n• GitHub:   https://github.com/pr4xh4r\n• LinkedIn: https://linkedin.com/in/pr4xh4r\n• Status:   Open for internships, full-time roles & projects!',
    sudoHire: 'CLEARANCE GRANTED! 🎉\npr4xh4r is ready to build with you.\nDrop an email at: pr4xh4r@gmail.com',
  },
};
