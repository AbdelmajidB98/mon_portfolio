import type { Project, ProjectCategory, ProjectOrganization } from '../types';
export const categoryOrder: ProjectCategory[] = ['professional', 'freelance', 'academic'];
export const organizationOrder: Record<ProjectCategory, ProjectOrganization[]> = {
  professional: ['NEXTIRA', 'Millesima Technologies / MyVioo', 'Social Media Conseils'],
  freelance: ['freelance'],
  academic: ['ITEAM UNIVERSITY', 'CrocoCoder'],
};
export const projects: Project[] = [
  {
    slug: 'apa-pieces-auto',
    category: 'professional',
    organization: 'NEXTIRA',
    periodSort: 202608,
    technologies: ['React.js', 'PHP', 'Dolibarr ERP/CRM', 'REST API', 'JSON'],
    featured: true,
    visual: 'dashboard',
    color: 'blue',
  },
  {
    slug: 'myvioo',
    category: 'professional',
    organization: 'Millesima Technologies / MyVioo',
    periodSort: 202507,
    technologies: ['Symfony 6.4', 'PHP 8.2', 'Doctrine ORM', 'JWT', 'Docker'],
    featured: true,
    visual: 'api',
    color: 'purple',
  },
  {
    slug: 'bybuy',
    category: 'professional',
    organization: 'NEXTIRA',
    periodSort: 202608,
    technologies: ['React.js', 'PHP', 'Dolibarr ERP/CRM', 'MySQL'],
    featured: true,
    visual: 'dashboard',
    color: 'cyan',
    publicWebsite: 'https://by-buy.net/',
  },
  {
    slug: 'fleet',
    category: 'professional',
    organization: 'NEXTIRA',
    periodSort: 202608,
    technologies: ['Laravel', 'PHP', 'Blade', 'Livewire', 'MySQL'],
    featured: true,
    visual: 'fleet',
    color: 'orange',
  },
  {
    slug: 'civil-engineering-dms',
    category: 'freelance',
    organization: 'freelance',
    periodSort: 202500,
    technologies: ['React', 'NestJS', 'SQL', 'REST API'],
    featured: true,
    visual: 'documents',
    color: 'blue',
  },
  {
    slug: 'wedding-invitation',
    category: 'freelance',
    organization: 'freelance',
    periodSort: 202608,
    technologies: ['React', 'TypeScript', 'Vite', 'GSAP'],
    featured: true,
    visual: 'wedding',
    color: 'rose',
  },
  {
    slug: 'digital-prospecting',
    category: 'professional',
    organization: 'Social Media Conseils',
    periodSort: 202309,
    technologies: [
      'Angular',
      'Node.js',
      'Express.js',
      'REST API',
      'Data Miner',
      'Dux-Soup',
      'PhantomBuster',
    ],
    visual: 'dashboard',
    color: 'cyan',
  },
  {
    slug: 'iteam-freelance-connect',
    category: 'academic',
    organization: 'ITEAM UNIVERSITY',
    periodSort: 202406,
    methodology: 'Scrum',
    technologies: ['React', 'PHP', 'MySQL'],
    visual: 'students',
    color: 'purple',
  },
  {
    slug: 'iteam-elearning',
    category: 'academic',
    organization: 'ITEAM UNIVERSITY',
    periodSort: 202401,
    technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
    visual: 'courses',
    color: 'blue',
  },
  {
    slug: 'bank-management',
    category: 'academic',
    organization: 'ITEAM UNIVERSITY',
    periodSort: 202306,
    technologies: ['Python', 'Tkinter'],
    visual: 'bank',
    color: 'cyan',
  },
  ...(
    ['training-fleet', 'auto-ecommerce', 'doctor-appointments', 'training-management'] as const
  ).map((slug): Project => ({
    slug,
    category: 'academic',
    organization: 'CrocoCoder',
    periodSort: 202202,
    technologies: ['Angular', 'Node.js', 'Express.js', 'MongoDB'],
    visual: slug === 'training-fleet' ? 'fleet' : 'dashboard',
    color: 'blue',
  })),
];
export const orderedProjects = [...projects].sort(
  (a, b) =>
    categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
    organizationOrder[a.category].indexOf(a.organization) -
      organizationOrder[b.category].indexOf(b.organization) ||
    b.periodSort - a.periodSort,
);
