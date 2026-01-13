
export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ResumeData {
  id: string;
  title: string;
  templateId: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  internships: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  achievements: string[];
  certifications: string[];
  por: string[];
  languages: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum TemplateType {
  MODERN = 'modern',
  EXECUTIVE = 'executive',
  IIT_PLACEMENT = 'iit_placement',
  TECH_SIDEBAR = 'tech_sidebar',
  ELEGANT = 'elegant',
  PURE_ATS = 'pure_ats',
  CLASSIC = 'classic',
  CREATIVE_TECH = 'creative_tech',
  GOVT_BIO = 'govt_bio'
}
