import type { Project } from '../store/useAppStore';

export const personalInfo = {
  name: 'Bhavya Jain',
  title: 'Software Engineer',
  subtitle: 'AI Enthusiast | Problem Solver',
  tagline: 'Building the future, one line of code at a time',
  email: 'bhavya.jain@email.com',
  linkedin: 'https://linkedin.com/in/bhavyajain',
  github: 'https://github.com/bhavyajain',
  resume: '/resume.pdf',
  location: 'India',
  bio: 'Passionate software engineer with expertise in full-stack development, AI/ML, and building scalable systems. I love turning complex problems into elegant solutions.',
};

export const skills = [
  { name: 'React', level: 95, color: '#61DAFB', category: 'Frontend' },
  { name: 'TypeScript', level: 92, color: '#3178C6', category: 'Languages' },
  { name: 'Node.js', level: 90, color: '#339933', category: 'Backend' },
  { name: 'Python', level: 88, color: '#3776AB', category: 'Languages' },
  { name: 'AI/ML', level: 85, color: '#FF6F00', category: 'AI' },
  { name: 'Next.js', level: 88, color: '#000000', category: 'Frontend' },
  { name: 'PostgreSQL', level: 82, color: '#4169E1', category: 'Database' },
  { name: 'MongoDB', level: 80, color: '#47A248', category: 'Database' },
  { name: 'Docker', level: 78, color: '#2496ED', category: 'DevOps' },
  { name: 'AWS', level: 75, color: '#FF9900', category: 'Cloud' },
  { name: 'GraphQL', level: 82, color: '#E10098', category: 'API' },
  { name: 'Three.js', level: 70, color: '#049EF4', category: '3D' },
];

export const projects: Project[] = [
  {
    id: 'ai-assistant',
    name: 'Neural Companion',
    description: 'AI-powered conversational assistant with context awareness',
    longDescription: 'A sophisticated AI assistant that leverages large language models to provide intelligent, context-aware conversations. Features advanced memory management, multi-turn dialogue support, and seamless integration with various data sources.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'PostgreSQL', 'Redis'],
    features: [
      'Context-aware responses with conversation memory',
      'Multi-modal input support (text, voice, images)',
      'Real-time streaming responses',
      'Custom fine-tuned models for specific domains',
    ],
    challenges: [
      'Managing context window efficiently for long conversations',
      'Implementing real-time streaming with low latency',
      'Fine-tuning models for domain-specific accuracy',
    ],
    results: [
      '95% user satisfaction rate',
      'Average response time under 500ms',
      'Deployed to 10,000+ active users',
    ],
    github: 'https://github.com/bhavyajain/neural-companion',
    live: 'https://neural-companion.demo.com',
    color: '#FF6F00',
  },
  {
    id: 'smart-analytics',
    name: 'Insight Engine',
    description: 'Real-time data analytics dashboard with predictive insights',
    longDescription: 'An enterprise-grade analytics platform that processes millions of data points in real-time, providing actionable insights through beautiful visualizations and predictive modeling.',
    technologies: ['React', 'D3.js', 'Apache Kafka', 'ClickHouse', 'Node.js', 'TensorFlow'],
    features: [
      'Real-time data processing at scale',
      'Interactive 3D data visualizations',
      'AI-powered anomaly detection',
      'Custom alerting and notification system',
    ],
    challenges: [
      'Optimizing queries for billion-row datasets',
      'Building responsive real-time charts',
      'Implementing accurate predictive models',
    ],
    results: [
      'Process 10M+ events per day',
      '99.9% uptime over 2 years',
      'Reduced reporting time by 80%',
    ],
    github: 'https://github.com/bhavyajain/insight-engine',
    color: '#4169E1',
  },
  {
    id: 'dev-tools',
    name: 'CodeFlow',
    description: 'Developer productivity suite with AI-powered code review',
    longDescription: 'A comprehensive developer toolkit that integrates AI-powered code review, automated testing, and intelligent documentation generation to boost team productivity.',
    technologies: ['TypeScript', 'VS Code Extension', 'OpenAI', 'GitHub API', 'Rust', 'WebAssembly'],
    features: [
      'AI-powered code review suggestions',
      'Automated test generation',
      'Intelligent documentation writer',
      'Real-time collaboration features',
    ],
    challenges: [
      'Building performant VS Code extensions',
      'Generating accurate test cases automatically',
      'Integrating with diverse codebases',
    ],
    results: [
      '50% reduction in code review time',
      'Used by 5,000+ developers',
      '85% accuracy in bug detection',
    ],
    github: 'https://github.com/bhavyajain/codeflow',
    live: 'https://codeflow.dev',
    color: '#10b981',
  },
  {
    id: 'blockchain-app',
    name: 'ChainVault',
    description: 'Decentralized identity and asset management platform',
    longDescription: 'A Web3 platform enabling secure digital identity management and multi-chain asset tracking. Built with cutting-edge blockchain technologies for maximum security and interoperability.',
    technologies: ['Solidity', 'React', 'Ethers.js', 'IPFS', 'The Graph', 'Node.js'],
    features: [
      'Multi-chain wallet support',
      'Self-sovereign identity management',
      'IPFS-based encrypted storage',
      'Cross-chain asset bridging',
    ],
    challenges: [
      'Complex cross-chain communication',
      'Gas optimization for smart contracts',
      'Building intuitive Web3 UX',
    ],
    results: [
      'Secured $2M+ in digital assets',
      'Integrated with 5 major blockchains',
      'Zero security incidents',
    ],
    github: 'https://github.com/bhavyajain/chainvault',
    color: '#7c3aed',
  },
];

