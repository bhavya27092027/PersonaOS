import type { Project } from '../store/useAppStore';

export const personalInfo = {
  name: "Bhavya Jain",

  title: "Software Engineer | AI Engineer | Full-Stack Developer",

  subtitle:
    "Building AI Products • Generative AI • MERN Stack • Machine Learning • Problem Solver",

  tagline:
    "Turning intelligent ideas into production-ready AI applications.",

  email: "bhavya011048@gmail.com",

  linkedin: "https://www.linkedin.com/in/bhavyajain-fullstack/",

  github: "https://github.com/bhavya27092027",

  resume: "/Bhavya_Jain_SDE_Resume.pdf",

  location: "Ghaziabad, India",

  bio: `
I am a final-year B.Tech Computer Science (AI & ML) student at ABES Engineering College passionate about Software Engineering, Artificial Intelligence, and Full-Stack Development.

My work focuses on building AI-powered products using React, Node.js, MongoDB, TensorFlow, and Large Language Models (LLMs). I enjoy solving real-world problems through scalable software solutions while continuously exploring modern AI technologies.

My journey includes publishing IEEE research, completing industry internships, building AI-powered applications, and strengthening problem-solving skills through competitive programming.

I aspire to become a Software Engineer building intelligent systems that combine scalable backend engineering with cutting-edge Artificial Intelligence.
`,
};


export const skills = [

  // Languages

  { name: "C++", level: 90, color: "#00599C", category: "Languages" },

  { name: "Java", level: 88, color: "#f89820", category: "Languages" },

  { name: "Python", level: 90, color: "#3776AB", category: "Languages" },

  { name: "JavaScript", level: 88, color: "#F7DF1E", category: "Languages" },

  { name: "TypeScript", level: 82, color: "#3178C6", category: "Languages" },



  // Frontend

  { name: "React.js", level: 90, color: "#61DAFB", category: "Frontend" },

  { name: "HTML5", level: 95, color: "#E34F26", category: "Frontend" },

  { name: "CSS3", level: 90, color: "#1572B6", category: "Frontend" },

  { name: "Tailwind CSS", level: 88, color: "#06B6D4", category: "Frontend" },

  { name: "Vite", level: 85, color: "#646CFF", category: "Frontend" },



  // Backend

  { name: "Node.js", level: 87, color: "#339933", category: "Backend" },

  { name: "Express.js", level: 85, color: "#000000", category: "Backend" },

  { name: "REST APIs", level: 88, color: "#4F46E5", category: "Backend" },

  { name: "JWT Authentication", level: 85, color: "#7C3AED", category: "Backend" },



  // Database

  { name: "MongoDB", level: 86, color: "#47A248", category: "Database" },

  { name: "MySQL", level: 84, color: "#4479A1", category: "Database" },

  { name: "PostgreSQL", level: 78, color: "#336791", category: "Database" },



  // AI

  { name: "Machine Learning", level: 86, color: "#FF9800", category: "AI / ML" },

  { name: "Deep Learning", level: 82, color: "#E65100", category: "AI / ML" },

  { name: "TensorFlow", level: 82, color: "#FF6F00", category: "AI / ML" },

  { name: "Keras", level: 82, color: "#D00000", category: "AI / ML" },

  { name: "OpenCV", level: 75, color: "#5C3EE8", category: "AI / ML" },

  { name: "Scikit-Learn", level: 80, color: "#F7931E", category: "AI / ML" },

  { name: "Generative AI", level: 82, color: "#9333EA", category: "AI / ML" },

  { name: "Prompt Engineering", level: 85, color: "#0EA5E9", category: "AI / ML" },

  { name: "Gemini API", level: 86, color: "#14B8A6", category: "AI / ML" },



  // Tools

  { name: "Git", level: 90, color: "#F05032", category: "Tools" },

  { name: "GitHub", level: 90, color: "#181717", category: "Tools" },

  { name: "Postman", level: 85, color: "#FF6C37", category: "Tools" },

  { name: "Thunder Client", level: 85, color: "#6C63FF", category: "Tools" },

  { name: "VS Code", level: 95, color: "#007ACC", category: "Tools" },



  // Problem Solving

  { name: "Data Structures", level: 90, color: "#7C3AED", category: "Problem Solving" },

  { name: "Algorithms", level: 88, color: "#EC4899", category: "Problem Solving" },

  { name: "Competitive Programming", level: 85, color: "#22C55E", category: "Problem Solving" }

];


