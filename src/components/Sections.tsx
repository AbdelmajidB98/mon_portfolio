import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  Braces,
  Check,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { experiences } from '../data/experiences';
import { skills } from '../data/skills';
import { education } from '../data/education';
import { AnimatedSection, SectionHeader, TechStack } from './ui';
import { SocialLinks } from './layout';
export function AboutSection() {
  const { t } = useTranslation();
  return (
    <AnimatedSection id="about" className="container section-space">
      <div className="about-grid">
        <SectionHeader label={t('about.label')} title={t('about.title')} />
        <div className="about-copy">
          {(t('about.paragraphs', { returnObjects: true }) as string[]).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="about-pillars">
        {[Braces, Workflow, Sparkles].map((Icon, i) => (
          <div key={i}>
            <span className="pillar-index">0{i + 1}</span>
            <Icon size={23} />
            <h3>{t(`about.cards.${i}`)}</h3>
            <p>{t(`about.sub.${i}`)}</p>
          </div>
        ))}
      </div>
      <div className="highlights">
        {(t('highlights', { returnObjects: true }) as string[]).map((item) => (
          <span key={item}>
            <Check size={16} />
            {item}
          </span>
        ))}
      </div>
    </AnimatedSection>
  );
}
export function ExperienceTimeline() {
  const { t } = useTranslation();
  return (
    <AnimatedSection id="experience" className="experience-section section-space">
      <div className="container">
        <SectionHeader
          label={t('experience.label')}
          title={t('experience.title')}
          description={t('experience.intro')}
        />
        <div className="timeline">
          {experiences.map((exp, i) => (
            <article className="experience-row" key={exp.id}>
              <div className="experience-date">
                <span className="timeline-dot" />
                <span>{t(`experience:${exp.id}.period`)}</span>
                <strong>{exp.company}</strong>
              </div>
              <div className="experience-content">
                <h3>{t(`experience:${exp.id}.role`)}</h3>
                <p>{t(`experience:${exp.id}.summary`)}</p>
                <details open={i === 0 || undefined}>
                  <summary>{t('experience.more')}</summary>
                  <ul>
                    {(t(`experience:${exp.id}.items`, { returnObjects: true }) as string[]).map(
                      (item) => (
                        <li key={item}>{item}</li>
                      ),
                    )}
                  </ul>
                </details>
                <TechStack items={exp.technologies} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
export function SkillsSection() {
  const { t } = useTranslation();
  return (
    <AnimatedSection id="skills" className="container section-space">
      <SectionHeader
        label={t('skills.label')}
        title={t('skills.title')}
        description={t('skills.intro')}
      />
      <div className="skills-grid">
        {skills.map((category, i) => (
          <article key={category.id} className="skill-category">
            <span className="skill-number">0{i + 1}</span>
            <h3>{t(`skills.${category.id}`)}</h3>
            <TechStack
              items={[...category.tech, ...category.terms.map((term) => t(`terms.${term}`))]}
            />
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
export function EducationTimeline() {
  const { t } = useTranslation();
  return (
    <AnimatedSection id="education" className="education-section section-space">
      <div className="container">
        <SectionHeader label={t('education.label')} title={t('education.title')} />
        <div className="education-grid">
          <div>
            {education.map((item) => (
              <article className="education-item" key={item.id}>
                <div className="education-icon">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <div className="education-meta">
                    <strong>{item.school}</strong>
                    <span>{item.period}</span>
                  </div>
                  <h3>{t(`education.${item.id}.title`)}</h3>
                  <p>{t(`education.${item.id}.description`)}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="languages">
            <h3>{t('languages.title')}</h3>
            {[
              { name: 'arabic', level: 'native', code: 'AR' },
              { name: 'french', level: 'professional', code: 'FR' },
              { name: 'english', level: 'working', code: 'EN' },
            ].map((l) => (
              <div className="language-row" key={l.code}>
                <span>{l.code}</span>
                <div>
                  <strong>{t(`languages.${l.name}`)}</strong>
                  <p>{t(`languages.${l.level}`)}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </AnimatedSection>
  );
}
export function VisionSection() {
  const { t } = useTranslation();
  return (
    <AnimatedSection id="vision" className="container section-space vision-section">
      <SectionHeader
        label={t('vision.label')}
        title={t('vision.title')}
        description={t('vision.intro')}
      />
      <div className="vision-grid">
        <article className="vision-card vision-web">
          <div className="vision-card-top">
            <Braces size={22} aria-hidden="true" />
            <span>{t('vision.web.eyebrow')}</span>
          </div>
          <h3>{t('vision.web.title')}</h3>
          <p>{t('vision.web.description')}</p>
          <a className="vision-cta" href="mailto:bouchouchaabdelmajid45@gmail.com">
            {t('vision.web.cta')}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </article>
        <article className="vision-card vision-odoo">
          <div className="vision-card-top">
            <Workflow size={22} aria-hidden="true" />
            <span>{t('vision.odoo.eyebrow')}</span>
          </div>
          <h3>{t('vision.odoo.title')}</h3>
          <p>{t('vision.odoo.description')}</p>
        </article>
      </div>
    </AnimatedSection>
  );
}
export function ContactSection() {
  const { t } = useTranslation();
  return (
    <AnimatedSection id="contact" className="container contact-section">
      <div className="contact-panel">
        <div>
          <span className="section-label">{t('contact.label')}</span>
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.description')}</p>
          <a href="mailto:bouchouchaabdelmajid45@gmail.com" className="button primary">
            {t('contact.button')}
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="contact-info">
          <div className="contact-art" aria-hidden="true">
            <ArrowUpRight />
          </div>
          <a className="email-link" href="mailto:bouchouchaabdelmajid45@gmail.com">
            <Mail size={18} />
            <span>bouchouchaabdelmajid45@gmail.com</span>
          </a>
          <p>
            <MapPin size={16} />
            {t('location')}
          </p>
          <SocialLinks />
          <div className="availability">
            <span />
            {t('available')}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