export const achievements = [
  {
    id: 'gate',
    title: 'GATE Qualified',
    description: 'Achieved top percentile in Graduate Aptitude Test in Engineering',
    icon: 'award',
    year: '2023',
    color: '#fbbf24',
  },
  {
    id: 'hackathon-1',
    title: 'National Hackathon Winner',
    description: 'First place among 500+ teams in Smart India Hackathon',
    icon: 'trophy',
    year: '2022',
    color: '#ec4899',
  },
  {
    id: 'leetcode',
    title: 'LeetCode 500+ Problems',
    description: 'Solved 500+ algorithmic challenges with consistent daily practice',
    icon: 'code',
    year: '2024',
    color: '#22d3ee',
  },
  {
    id: 'aws-cert',
    title: 'AWS Solutions Architect',
    description: 'Certified AWS Solutions Architect Associate',
    icon: 'cloud',
    year: '2023',
    color: '#FF9900',
  },
  {
    id: 'open-source',
    title: 'Open Source Contributor',
    description: 'Active contributor to major open source projects including React, Next.js',
    icon: 'github',
    year: '2021-Present',
    color: '#339933',
  },
  {
    id: 'research',
    title: 'Published Research',
    description: 'Published paper on ML optimization in peer-reviewed journal',
    icon: 'book',
    year: '2023',
    color: '#00d4ff',
  },
];

export const experience = [
  {
    id: 'exp-1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Innovation Labs',
    duration: '2023 - Present',
    description: 'Leading development of AI-powered enterprise solutions, mentoring junior developers, and architecting scalable microservices.',
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL'],
  },
  {
    id: 'exp-2',
    title: 'Software Engineer',
    company: 'StartupXYZ',
    duration: '2021 - 2023',
    description: 'Full-stack development of B2B SaaS platform, implemented real-time features and payment integrations.',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe'],
  },
  {
    id: 'exp-3',
    title: 'Software Developer Intern',
    company: 'Code Innovate',
    duration: '2020 - 2021',
    description: 'Developed internal tools and automation scripts, learned agile development practices.',
    technologies: ['React', 'Python', 'Docker'],
  },
];

export const timeline = [
  {
    year: '2019',
    title: 'Journey Begins',
    description: 'Started coding journey with Python and web development fundamentals.',
  },
  {
    year: '2020',
    title: 'First Internship',
    description: 'Landed first development internship, contributed to real-world projects.',
  },
  {
    year: '2021',
    title: 'Full-Time Role',
    description: 'Joined startup as full-time engineer, learned production systems.',
  },
  {
    year: '2022',
    title: 'Hackathon Victory',
    description: 'Won national hackathon, discovered passion for building innovative solutions.',
  },
  {
    year: '2023',
    title: 'Senior Engineer',
    description: 'Promoted to senior role, started leading projects and mentoring others.',
  },
  {
    year: '2024',
    title: 'AI Revolution',
    description: 'Dived deep into AI/ML, building intelligent systems and products.',
  },
];

export const aiResponses: Record<string, string> = {
  'Tell me about Bhavya': `Bhavya Jain is a passionate software engineer with a deep love for building innovative solutions. He combines strong technical skills in full-stack development with a growing expertise in AI/ML. He has experience building production-grade systems, winning hackathons, and contributing to open source. What sets him apart is his ability to bridge the gap between complex technical challenges and user-centric design, creating solutions that are both powerful and intuitive.`,
  'What projects has he built?': `Bhavya has built several impressive projects including:

1. **Neural Companion** - An AI-powered conversational assistant with context awareness and multi-modal support.

2. **Insight Engine** - A real-time data analytics platform processing millions of events daily with predictive insights.

3. **CodeFlow** - A developer productivity suite with AI-powered code review and automated testing.

4. **ChainVault** - A Web3 platform for decentralized identity and asset management.

Each project showcases different aspects of his expertise from AI/ML to full-stack to blockchain development.`,
  'Why hire Bhavya?': `Bhavya would be an excellent addition to any engineering team because:

1. **Full-Stack Expertise** - He can work across the entire stack from frontend to backend to infrastructure.

2. **AI/ML Skills** - He understands how to leverage AI to build intelligent, modern products.

3. **Problem Solver** - His hackathon wins demonstrate creative problem-solving under pressure.

4. **Fast Learner** - He rapidly adapts to new technologies and paradigms.

5. **Team Player** - He has experience mentoring others and leading projects.

Beyond technical skills, he brings enthusiasm, creativity, and a drive to continuously improve.`,
  'Explain his strongest skills': `Bhavya's strongest technical skills include:

1. **React & Frontend Development** (95/100) - Deep expertise in building performant, accessible React applications with modern patterns.

2. **TypeScript** (92/100) - Strongly typed codebases with advanced type system knowledge.

3. **Node.js & Backend** (90/100) - Building scalable APIs and microservices with best practices.

4. **Python & AI/ML** (85/100) - Leveraging Python for data science, ML models, and AI applications.

He also has solid experience with databases (PostgreSQL, MongoDB), cloud platforms (AWS), and emerging technologies like Three.js for 3D experiences.`,
};

export const visitorQuestions: Record<string, string[]> = {
  recruiter: [
    'Tell me about Bhavya',
    'Why hire Bhavya?',
    'What is his work style?',
    'View past projects',
  ],
  engineer: [
    'What projects has he built?',
    'Explain his strongest skills',
    'Does he contribute to open source?',
    'What tech stack does he prefer?',
  ],
  founder: [
    'Why hire Bhavya?',
    'Can he lead a technical team?',
    'What startup experience does he have?',
    'View his projects',
  ],
  student: [
    'How did he start coding?',
    'What should I learn first?',
    'How to prepare for internships?',
    'Any advice for students?',
  ],
  explorer: [
    'Tell me about Bhavya',
    'What projects has he built?',
    'What technologies does he use?',
    'View his achievements',
  ],
};
