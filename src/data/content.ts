import type { Project } from '../store/useAppStore';

export const personalInfo = {
name: 'Bhavya Jain',
title: 'Software Engineer & AI/ML Enthusiast',
subtitle: 'AI/ML Enthusiast | Full Stack Developer | Problem Solver',
tagline: 'Transforming ideas into intelligent digital experiences.',
email: 'bhavya011048@gmail.com',
linkedin: 'https://www.linkedin.com/in/bhavyajain-fullstack/',
github: 'https://github.com/bhavya27092027',
resume: '/resume.pdf',
location: 'Ghaziabad, India',
bio: 'B.Tech Computer Science (AI & ML) student at ABES Engineering College with a strong interest in Software Development, Artificial Intelligence, and Data Structures & Algorithms. Passionate about building impactful applications using React, Node.js, MongoDB, Machine Learning, and Generative AI while continuously exploring new technologies and solving real-world problems.',
};


export const skills = [
{ name: 'Java', level: 88, color: '#f89820', category: 'Languages' },
{ name: 'Python', level: 85, color: '#3776AB', category: 'Languages' },
{ name: 'JavaScript', level: 84, color: '#F7DF1E', category: 'Languages' },

{ name: 'React', level: 82, color: '#61DAFB', category: 'Frontend' },
{ name: 'HTML', level: 90, color: '#E34F26', category: 'Frontend' },
{ name: 'CSS', level: 85, color: '#1572B6', category: 'Frontend' },

{ name: 'Node.js', level: 78, color: '#339933', category: 'Backend' },
{ name: 'Express.js', level: 76, color: '#000000', category: 'Backend' },

{ name: 'MongoDB', level: 75, color: '#47A248', category: 'Database' },
{ name: 'MySQL', level: 78, color: '#4479A1', category: 'Database' },

{ name: 'Machine Learning', level: 72, color: '#FF6F00', category: 'AI/ML' },
{ name: 'TensorFlow', level: 70, color: '#FF6F00', category: 'AI/ML' },

{ name: 'Data Structures & Algorithms', level: 85, color: '#8B5CF6', category: 'Problem Solving' },
{ name: 'Git & GitHub', level: 80, color: '#F05032', category: 'Tools' },
];


export const projects: Project[] = [
{
id: 'interview-prep-bot',
name: 'AI Interview Preparation Bot',
description: 'AI-powered platform for technical and HR interview preparation',
longDescription: 'An intelligent interview preparation platform that helps students practice technical and HR interviews through AI-generated questions, mock interview sessions, and personalized feedback. The system simulates real interview scenarios and helps users improve communication and problem-solving skills.',
technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API'],
features: [
'AI-generated interview questions',
'Mock interview simulation',
'Technical and HR interview preparation',
'Personalized feedback and suggestions',
],
challenges: [
'Generating relevant interview questions dynamically',
'Maintaining conversational context',
'Providing meaningful AI-driven feedback',
],
results: [
'Improved interview readiness for students',
'Real-time AI interaction experience',
'Full-stack implementation with AI integration',
],
github: 'https://github.com/bhavya27092027/InterviewPreparationBot',
color: '#FF6F00',
},

{
id: 'digit-recognition',
name: 'Handwritten Digit Recognition',
description: 'Deep learning model for handwritten digit classification',
longDescription: 'A machine learning application that recognizes handwritten digits using neural networks. The project includes image preprocessing, model training, evaluation, and prediction modules to accurately classify handwritten numerical inputs.',
technologies: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'OpenCV'],
features: [
'Handwritten digit classification',
'Image preprocessing pipeline',
'Neural network training and evaluation',
'Prediction visualization',
],
challenges: [
'Improving model accuracy',
'Handling noisy image inputs',
'Optimizing training performance',
],
results: [
'High classification accuracy on test data',
'Successful real-time predictions',
'Practical implementation of deep learning concepts',
],
github: 'https://github.com/bhavya27092027/ML-Project',
color: '#4169E1',
},