export const projects: Project[] = [
  {
    id: "recoverai",

    name: "RecoverAI",

    description:
      "An autonomous AI revenue recovery platform that analyzes failed payments, predicts recovery likelihood, and executes intelligent recovery workflows.",

    longDescription: `RecoverAI is a full-stack fintech SaaS platform designed to recover revenue lost through failed customer payments. It analyzes payment failures, evaluates recovery probability using explainable AI heuristics, prioritizes high-value recovery opportunities, and supports autonomous recovery workflows.

The platform integrates Razorpay TEST MODE for payment processing and webhook events, while providing real-time transaction tracking, recovery analytics, AI insights, and merchant-specific recovery policies.`,

    problemStatement:
      `Failed customer payments represent significant lost revenue for businesses, while traditional retry mechanisms often use static rules and treat every failure the same way. RecoverAI transforms failed payments into prioritized recovery opportunities using intelligent, data-driven recovery decisions.`,

    architecture:
      `Built using React, TypeScript, Node.js, Express.js, and MongoDB with a modular REST API architecture. The platform uses merchant-scoped data isolation, JWT-based authentication, explainable recovery heuristics, Razorpay TEST MODE integration, webhook processing, and persistent transaction tracking. The frontend is deployed on Netlify and the backend on Railway.`,

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "REST APIs",
      "JWT",
      "Railway",
      "Netlify"
    ],

    features: [
      "Failed payment analysis",
      "AI recovery probability scoring",
      "Autonomous recovery workflows",
      "Recovery strategy recommendations",
      "Razorpay TEST MODE integration",
      "Webhook processing",
      "Transaction tracking",
      "Recovery analytics",
      "AI financial insights",
      "Merchant-scoped data isolation"
    ],

    challenges: [
      "Designing recovery decision logic",
      "Payment webhook processing",
      "Webhook idempotency",
      "Cross-origin authentication",
      "Merchant data isolation",
      "Production deployment"
    ],

    results: [
      "Production-ready fintech SaaS platform",
      "Autonomous payment recovery workflow",
      "Real-time recovery analytics",
      "Razorpay TEST MODE integration",
      "Production deployment on Railway & Netlify"
    ],

    impact:
      `Transforms failed payment events into actionable recovery opportunities, helping merchants identify high-probability recoveries and automate appropriate recovery actions.`,

    futureScope:
      `Integrate real payment traffic, advanced machine learning models, adaptive recovery strategies, additional payment gateways, predictive customer lifetime value, and real-time recovery optimization.`,

    keyLearnings: [
      "Fintech application architecture",
      "Payment gateway integration",
      "Webhook engineering",
      "AI decision systems",
      "REST API development",
      "Authentication and authorization",
      "Production deployment"
    ],

    github: "https://github.com/bhavya27092027/RecoverAI",

    live: "https://recoverai-revenue.netlify.app/",

    color: "#10B981",
  },

  {
    id: "prepilot-ai",

    name: "PrePilot AI",

    description:
      "An AI-powered interview preparation platform that simulates real technical and HR interviews using Large Language Models.",

    longDescription:
      `PrePilot AI helps students prepare for placements through intelligent AI-generated interviews. The platform creates personalized interview experiences based on resumes, selected roles, and technical skills while providing real-time feedback, behavioral question generation, and mock interview simulations.

It combines Full-Stack Development with Generative AI to create an end-to-end interview preparation ecosystem.`,

    problemStatement:
      `Many students struggle to prepare effectively for interviews due to lack of personalized practice, real-time feedback, and realistic interview simulations.`,

    architecture:
      `Built on the MERN Stack using React for the frontend, Node.js and Express.js for backend APIs, MongoDB for storing users and interview history, and Gemini API for generating interview questions and intelligent responses.`,

    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Gemini API",
      "REST APIs"
    ],

    features: [
      "Resume-based interview generation",
      "Technical interview preparation",
      "HR interview preparation",
      "AI-generated questions",
      "Personalized feedback",
      "Authentication",
      "Conversation history"
    ],

    challenges: [
      "Maintaining conversational context",
      "Reducing AI hallucinations",
      "Prompt optimization",
      "Managing API token usage"
    ],

    results: [
      "Production-ready AI application",
      "Real-world LLM integration",
      "Improved interview preparation workflow",
      "Scalable MERN architecture"
    ],

    impact:
      `Provides students with affordable and accessible AI-powered interview coaching, reducing dependency on manual mock interviews while improving interview confidence.`,

    futureScope:
      `Speech-to-speech mock interviews, emotion detection, coding interview compiler integration, company-specific interview preparation, multilingual support, ATS resume review, recruiter dashboard.`,

    keyLearnings: [
      "LLM integration",
      "Prompt engineering",
      "Authentication systems",
      "REST API development",
      "Database schema design",
      "State management"
    ],

    github: "https://github.com/bhavya27092027/PrepPilot-AI",

    live: "https://preppilot-ai.netlify.app/",

    color: "#F97316",
  },

  {
    id: "digivision-ai",

    name: "DigiVision AI",

    description:
      "CNN-based handwritten digit recognition system trained on the MNIST dataset using Deep Learning.",

    longDescription:
      `DigiVision AI is a computer vision project developed to recognize handwritten digits using Convolutional Neural Networks (CNNs). The model was trained on the MNIST dataset consisting of 70,000 grayscale handwritten digit images (60,000 training and 10,000 testing samples).

The application performs image preprocessing, normalization, CNN model training, evaluation, and real-time handwritten digit prediction.`,

    problemStatement:
      `Manual digit recognition is inefficient for automated systems such as cheque processing, postal sorting, and handwritten document analysis. A robust computer vision model can automate this task with high accuracy.`,

    architecture:
      `Developed using TensorFlow and Keras with a CNN architecture consisting of convolution, pooling, flattening, and dense layers. Image preprocessing includes normalization and reshaping before training. Predictions are generated using the trained model.`,

    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "NumPy",
      "OpenCV",
      "Matplotlib"
    ],

    features: [
      "MNIST dataset training",
      "CNN architecture",
      "Image preprocessing",
      "Model evaluation",
      "Prediction visualization",
      "High accuracy classification"
    ],

    challenges: [
      "Improving prediction accuracy",
      "Hyperparameter tuning",
      "Reducing overfitting",
      "Training optimization"
    ],

    results: [
      "92.8% classification accuracy",
      "Real-time prediction",
      "Complete deep learning workflow",
      "Successful CNN implementation"
    ],

    impact:
      `Demonstrates how Deep Learning and Computer Vision can automate handwritten digit recognition for real-world applications including banking, education, logistics, and document digitization.`,

    futureScope:
      `Support handwritten alphabets, multilingual OCR, custom dataset training, mobile deployment using TensorFlow Lite, edge AI inference, and complete OCR pipeline.`,

    keyLearnings: [
      "Convolutional Neural Networks",
      "Deep Learning workflow",
      "Image preprocessing",
      "Model evaluation",
      "Computer Vision fundamentals"
    ],

    github: "https://github.com/bhavya27092027/ML-Project",

    color: "#2563EB",
  },

  {
    id: "page-pulse",

    name: "Page Pulse",

    description:
      "A production-grade full-stack website auditing platform for analyzing website health, performance, and reliability.",

    longDescription: `Page Pulse is a full-stack website auditing platform that analyzes URLs and generates detailed health reports. It performs website validation, health checks, caching, rate limiting, and REST API-based analysis while providing a clean dashboard for users.

The application follows a scalable React + Express architecture and is deployed in production using Netlify and Railway.`,

    problemStatement:
      `Developers and businesses often require a quick way to validate website availability and health without relying on multiple tools. Page Pulse consolidates these checks into a single platform.`,

    architecture:
      `Built using React, TypeScript, Express.js, and Node.js with modular REST APIs. The backend implements caching, rate limiting, and validation logic, while the frontend provides an intuitive dashboard for audit reports.`,

    technologies: [
      "React",
      "TypeScript",
      "Express.js",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
      "Railway",
      "Netlify"
    ],

    features: [
      "Website health analysis",
      "REST API integration",
      "Caching",
      "Rate limiting",
      "URL validation",
      "Responsive dashboard",
      "Production deployment"
    ],

    challenges: [
      "Backend API optimization",
      "Caching strategy",
      "Request validation",
      "Production deployment"
    ],

    results: [
      "Production-ready full-stack application",
      "Scalable backend architecture",
      "Reliable website health reports",
      "Cloud deployment on Railway & Netlify"
    ],

    impact:
      `Provides developers with a fast and reliable way to analyze website health through a modern full-stack application.`,

    futureScope:
      `Integrate Lighthouse reports, SEO analysis, accessibility checks, historical monitoring, and scheduled website audits.`,

    keyLearnings: [
      "REST API development",
      "Backend architecture",
      "Caching strategies",
      "Rate limiting",
      "Production deployment"
    ],

    github: "https://github.com/bhavya27092027/page-pulse",

    live: "https://page-pulse-analyzer.netlify.app/",

    color: "#10B981",
  }
];


