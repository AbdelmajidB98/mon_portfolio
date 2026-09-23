import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Menu, X, ArrowUp } from 'lucide-react';
const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  return (
    <div className="language-switch" role="group" aria-label={t('language')}>
      {['fr', 'en'].map((lang) => (
        <button
          key={lang}
          lang={lang}
          aria-pressed={i18n.language === lang}
          onClick={() => {
            void i18n.changeLanguage(lang);
            try {
              localStorage.setItem('portfolio-language', lang);
            } catch {
              /* Language still changes without storage. */
            }
          }}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
export function CVLink() {
  const { t } = useTranslation();
  return __HAS_CV__ ? (
    <a className="cv-link" href="/cv/Abdelmajid-Bouchoucha-CV.pdf" download>
      <Download size={15} />
      {t('cv')}
    </a>
  ) : (
    <span className="cv-unavailable" title={t('cvMissing')}>
      <Download size={14} />
      {t('cvMissing')}
    </span>
  );
}
export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (location.pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-15% 0px -65% 0px' },
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('main section[id]').forEach((el) => observer.observe(el));
    }, 150);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/#home" className="brand" aria-label="Abdelmajid Bouchoucha">
          ABDELMAJID<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label={t('menu')}>
          {sections.map((id) => (
            <Link
              key={id}
              to={`/#${id}`}
              className={location.pathname === '/' && active === id ? 'active' : ''}
              aria-current={location.pathname === '/' && active === id ? 'location' : undefined}
            >
              {t(`nav.${id}`)}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher />
          <div className="desktop-cv">
            <CVLink />
          </div>
          <button
            ref={toggle}
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={t(open ? 'close' : 'menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            aria-label={t('menu')}
          >
            {sections.map((id) => (
              <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)}>
                {t(`nav.${id}`)}
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <div className="mobile-extras">
              <LanguageSwitcher />
              <CVLink />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
export function SocialLinks() {
  const { t } = useTranslation();
  return (
    <div className="social-links">
      <a href="https://github.com/AbdelmajidB98" target="_blank" rel="noreferrer">
        <Github size={17} />
        GitHub
        <ArrowUpRight size={13} />
      </a>
      <a href="https://www.linkedin.com/in/abdelmajid-bouchoucha" target="_blank" rel="noreferrer">
        <Linkedin size={17} />
        LinkedIn
        <ArrowUpRight size={13} />
      </a>
      <a href="mailto:bouchouchaabdelmajid45@gmail.com" aria-label={t('contact.email')}>
        Email
        <ArrowUpRight size={13} />
      </a>
    </div>
  );
}
export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="container footer">
      <div>
        <Link className="brand" to="/#home">
          ABDELMAJID<span>.</span>
        </Link>
        <p>Abdelmajid Bouchoucha · {t('role')}</p>
        <small>React · PHP · Laravel · Symfony</small>
      </div>
      <div>
        <SocialLinks />
        <p>
          © {new Date().getFullYear()} · {t('footer')}
        </p>
      </div>
      <Link className="back-top" to="/#home" aria-label={t('backTop')}>
        <ArrowUp size={18} />
      </Link>
    </footer>
  );
}
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      let attempts = 0;
      const timer = setInterval(() => {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'instant'
              : 'smooth',
          });
          clearInterval(timer);
        } else if (++attempts > 30) clearInterval(timer);
      }, 50);
      return () => clearInterval(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
