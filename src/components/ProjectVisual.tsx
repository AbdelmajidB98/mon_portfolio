import {
  Blocks,
  Car,
  Code2,
  Database,
  FileText,
  GraduationCap,
  Heart,
  Layers,
  Network,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../types';
export default function ProjectVisual({ project }: { project: Project }) {
  const { t } = useTranslation();
  const Icon = {
    dashboard: Layers,
    api: Network,
    fleet: Car,
    documents: FileText,
    wedding: Heart,
    students: Users,
    courses: GraduationCap,
    bank: Database,
  }[project.visual];
  return (
    <div className={`project-visual ${project.color}`} aria-hidden="true">
      {project.image ? (
        <img src={project.image} alt="" loading="lazy" />
      ) : project.visual === 'wedding' ? (
        <div className="wedding-preview">
          <div className="wedding-line" />
          <small>06 · 09 · 26</small>
          <span>
            NOUR <i>×</i>
            <br />
            HASSENE
          </span>
          <Heart size={17} />
          <small>GAMMARTH · 20:30</small>
          <div className="wedding-line" />
        </div>
      ) : project.visual === 'api' || project.visual === 'students' ? (
        <div className="api-preview">
          <div className="api-top">
            <Code2 size={18} />
            <span>{project.visual === 'api' ? 'MyVioo API' : 'ITEAM'}</span>
            <span className="mini-dots">•••</span>
          </div>
          <div className="api-flow">
            <span>
              <Users /> {project.visual === 'api' ? 'JWT' : 'React'}
            </span>
            <i />
            <strong>
              <Icon />
              {project.visual === 'api' ? 'Symfony' : 'PHP'}
            </strong>
            <i />
            <span>
              <Database />
              {project.visual === 'api' ? 'Doctrine' : 'MySQL'}
            </span>
          </div>
          <div className="code-lines">
            <span>
              GET <b>{project.visual === 'api' ? '/api/v1/community' : '/projects'}</b>
            </span>
            <span>
              REST API <b>· JSON</b>
            </span>
          </div>
        </div>
      ) : (
        <div className="dashboard-preview">
          <div className="mini-toolbar">
            <span className="mini-dots">● ● ●</span>
            <span>
              {project.slug === 'apa-pieces-auto'
                ? 'APA'
                : project.slug === 'bybuy'
                  ? 'ByBuy'
                  : project.slug === 'fleet'
                    ? 'Fleet'
                    : project.visual === 'documents'
                      ? 'DMS'
                      : project.visual === 'bank'
                        ? 'Python · Tkinter'
                        : project.slug.startsWith('iteam')
                          ? 'ITEAM'
                          : project.slug === 'digital-prospecting'
                            ? 'CRM'
                            : 'CrocoCoder'}
            </span>
            <Blocks size={11} />
          </div>
          <div className="mini-body">
            <div className="mini-sidebar">
              <Icon size={19} />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="mini-content">
              <div className="mini-heading">
                <strong>{t(`projects:${project.slug}.title`)}</strong>
                <span>+</span>
              </div>
              <div className="mini-metrics">
                <div>
                  <Icon />
                  <i />
                </div>
                <div>
                  <Users />
                  <i />
                </div>
                <div>
                  <Layers />
                  <i />
                </div>
              </div>
              {project.visual === 'fleet' ? (
                <div className="car-row">
                  {[0, 1, 2].map((n) => (
                    <div key={n}>
                      <Car />
                      <i />
                      <i />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mini-table">
                  {[0, 1, 2, 3].map((n) => (
                    <div key={n}>
                      <span>
                        {project.visual === 'documents' ? (
                          <FileText size={13} />
                        ) : (
                          <span className="table-square" />
                        )}
                      </span>
                      <i />
                      <i />
                      <b />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
