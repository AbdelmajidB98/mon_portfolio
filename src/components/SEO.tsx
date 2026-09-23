import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
export default function SEO({
  title,
  description,
  noindex = false,
}: {
  title?: string;
  description?: string;
  noindex?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    const pageTitle = title ? `${title} | Abdelmajid Bouchoucha` : t('seo.title');
    const desc = description || t('seo.description');
    document.title = pageTitle;
    const meta = (key: string, value: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };
    meta('description', desc);
    meta('og:title', pageTitle, true);
    meta('og:description', desc, true);
    meta('og:type', 'website', true);
    meta('og:locale', i18n.language === 'fr' ? 'fr_FR' : 'en_US', true);
    meta('twitter:card', 'summary');
    meta('twitter:title', pageTitle);
    meta('twitter:description', desc);
    meta('robots', noindex ? 'noindex,follow' : 'index,follow');
    const base = import.meta.env.VITE_SITE_URL;
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (base && !base.includes('.example')) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = new URL(pathname, base).href;
      meta('og:url', canonical.href, true);
    } else {
      canonical?.remove();
    }
  }, [t, i18n.language, title, description, pathname, noindex]);
  return null;
}