{
id: 'cab-booking-portal',
name: 'Cab Booking Portal',
description: 'Online cab reservation and management system',
longDescription: 'A web-based cab booking application that enables users to book rides, manage reservations, and track booking details. The system includes user authentication, booking workflows, and database-driven management features.',
technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
features: [
'Cab booking and reservation system',
'User authentication',
'Booking management dashboard',
'Database-driven ride records',
],
challenges: [
'Designing efficient booking workflows',
'Managing relational database operations',
'Building responsive user interfaces',
],
results: [
'Successful implementation of booking system',
'Efficient ride management workflow',
'Practical database integration experience',
],
github: 'https://github.com/bhavya27092027/WebDev-CapstoneProject',
color: '#10b981',
},

{
id: 'mini-project-suite',
name: 'Interactive Web Projects Suite',
description: 'Collection of interactive web applications and games',
longDescription: 'A collection of frontend and logic-based projects including Tic Tac Toe, KBC Quiz Application, and other interactive web applications. These projects demonstrate problem-solving skills, UI design, and JavaScript development concepts.',
technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
features: [
'Tic Tac Toe Game',
'KBC Quiz Application',
'Interactive UI Components',
'Logic-based Problem Solving',
],
challenges: [
'Implementing game logic efficiently',
'Managing application state',
'Creating engaging user experiences',
],
results: [
'Strengthened frontend development skills',
'Improved JavaScript problem-solving abilities',
'Built multiple interactive applications',
],
github: 'https://github.com/bhavya27092027/Web-Development-Minor-Projects',
live: 'https://github.com/bhavya27092027/Web-Dev-Projects',
color: '#7c3aed',
},
];


export const achievements = [
{
id: 'gate',
title: 'GATE Qualified',
description: 'Qualified GATE, demonstrating strong foundations in Computer Science, Aptitude, and Problem Solving.',
icon: 'award',
year: '2026',
color: '#fbbf24',
},
{
id: 'leetcode',
title: '319+ Problems Solved',
description: 'Solved 319+ Data Structures and Algorithms problems across arrays, trees, graphs, dynamic programming, and more.',
icon: 'code',
year: '2026',
color: '#22d3ee',
},
{
id: 'codechef',
title: 'CodeChef 2★ Coder',
description: 'Achieved 2-Star rating with a peak rating of 1513 through consistent competitive programming participation.',
icon: 'trophy',
year: '2026',
color: '#ec4899',
},
{
id: 'aiml',
title: 'AI & Full-Stack Developer',
description: 'Built AI-powered and full-stack applications using React, Node.js, MongoDB, Machine Learning, and Generative AI.',
icon: 'cpu',
year: '2024-Present',
color: '#8b5cf6',
},
{
id: 'projects',
title: '10+ Academic & Personal Projects',
description: 'Developed projects spanning AI/ML, Full-Stack Development, Web Applications, and Interactive Games.',
icon: 'rocket',
year: '2024-Present',
color: '#10b981',
},
{
id: 'learning',
title: 'Continuous Learner',
description: 'Actively pursuing advanced knowledge in Deep Learning, Cloud Computing, DSA, and Software Engineering.',
icon: 'book',
year: 'Ongoing',
color: '#00d4ff',
},
];


export const experience = [
{
id: 'edu-1',
title: 'B.Tech in Computer Science (AI & ML)',
company: 'ABES Engineering College',
duration: '2023 - 2027',
description:
'Pursuing Bachelor of Technology with specialization in Artificial Intelligence and Machine Learning. Focused on Data Structures & Algorithms, Full-Stack Development, Machine Learning, and Software Engineering.',
technologies: [
'Java',
'Python',
'C++',
'DSA',
'Machine Learning',
'Database Systems'
],
},

{
id: 'journey-1',
title: 'Full Stack Development Journey',
company: 'Personal Projects & Self Learning',
duration: '2024 - Present',
description:
'Building full-stack web applications using React, Node.js, Express, and MongoDB while exploring modern software development practices.',
technologies: [
'React',
'Node.js',
'Express.js',
'MongoDB',
'JavaScript',
'TypeScript'
],
},

{
id: 'journey-2',
title: 'AI & Machine Learning Exploration',
company: 'Academic & Personal Projects',
duration: '2024 - Present',
description:
'Working on AI-powered applications and machine learning projects including Interview Preparation Bot and Handwritten Digit Recognition.',
technologies: [
'Python',
'TensorFlow',
'Keras',
'Gemini API',
'NumPy',
'OpenCV'
],
},
];