export const achievements = [

  {
    id: "ieee",
    title: "IEEE Research Publication",
    description:
      `Published a peer-reviewed research paper in IEEE Conference Proceedings titled "Early Fusion-Based Multimodal Analysis for Identifying Mental Health Conditions from Social Media Data." The research explores multimodal deep learning techniques for detecting mental health conditions from social media content using early fusion strategies.`,
    icon: "book-open",
    year: "2026",
    color: "#3B82F6",

    link: "https://ieeexplore.ieee.org/document/11465665",
  },

  {

    id: "gate",
    title: "GATE 2026 Qualified",
    description:
      "Qualified the Graduate Aptitude Test in Engineering (GATE), demonstrating strong foundations in Computer Science, Aptitude, Algorithms, Data Structures, Operating Systems, DBMS, and Software Engineering.",
    icon: "award",
    year: "2026",
    color: "#F59E0B",
  },

  {

    id: "internship",
    title: "Full Stack Development Intern",
    description:
      "Successfully completed Full Stack Development Internship at Unified Mentors Pvt. Ltd., contributing to responsive user interfaces, RESTful APIs, authentication systems, and scalable MERN Stack applications while collaborating in an Agile development environment.",
    icon: "briefcase",
    year: "2026",
    color: "#10B981",
  },

  {

    id: "webdev",

    title: "Web Development Intern",

    description:
      "Completed Web Development Internship at Launched Global where I developed responsive web interfaces, improved user experience, and strengthened frontend engineering skills through real-world development projects.",

    icon: "monitor",

    year: "2025",

    color: "#06B6D4",

  },

  {

    id: "leetcode",

    title: "500+ DSA Problems Solved",

    description:
      "Solved over 500+ Data Structures & Algorithms problems covering Arrays, Strings, Trees, Graphs, Binary Search, Dynamic Programming, Sliding Window, Greedy, Heap, Backtracking, and Graph Algorithms while continuously improving analytical thinking and coding efficiency.",

    icon: "code",

    year: "2026",

    color: "#8B5CF6",

  },

  {

    id: "codechef",

    title: "CodeChef 3★ Programmer",

    description:
      "Achieved CodeChef 3-Star rating with a peak rating of 1635 through consistent participation in competitive programming contests and algorithmic problem solving.",

    icon: "trophy",

    year: "2026",

    color: "#EC4899",

  },

  {

    id: "projects",

    title: "AI & Full Stack Projects",

    description:
      "Designed and developed multiple production-ready software projects including PersonaOS, PrePilot AI, DigiVision AI, CivicSphere, and several full-stack web applications integrating Artificial Intelligence with modern software engineering.",

    icon: "rocket",

    year: "2024-Present",

    color: "#6366F1",

  },

];


