import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Footer, Navbar, ScrollToTop } from './components/layout';
import Home from './pages/Home';
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));
export default function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">
          {t('skip')}
        </a>
        <Navbar />
        <ScrollToTop />
        <main id="main" tabIndex={-1}>
          <Suspense
            fallback={
              <div className="loading" role="status">
                {t('loading')}
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </MotionConfig>
    </BrowserRouter>
  );
}