export const timeline = [
{
year: '2023',
title: 'Started B.Tech Journey',
description: 'Began B.Tech in Computer Science (AI & ML) at ABES Engineering College and started exploring programming fundamentals.',
},

{
year: '2024',
title: 'Web Development & DSA',
description: 'Learned HTML, CSS, JavaScript, React, and started solving Data Structures & Algorithms problems consistently.',
},

{
year: '2024',
title: 'Built First Major Projects',
description: 'Developed projects including Cab Booking Portal, Tic Tac Toe, KBC Quiz, and several web applications to strengthen development skills.',
},

{
year: '2025',
title: 'Machine Learning Exploration',
description: 'Worked on Handwritten Digit Recognition and explored Machine Learning, Deep Learning, and AI concepts through practical implementation.',
},

{
year: '2025',
title: 'AI-Powered Development',
description: 'Built AI Interview Preparation Bot and started integrating Generative AI into real-world applications.',
},

{
year: '2026',
title: 'GATE Qualified & Competitive Programming',
description: 'Qualified GATE and achieved CodeChef 2★ rating while solving 319+ problems on LeetCode.',
},

{
year: 'Future',
title: 'Software Engineer in Progress',
description: 'Continuously learning, building impactful products, and preparing for opportunities in Software Development and AI Engineering.',
},
];


export const aiResponses: Record<string, string> = {
'Tell me about Bhavya': `Bhavya Jain is a B.Tech Computer Science (AI & ML) student at ABES Engineering College. She is passionate about Software Development, Artificial Intelligence, and Problem Solving. Her interests span Full-Stack Development, Data Structures & Algorithms, Machine Learning, and Generative AI. Bhavya enjoys building practical applications that combine modern web technologies with intelligent systems.`,

'What projects has she built?': `Bhavya has worked on several projects across Web Development and AI/ML:

1. AI Interview Preparation Bot – An AI-powered platform that helps students prepare for technical and HR interviews.

2. Handwritten Digit Recognition – A Machine Learning project that classifies handwritten digits using neural networks.

3. Cab Booking Portal – A web-based booking and management system with database integration.

4. Interactive Web Projects – Including Tic Tac Toe, KBC Quiz Application, and other frontend-focused applications.

These projects demonstrate her ability to work across both software development and AI domains.`,

'Why hire Bhavya?': `Bhavya brings a strong combination of technical curiosity, problem-solving ability, and continuous learning. She has hands-on experience with React, Node.js, MongoDB, Machine Learning, and AI integration. Her GATE qualification, competitive programming experience, and project portfolio demonstrate dedication, consistency, and a willingness to take on challenging problems. As a learner and builder, she is constantly improving her skills and applying them to real-world projects.`,

'Explain her strongest skills': `Bhavya's strongest skills include:

1. Data Structures & Algorithms – Solved 319+ problems on LeetCode and actively practices competitive programming.

2. Full-Stack Development – Experience with React, Node.js, Express.js, MongoDB, JavaScript, and TypeScript.

3. Artificial Intelligence & Machine Learning – Built projects involving Machine Learning models and AI-powered applications.

4. Problem Solving – Demonstrated through GATE qualification and coding platform achievements.

Her goal is to combine software engineering and AI to build impactful products and solutions.`,
};


export const visitorQuestions: Record<string, string[]> = {
  recruiter: [
    'Tell me about Bhavya',
    'Why hire Bhavya?',
    'What is her work style?',
    'View past projects',
  ],
  engineer: [
    'What projects has she built?',
    'Explain her strongest skills',
    'Does she contribute to open source?',
    'What tech stack does she prefer?',
  ],
  founder: [
    'Why hire Bhavya?',
    'Can she lead a technical team?',
    'What startup experience does she have?',
    'View her projects',
  ],
  student: [
    'How did she start coding?',
    'What should I learn first?',
    'How to prepare for internships?',
    'Any advice for students?',
  ],
  explorer: [
    'Tell me about Bhavya',
    'What projects has she built?',
    'What technologies does she use?',
    'View her achievements',
  ],
};
