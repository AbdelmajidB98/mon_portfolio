import {
  ArrowDown,
  ArrowRight,
  Atom,
  Braces,
  Database,
  MapPin,
  Server,
  Workflow,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SocialLinks } from './layout';
import { TechStack } from './ui';
export function TechOrbit() {
  const { t } = useTranslation();
  return (
    <div
      className="orbit-wrap"
      role="img"
      aria-label={`React, TypeScript, PHP, Symfony, Laravel, REST API, SQL, ERP / CRM. ${t('hero.ecosystem')}`}
    >
      <div className="orbit-grid" />
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
      <svg className="orbit-lines" viewBox="0 0 500 460" aria-hidden="true">
        <path d="M250 230 L250 62 M250 230 L83 159 M250 230 L417 159 M250 230 L107 335 M250 230 L393 335 M250 230 L250 410" />
      </svg>
      <div className="orbit-center">
        <Braces size={29} />
        <strong>Full-Stack</strong>
        <small>ERP / CRM / SaaS</small>
      </div>
      <div className="orbit-node node-react">
        <Atom />
        <strong>React</strong>
        <small>TypeScript</small>
      </div>
      <div className="orbit-node node-php">
        <span className="php-logo">php</span>
        <strong>PHP</strong>
        <small>{t('hero.backend')}</small>
      </div>
      <div className="orbit-node node-laravel">
        <Braces />
        <strong>Laravel</strong>
        <small>{t('hero.frontend')}</small>
      </div>
      <div className="orbit-node node-symfony">
        <span className="sf-logo">sf</span>
        <strong>Symfony</strong>
        <small>Backend</small>
      </div>
      <div className="orbit-node node-api">
        <Workflow />
        <strong>REST API</strong>
        <small>JSON · JWT</small>
      </div>
      <div className="orbit-node node-sql">
        <Database />
        <strong>SQL</strong>
        <small>{t('hero.database')}</small>
      </div>
      <span className="orbit-caption">{t('hero.ecosystem')}</span>
    </div>
  );
}
export default function Hero() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <section className="hero container" id="home">
        <div className="hero-copy">
          <div className="availability">
            <span />
            {t('available')}
          </div>
          <p className="hero-name">{t('hero.name')}</p>
          <h1>
            {i18n.language === 'fr' ? (
              <>
                {t('hero.first')}
                <br />
                <span>{t('hero.second')}</span>
              </>
            ) : (
              <>
                <span>Full-Stack</span>
                <br />
                Developer.
              </>
            )}
          </h1>
          <p className="hero-statement">{t('hero.statement')}</p>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-buttons">
            <a className="button primary" href="#projects">
              {t('hero.projects')}
              <ArrowUpRightIcon />
            </a>
            <a className="button secondary" href="#experience">
              {t('hero.experience')}
              <ArrowDown size={16} />
            </a>
          </div>
          <SocialLinks />
          <div className="hero-location">
            <MapPin size={14} />
            {t('location')}
            <span>·</span>
            {t('mobility')}
          </div>
        </div>
        <TechOrbit />
      </section>
      <div className="hero-tech container">
        <span>React.js</span>
        <span>TypeScript</span>
        <span>PHP</span>
        <span>Laravel</span>
        <span>Symfony</span>
        <span>Node.js</span>
        <span>ERP / CRM</span>
        <span>REST API</span>
      </div>
      <RecruiterSnapshot />
    </>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={17} />;
}
function RecruiterSnapshot() {
  const { t } = useTranslation();
  return (
    <section className="snapshot">
      <div className="container snapshot-grid">
        {[
          { id: 'stack', value: 'React · PHP · Laravel · Symfony', icon: Braces },
          { id: 'expertise', value: 'ERP · CRM · SaaS · REST API', icon: Workflow },
          { id: 'also', value: 'Angular · Node.js · Express.js', icon: Server },
          { id: 'database', value: 'MySQL · MariaDB · MongoDB', icon: Database },
        ].map(({ id, value, icon: Icon }) => (
          <div key={id}>
            <Icon size={22} />
            <div>
              <span>{t(`snapshot.${id}`)}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function HeroTechStack() {
  return <TechStack items={['React', 'PHP', 'Laravel', 'Symfony']} />;
}