export const experience = [

  {

    id: "education",

    title: "Bachelor of Technology (Computer Science - AI & ML)",

    company: "ABES Engineering College",

    duration: "2023 - 2027",

    description:
      `Pursuing B.Tech specializing in Artificial Intelligence & Machine Learning with strong focus on Software Engineering, Data Structures & Algorithms, Machine Learning, Database Systems, Operating Systems and Web Technologies.`,

    technologies: [

      "C++",

      "Java",

      "Python",

      "Machine Learning",

      "Data Structures",

      "DBMS",

      "Operating Systems",

      "Software Engineering"

    ]

  },

  {

    id: "intern1",

    title: "Full Stack Developer Intern",

    company: "Unified Mentors Pvt. Ltd.",

    duration: "Dec 2025 - Mar 2026",

    description:
      `Developed scalable MERN Stack applications by building reusable React components, REST APIs, JWT authentication modules, MongoDB integrations, and responsive user interfaces while collaborating within Agile development workflows.`,

    technologies: [

      "React",

      "Node.js",

      "Express.js",

      "MongoDB",

      "JWT",

      "REST APIs",

      "Git"

    ]

  },

  {

    id: "intern2",

    title: "Web Developer Intern",

    company: "Launched Global",

    duration: "May 2025 - Jun 2025",

    description:
      `Designed responsive frontend interfaces, optimized website performance, enhanced UI responsiveness, and collaborated with developers to improve user experience across multiple web applications.`,

    technologies: [

      "HTML",

      "CSS",

      "JavaScript",

      "React",

      "Bootstrap"

    ]

  },

  {

    id: "research",

    title: "Research & Artificial Intelligence",

    company: "IEEE Conference Publication",

    duration: "2026",

    description:
      `Published IEEE research focusing on Early Fusion-Based Multimodal Analysis for Identifying Mental Health Conditions from Social Media Data using Artificial Intelligence and Deep Learning techniques.`,

    technologies: [

      "Machine Learning",

      "Deep Learning",

      "Python",

      "TensorFlow",

      "Research"

    ]

  },

];


