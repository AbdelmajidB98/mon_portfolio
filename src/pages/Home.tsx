import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import {
  AboutSection,
  ContactSection,
  EducationTimeline,
  ExperienceTimeline,
  SkillsSection,
} from '../components/Sections';
export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <AboutSection />
      <ExperienceTimeline />
      <Projects />
      <SkillsSection />
      <EducationTimeline />
      <ContactSection />
    </>
  );
}
