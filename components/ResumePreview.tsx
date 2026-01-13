
import React from 'react';
import { ResumeData, TemplateType } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  isPrinting?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, isPrinting = false }) => {
  const { 
    personalInfo, education, experience, internships, projects, 
    skillCategories, achievements, certifications, 
    por, languages, templateId 
  } = data;

  const getTemplateStyles = () => {
    switch (templateId) {
      case TemplateType.EXECUTIVE:
      case TemplateType.CLASSIC:
        return { container: "font-serif text-[#1a1a1a]", accent: "text-[#2c3e50]", border: "border-[#2c3e50]" };
      case TemplateType.TECH_SIDEBAR:
      case TemplateType.CREATIVE_TECH:
        return { container: "font-sans text-gray-900", accent: "text-blue-700", border: "border-blue-700" };
      case TemplateType.IIT_PLACEMENT:
        return { container: "font-sans text-black leading-tight", accent: "text-black", border: "border-black" };
      case TemplateType.ELEGANT:
        return { container: "font-sans text-gray-800", accent: "text-indigo-900", border: "border-indigo-100" };
      case TemplateType.GOVT_BIO:
      case TemplateType.PURE_ATS:
        return { container: "font-sans text-black", accent: "text-black", border: "border-gray-200" };
      default:
        return { container: "font-sans text-gray-900", accent: "text-blue-600", border: "border-blue-600" };
    }
  };

  const styles = getTemplateStyles();

  const SectionHeading = ({ children, customClass = "" }: { children: React.ReactNode, customClass?: string }) => {
    const base = "text-[12px] font-bold uppercase tracking-wider mb-2 pb-0.5 border-b-[1.5px]";
    if (templateId === TemplateType.IIT_PLACEMENT) return <h2 className={`text-[11px] font-bold uppercase border-b border-black mb-1.5 mt-2 ${customClass}`}>{children}</h2>;
    if (templateId === TemplateType.PURE_ATS || templateId === TemplateType.GOVT_BIO) return <h2 className={`text-[12px] font-bold uppercase border-b border-black mb-2 mt-3 ${customClass}`}>{children}</h2>;
    return <h2 className={`${base} ${styles.border} ${styles.accent} mt-4 ${customClass}`}>{children}</h2>;
  };

  const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="text-[10px] md:text-[10.5px] leading-relaxed mb-0.5 ml-4 list-disc text-gray-800">{children}</li>
  );

  const Header = () => {
    if (templateId === TemplateType.TECH_SIDEBAR) {
      return (
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 leading-none">{personalInfo.fullName}</h1>
            <p className={`${styles.accent} font-bold text-[10px] uppercase tracking-[0.2em] mt-2`}>Software Engineer & Developer</p>
          </div>
          <div className="text-right text-[10px] space-y-0.5 text-gray-500 font-medium">
            <p>{personalInfo.email} | {personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
            <div className="flex justify-end gap-3 text-blue-600 font-bold mt-1">
               <span>{personalInfo.linkedin}</span>
               <span>{personalInfo.github}</span>
            </div>
          </div>
        </div>
      );
    }
    if (templateId === TemplateType.EXECUTIVE || templateId === TemplateType.CLASSIC) {
      return (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-3">{personalInfo.fullName}</h1>
          <div className="text-[11px] space-x-3 text-gray-600 font-medium italic">
            <span>{personalInfo.location}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.email}</span>
          </div>
          <div className="mt-3 text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400">
            {personalInfo.linkedin} | {personalInfo.github} | {personalInfo.portfolio}
          </div>
        </div>
      );
    }
    return (
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-1">{personalInfo.fullName}</h1>
        <div className="text-[10.5px] flex justify-center flex-wrap gap-x-4 gap-y-1 text-gray-600 font-medium">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
        <div className="flex justify-center gap-4 mt-2 text-[10px] font-bold text-blue-800">
          {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>Portfolio: {personalInfo.portfolio}</span>}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    // Shared components for main content sections
    const ExperienceBlock = ({ items, title }: { items: any[], title: string }) => items.length > 0 ? (
      <section>
        <SectionHeading>{title}</SectionHeading>
        {items.map(exp => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-baseline font-bold text-[11px]">
              <span>{exp.role}</span>
              <span className="text-gray-500 font-normal text-[10px]">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className={`${styles.accent} text-[10.5px] font-bold mb-1 italic`}>{exp.company} {exp.location && `| ${exp.location}`}</div>
            <ul className="space-y-0.5">
              {exp.description.split('\n').map((line: string, i: number) => (
                line.trim() && <ListItem key={i}>{line.replace(/^[•\-\*]\s*/, '')}</ListItem>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null;

    if (templateId === TemplateType.TECH_SIDEBAR || templateId === TemplateType.CREATIVE_TECH) {
      return (
        <div className="grid grid-cols-[1.6fr_1fr] gap-8">
          <div className="space-y-6">
            <ExperienceBlock title="Work Experience" items={experience} />
            <ExperienceBlock title="Internships" items={internships} />
            {projects.length > 0 && (
              <section>
                <SectionHeading>Technical Projects</SectionHeading>
                {projects.map(proj => (
                  <div key={proj.id} className="mb-4">
                    <div className="flex justify-between items-baseline font-bold text-[11px]">
                      <span className="text-blue-700">{proj.name}</span>
                      <span className="text-[9px] font-normal text-gray-400 italic underline">{proj.link}</span>
                    </div>
                    <p className="text-[10px] text-gray-600 leading-relaxed my-1">{proj.description}</p>
                    <p className="text-[9px] font-bold text-gray-500">
                      <span className="uppercase text-[8px] tracking-wider mr-1">Stack:</span> 
                      {proj.technologies.join(', ')}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>
          <div className="space-y-6">
            <section>
              <SectionHeading>Technical Skills</SectionHeading>
              {skillCategories.map(cat => (
                <div key={cat.id} className="mb-3 text-[10.5px]">
                  <span className="font-bold uppercase text-[9px] text-gray-400 block mb-0.5">{cat.category}</span>
                  <p className="leading-tight text-gray-700">{cat.skills.join(', ')}</p>
                </div>
              ))}
            </section>
            <section>
              <SectionHeading>Education</SectionHeading>
              {education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <p className="font-bold text-[11px] leading-tight">{edu.institution}</p>
                  <p className="text-[10px] text-gray-600 italic">{edu.degree}</p>
                  <div className="flex justify-between items-center text-[9.5px] mt-0.5">
                    <span className="text-gray-400">{edu.startDate} - {edu.endDate}</span>
                    <span className="font-bold bg-gray-50 px-1 rounded">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </section>
            {(achievements.length > 0 || por.length > 0) && (
              <section>
                <SectionHeading>Highlights</SectionHeading>
                <ul className="space-y-1.5">
                  {achievements.slice(0, 3).map((item, i) => <ListItem key={`ach-${i}`}>{item}</ListItem>)}
                  {por.slice(0, 2).map((item, i) => <ListItem key={`por-${i}`}>{item}</ListItem>)}
                </ul>
              </section>
            )}
            {languages.length > 0 && (
              <section>
                <SectionHeading>Languages</SectionHeading>
                <p className="text-[10px] font-medium text-gray-600 italic">{languages.join(' • ')}</p>
              </section>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {personalInfo.summary && (
          <section>
            <SectionHeading>Professional Summary</SectionHeading>
            <p className="text-[10.5px] leading-relaxed text-justify text-gray-800">{personalInfo.summary}</p>
          </section>
        )}

        <ExperienceBlock title="Professional Experience" items={experience} />
        <ExperienceBlock title="Internships" items={internships} />

        {projects.length > 0 && (
          <section>
            <SectionHeading>Selected Projects</SectionHeading>
            {projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline font-bold text-[11px]">
                  <span>{proj.name} <span className="font-normal text-[9px] text-gray-400 ml-2">[{proj.technologies.join(', ')}]</span></span>
                  <span className="text-[9px] font-normal text-blue-600 italic">{proj.link}</span>
                </div>
                <p className="text-[10px] text-gray-700 leading-tight mt-0.5">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-2">
          <section>
            <SectionHeading customClass="mt-0">Education</SectionHeading>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between font-bold text-[10.5px]">
                  <span>{edu.institution}</span>
                  <span className="text-gray-500 font-normal text-[9.5px]">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="flex justify-between text-[10px] italic">
                  <span>{edu.degree}</span>
                  <span className="font-bold not-italic">{edu.grade}</span>
                </div>
              </div>
            ))}
          </section>
          <section>
            <SectionHeading customClass="mt-0">Technical Skills</SectionHeading>
            {skillCategories.map(cat => (
              <div key={cat.id} className="text-[10.5px] mb-1.5">
                <span className="font-bold text-gray-600 text-[9px] uppercase tracking-tighter mr-2">{cat.category}:</span>
                <span className="text-gray-800">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </section>
        </div>

        {(achievements.length > 0 || por.length > 0 || certifications.length > 0) && (
          <div className="grid grid-cols-2 gap-x-12">
            <section>
              <SectionHeading>Achievements & POR</SectionHeading>
              <ul className="space-y-1">
                {achievements.map((item, i) => <ListItem key={`ach-${i}`}>{item}</ListItem>)}
                {por.map((item, i) => <ListItem key={`por-${i}`}>{item}</ListItem>)}
              </ul>
            </section>
            <section>
              <SectionHeading>Certifications & More</SectionHeading>
              <ul className="space-y-1">
                {certifications.map((item, i) => <ListItem key={`cert-${i}`}>{item}</ListItem>)}
                {languages.length > 0 && (
                  <li className="text-[10px] ml-4 font-bold text-gray-500 italic mt-2">
                    Languages: <span className="font-normal not-italic text-gray-800">{languages.join(', ')}</span>
                  </li>
                )}
              </ul>
            </section>
          </div>
        )}
      </div>
    );
  };

  return (
    <div id={isPrinting ? "print-root" : "resume-root"} 
      className={`bg-white text-black w-full max-w-[800px] mx-auto p-12 md:p-14 shadow-2xl min-h-[1100px] relative ${styles.container} ${isPrinting ? 'print:shadow-none' : ''}`}>
      <Header />
      {renderContent()}
      
      {/* Visual A4 divider (only visible in editor) */}
      {!isPrinting && (
        <div className="absolute top-[1050px] left-0 w-full h-px border-t border-dashed border-red-200 pointer-events-none no-print">
          <span className="absolute right-2 top-[-10px] text-[8px] text-red-300 font-bold uppercase">End of Page 1</span>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
