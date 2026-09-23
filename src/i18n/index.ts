import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr/common.json';
import frExperience from './locales/fr/experience.json';
import frProjects from './locales/fr/projects.json';
import en from './locales/en/common.json';
import enExperience from './locales/en/experience.json';
import enProjects from './locales/en/projects.json';
function detectLanguage() {
  try {
    const saved = localStorage.getItem('portfolio-language');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* Storage may be unavailable in private environments. */
  }
  return navigator.language
    ? navigator.language.toLowerCase().startsWith('fr')
      ? 'fr'
      : 'en'
    : 'fr';
}
void i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { common: fr, experience: frExperience, projects: frProjects },
      en: { common: en, experience: enExperience, projects: enProjects },
    },
    lng: detectLanguage(),
    fallbackLng: 'fr',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });
export default i18n;
