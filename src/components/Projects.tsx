import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { categoryOrder, orderedProjects, organizationOrder } from '../data/projects';
import type { Project, ProjectCategory } from '../types';
import { AnimatedSection, SectionHeader, TechStack } from './ui';
import ProjectVisual from './ProjectVisual';
export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  return (
    <article className={`project-card ${project.featured ? '' : 'project-card-small'}`}>
      <div className="project-image-link">
        <ProjectVisual project={project} />
      </div>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{t(`projects:${project.slug}.period`)}</span>
          <span>{t(`projects:${project.slug}.subtitle`)}</span>
        </div>
        <h4>
          <Link to={`/projects/${project.slug}`}>{t(`projects:${project.slug}.title`)}</Link>
        </h4>
        <p>{t(`projects:${project.slug}.description`)}</p>
        <TechStack items={project.technologies.slice(0, 4)} />
        {project.methodology && (
          <span className="project-methodology">
            {t('projects.methodology')} · {project.methodology} · Sprint Backlog
          </span>
        )}
        <Link
          className="project-link"
          to={`/projects/${project.slug}`}
          aria-label={`${t('projects.view')} — ${t(`projects:${project.slug}.title`)}`}
        >
          {t('projects.view')}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ProjectCategory | null>(null);
  const reduce = useReducedMotion();
  const filtered = orderedProjects.filter((p) => filter === null || p.category === filter);
  const groups = categoryOrder
    .map((category: ProjectCategory) => ({
      category,
      items: filtered.filter((project) => project.category === category),
    }))
    .filter((group) => group.items.length > 0);
  return (
    <AnimatedSection className="projects-section section-space" id="projects">
      <div className="container">
        <SectionHeader
          label={t('projects.label')}
          title={t('projects.title')}
          description={t('projects.intro')}
        />
        <div className="project-filters" role="group" aria-label={t('nav.projects')}>
          {categoryOrder.map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter((current) => (current === category ? null : category))}
            >
              {t(`projects.${category}`)}
            </button>
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          {filtered.length} {t('projects.count')}
        </span>
        {groups.map((group) => (
          <section
            className="project-category-group"
            key={group.category}
            aria-label={t(`projects.${group.category}`)}
          >
            <div className="gallery-caption">
              <h3>{t(`projects.${group.category}`)}</h3>
              <span>
                {group.items.length} {t('projects.count')}
              </span>
            </div>
            {organizationOrder[group.category].map((organization) => {
              const items = group.items.filter((project) => project.organization === organization);
              if (!items.length) return null;
              return (
                <div className="project-organization" key={organization}>
                  {group.category !== 'freelance' && (
                    <p className="organization-title">{organization}</p>
                  )}
                  <motion.div className="project-grid" layout={!reduce}>
                    {items.map((project) => (
                      <motion.div
                        layout={!reduce}
                        key={project.slug}
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </section>
        ))}
        <p className="illustration-note">{t('projects.illustration')}</p>
      </div>
    </AnimatedSection>
  );
}
