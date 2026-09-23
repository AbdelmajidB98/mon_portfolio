import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, LockKeyhole } from 'lucide-react';
import { orderedProjects, projects } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';
import SEO from '../components/SEO';
import { TechStack } from '../components/ui';
import NotFound from './NotFound';
export default function ProjectDetails() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const key = `projects:${project.slug}`;
  const next = orderedProjects[(orderedProjects.indexOf(project) + 1) % orderedProjects.length];
  const items = (name: string) => t(`${key}.${name}`, { returnObjects: true }) as string[];
  return (
    <article className="project-detail container">
      <SEO title={t(`${key}.title`)} description={t(`${key}.description`)} />
      <Link className="text-link" to="/#projects">
        <ArrowLeft size={16} />
        {t('projects.back')}
      </Link>
      <header className="detail-header">
        <span className="section-label">
          {t(`projects.${project.category}`)} · {t(`${key}.subtitle`)}
        </span>
        <h1>{t(`${key}.title`)}</h1>
        <p className="detail-period">
          {project.organization !== 'freelance' && `${project.organization} · `}
          {t(`${key}.period`)}
        </p>
        <p>{t(`${key}.description`)}</p>
        {project.methodology && (
          <p className="detail-methodology">
            {t('projects.methodology')} · {project.methodology} · Sprint Backlog
          </p>
        )}
        <TechStack items={project.technologies} />
        {project.category === 'professional' && (
          <span className="private-note">
            <LockKeyhole size={14} />
            {t('projects.professionalNote')}
          </span>
        )}
        <div className="detail-external">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Demo
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.publicWebsite && (
            <a href={project.publicWebsite} target="_blank" rel="noopener noreferrer">
              {t('projects.publicSite')}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
        {project.publicWebsite && (
          <p className="public-site-note">{t('projects.publicSiteNote')}</p>
        )}
      </header>
      <figure className="detail-visual">
        <ProjectVisual project={project} />
        <figcaption>{t('projects.illustration')}</figcaption>
      </figure>
      <div className="detail-story">
        <div className="detail-main">
          {['context', 'problem', 'solution', 'role'].map((part) => (
            <section key={part}>
              <h2>{t(`projects.${part}`)}</h2>
              <p>{t(`${key}.${part}`)}</p>
            </section>
          ))}
        </div>
        <aside className="detail-sidebar">
          <h2>{t('projects.stack')}</h2>
          <TechStack items={project.technologies} />
          <h2>{t('projects.concepts')}</h2>
          <ul>
            {items('concepts').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
      <section className="architecture-section">
        <h2>{t('projects.architecture')}</h2>
        <div className="architecture-flow">
          {items('architecture').map((item, i) => (
            <div key={item}>
              <span>{item}</span>
              {i < items('architecture').length - 1 && <ArrowRight size={19} aria-hidden="true" />}
            </div>
          ))}
        </div>
        {project.slug === 'myvioo' && (
          <div className="endpoints">
            {items('endpoints').map((item) => (
              <code key={item}>{item}</code>
            ))}
          </div>
        )}
      </section>
      <div className="detail-bottom">
        <section>
          <h2>{t('projects.features')}</h2>
          {t(`${key}.scope`, { defaultValue: '' }) && (
            <p className="scope-note">{t('projects.scope')}</p>
          )}
          <ul className="features-list">
            {items('features').map((item) => (
              <li key={item}>
                <Check size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <div>
          {['challenges', 'learning'].map((part) => (
            <section key={part}>
              <h2>{t(`projects.${part}`)}</h2>
              <p>{t(`${key}.${part}`)}</p>
            </section>
          ))}
        </div>
      </div>
      <nav className="project-bottom-nav">
        <Link to="/#projects">
          <ArrowLeft size={17} />
          {t('projects.back')}
        </Link>
        <Link to={`/projects/${next.slug}`}>
          <span>
            <small>{t('projects.next')}</small>
            {t(`projects:${next.slug}.title`)}
          </span>
          <ArrowRight size={20} />
        </Link>
      </nav>
    </article>
  );
}