export const timeline = [

  {

    year: "2023",

    title: "Started Computer Science Journey",

    description:
      "Started B.Tech in Computer Science (AI & ML) at ABES Engineering College while building strong programming fundamentals in C++, Java, and Python."

  },

  {

    year: "2024",

    title: "Explored Full Stack Development",

    description:
      "Learned HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and Git while developing multiple web applications and strengthening software engineering fundamentals."

  },

  {

    year: "2025",

    title: "Industry Experience",

    description:
      "Completed Web Development Internship at Launched Global and Full Stack Development Internship at Unified Mentors Pvt. Ltd., gaining practical software development experience."

  },

  {

    year: "2025",

    title: "Artificial Intelligence Projects",

    description:
      "Built DigiVision AI, explored Machine Learning, Deep Learning, Computer Vision, and integrated Artificial Intelligence into practical applications."

  },

  {

    year: "2026",

    title: "Generative AI Development",

    description:
      "Developed PrePilot AI and PersonaOS by combining Full Stack Development with Large Language Models, Prompt Engineering, and modern AI technologies."

  },

  {

    year: "2026",

    title: "IEEE Research Publication",

    description:
      "Published research paper in IEEE Conference Proceedings on multimodal AI for identifying mental health conditions from social media data."

  },

  {

    year: "2026",

    title: "Competitive Programming",

    description:
      "Solved 370+ DSA problems, achieved CodeChef 2★ rating, and continuously strengthened algorithmic thinking through regular coding practice."

  },

  {

    year: "Future",

    title: "Software Engineer & AI Engineer",

    description:
      "Focused on building scalable AI-powered software products, contributing to impactful engineering teams, and continuously learning cutting-edge technologies."

  },

];


