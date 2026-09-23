import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="not-found container">
      <SEO title={t('notFound.title')} noindex />
      <span>404</span>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
      <Link className="button primary" to="/">
        <ArrowLeft size={18} />
        {t('notFound.back')}
      </Link>
    </section>
  );
}
