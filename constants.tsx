
import { ResumeData, TemplateType } from './types';

export const SAMPLE_RESUME: ResumeData = {
  id: 'sample-1',
  title: 'Engineering Placement Resume',
  templateId: TemplateType.IIT_PLACEMENT,
  personalInfo: {
    fullName: 'Akash Kumar Gosain',
    email: 'akash.gosain@silicon.ac.in',
    phone: '+91 9876543210',
    location: 'Bhubaneswar, Odisha',
    linkedin: 'linkedin.com/in/akashgosain',
    github: 'github.com/akashgosain',
    portfolio: 'akashgosain.dev',
    summary: 'Pre-final year Computer Science student at Silicon Institute of Technology. Specializing in Full Stack Development and Cloud Architecture. Smart India Hackathon finalist with strong problem-solving skills and passion for scalable systems.'
  },
  education: [
    {
      id: 'e1',
      institution: 'Silicon Institute of Technology, Bhubaneswar',
      degree: 'B.Tech in Computer Science & Engineering',
      startDate: 'Aug 2023',
      endDate: 'July 2027',
      grade: '8.86 CGPA (Current)'
    },
    {
      id: 'e2',
      institution: 'Kendriya Vidyalaya, No.1 BBSR',
      degree: 'Class XII (CBSE)',
      startDate: '2021',
      endDate: '2023',
      grade: '94.2%'
    }
  ],
  experience: [
    {
      id: 'ex1',
      company: 'TCS iON',
      role: 'Web Development Intern',
      location: 'Remote',
      startDate: 'May 2024',
      endDate: 'July 2024',
      description: '• Developed responsive UI components for internal dashboard using React 18 and Tailwind CSS.\n• Reduced page load time by 30% through image optimization and lazy loading strategies.\n• Collaborated with senior engineers to implement role-based access control (RBAC).'
    }
  ],
  internships: [
    {
      id: 'int1',
      company: 'Bharat Intern',
      role: 'Full Stack Intern',
      location: 'Online',
      startDate: 'Jan 2024',
      endDate: 'Mar 2024',
      description: '• Built an end-to-end Task Management System using MERN stack with JWT authentication.\n• Integrated Redux Toolkit for efficient global state management.'
    },
    {
      id: 'int2',
      company: 'Internshala Trainings',
      role: 'Core Java Training',
      location: 'Online',
      startDate: 'Dec 2023',
      endDate: 'Jan 2024',
      description: '• Completed intensive training in Core Java, focusing on OOPs, Multithreading, and Collections.\n• Built a Railway Reservation System as a final project.'
    }
  ],
  projects: [
    {
      id: 'p1',
      name: 'Resume DNA Builder',
      description: 'A premium SaaS platform for building ATS-friendly resumes with cinematic UI and instant PDF generation.',
      link: 'github.com/akashgosain/cv-genius',
      technologies: ['React', 'Framer Motion', 'Tailwind', 'Node.js']
    },
    {
      id: 'p2',
      name: 'Lost & Found Geo App',
      description: 'A location-based service for university campuses to report and track lost belongings using Google Maps API.',
      link: 'lostfound-india.vercel.app',
      technologies: ['React Native', 'Firebase', 'MapBox']
    }
  ],
  skillCategories: [
    { id: 's1', category: 'Languages', skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C++'] },
    { id: 's2', category: 'Development', skills: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'] },
    { id: 's3', category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Linux', 'Postman', 'VS Code'] }
  ],
  achievements: [
    'Smart India Hackathon 2024 Finalist - Ministry of Education, Govt. of India',
    'LeetCode Global Rank: Top 4% (Rating 1850+)',
    '1st Prize at SiliconTech Inter-College Coding Competition'
  ],
  certifications: [
    'Google Cloud Certified Associate Cloud Engineer',
    'Meta Front-End Developer Professional Certificate',
    'NPTEL: Data Structures and Algorithms (Elite + Silver)'
  ],
  por: [
    'Technical Head - Google Developer Student Clubs (GDSC) SiliconTech Chapter',
    'Lead Organizer - HackSilicon 2.0 National Level Hackathon'
  ],
  languages: ['English (Fluent)', 'Hindi (Native)', 'Odia (Native)']
};