export const aiResponses: Record<string, string> = {

  "Tell me about Bhavya":

    `Bhavya Jain is a final-year B.Tech Computer Science (Artificial Intelligence & Machine Learning) student at ABES Engineering College with a passion for Software Engineering, Artificial Intelligence, and Full-Stack Development.

She enjoys transforming complex ideas into practical software products that solve real-world problems. Her expertise spans MERN Stack Development, Machine Learning, Deep Learning, Generative AI, and Data Structures & Algorithms.

Beyond academics, Bhavya has completed industry internships, published IEEE research, built AI-powered applications, and consistently strengthened her problem-solving skills through competitive programming.

Her long-term goal is to become a Software Engineer building intelligent products that combine scalable backend systems with cutting-edge AI technologies.`,



  "Why hire Bhavya?":

    `Bhavya combines strong software engineering fundamentals with practical Artificial Intelligence experience.

Unlike candidates who focus only on coursework, she has demonstrated her abilities through industry internships, IEEE research publication, AI-powered applications, and consistent competitive programming.

Highlights include:

• IEEE Published Research Author
• Full Stack Development Intern
• Web Development Intern
• 370+ DSA Problems Solved
• CodeChef 2★ Programmer
• Built multiple AI-powered applications
• Strong React, Node.js, MongoDB and Python skills

She learns quickly, adapts to new technologies, and enjoys solving real engineering problems. These qualities make her a promising Software Engineering candidate.`,



  "What projects has she built?":

    `Bhavya has worked on multiple software engineering and Artificial Intelligence projects.

🚀 PersonaOS
An AI-powered interactive portfolio where recruiters can communicate with an intelligent assistant to explore projects, achievements, technical skills, internships, and research.

🤖 PrePilot AI
A Generative AI interview preparation platform providing personalized technical and HR mock interviews using Large Language Models.

🧠 DigiVision AI
A Deep Learning application capable of recognizing handwritten digits using CNNs trained on the MNIST dataset containing 70,000 handwritten images.

🌍 CivicSphere
A crowdsourced civic issue reporting platform designed to improve communication between citizens and local authorities.

🚖 Cab Booking Portal
A MERN Stack web application implementing authentication, database management, booking workflows, and responsive user interfaces.

Together, these projects demonstrate Bhavya's ability to combine Software Engineering with Artificial Intelligence to build practical applications.`,



  "Explain her strongest skills":

    `Bhavya's strongest technical areas include:

💻 Full Stack Development
React.js
Node.js
Express.js
MongoDB
REST APIs
JWT Authentication

🤖 Artificial Intelligence
Machine Learning
Deep Learning
TensorFlow
Keras
Generative AI
Prompt Engineering
LLM Integration

📚 Programming Languages
C++
Java
Python
JavaScript
TypeScript

🧠 Problem Solving
370+ DSA Problems
Arrays
Trees
Graphs
Dynamic Programming
Sliding Window
Greedy
Binary Search
Heap

She continuously expands her knowledge by building real-world software products rather than only studying theoretical concepts.`,



  "Tell me about her IEEE publication":

    `Bhavya published a research paper in IEEE Conference Proceedings titled:

"Early Fusion-Based Multimodal Analysis for Identifying Mental Health Conditions from Social Media Data."

The research investigates how Artificial Intelligence can identify mental health conditions by combining multiple modalities extracted from social media content.

The work focuses on multimodal learning, feature fusion techniques, and intelligent classification models that improve prediction performance over single-modal approaches.

This publication demonstrates her interest in applied Artificial Intelligence, Deep Learning, and research-driven problem solving.`,



  "Tell me about her internships":

    `Bhavya has completed two professional internships.

🏢 Unified Mentors Pvt. Ltd.
Full Stack Developer Intern

Worked on MERN Stack applications involving React, Node.js, Express, MongoDB, REST APIs, JWT Authentication, responsive UI development, and backend integration.

🏢 Launched Global
Web Developer Intern

Developed responsive web interfaces, improved website performance, collaborated with development teams, and strengthened frontend engineering skills.

These internships provided practical software engineering experience beyond classroom learning.`,



  "Is she ready for Software Engineering roles?":

    `Yes.

Bhavya has built a solid foundation through:

✅ Production-ready projects
✅ Industry internships
✅ IEEE publication
✅ Competitive programming
✅ Full Stack Development
✅ Machine Learning projects
✅ Git & collaborative development
✅ Database design
✅ API development

She demonstrates both technical knowledge and practical implementation skills required for entry-level Software Engineering positions while maintaining a strong learning mindset.`,



  "What technologies does she use?":

    `Frontend
React.js
TypeScript
JavaScript
Tailwind CSS
HTML
CSS

Backend
Node.js
Express.js
REST APIs
JWT

Databases
MongoDB
MySQL
PostgreSQL

Artificial Intelligence
TensorFlow
Keras
OpenCV
Scikit-Learn
Gemini API
Generative AI

Programming
C++
Java
Python

Tools
Git
GitHub
Postman
Thunder Client
VS Code

These technologies enable her to design, develop, deploy, and maintain complete software applications.`,



  "What are her future goals?":

    `Bhavya aims to become a Software Engineer specializing in Artificial Intelligence and scalable backend systems.

She wants to build intelligent products that positively impact users while continuously learning modern technologies including Large Language Models, Cloud Computing, Distributed Systems, and advanced Machine Learning.

Her long-term vision is to contribute to innovative engineering teams where Software Engineering and AI intersect to solve meaningful real-world problems.`,

};


export const visitorQuestions = {

  recruiter: [

    "Tell me about Bhavya",

    "Why hire Bhavya?",

    "Tell me about her internships",

    "Tell me about her IEEE publication",

    "What projects has she built?",

    "Explain her strongest skills",

    "Is she ready for Software Engineering roles?",

    "What technologies does she use?"

  ],

  engineer: [

    "What projects has she built?",

    "Explain her strongest skills",

    "Tell me about her IEEE publication",

    "What technologies does she use?",

    "How does PersonaOS work?"

  ],

  founder: [

    "Why hire Bhavya?",

    "What projects has she built?",

    "Is she ready for Software Engineering roles?",

    "What are her future goals?"

  ],

  student: [

    "Tell me about Bhavya",

    "What projects has she built?",

    "Explain her strongest skills",

    "What technologies does she use?"

  ],

  explorer: [

    "Tell me about Bhavya",

    "Tell me about her IEEE publication",

    "What projects has she built?",

    "Why hire Bhavya?"

  ]

};