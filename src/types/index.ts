export type ProjectCategory = 'professional' | 'freelance' | 'academic';
export type ProjectOrganization =
  | 'NEXTIRA'
  | 'Millesima Technologies / MyVioo'
  | 'Social Media Conseils'
  | 'ITEAM UNIVERSITY'
  | 'CrocoCoder'
  | 'freelance';
export interface Project {
  slug: string;
  category: ProjectCategory;
  organization: ProjectOrganization;
  periodSort: number;
  technologies: string[];
  featured?: boolean;
  visual: 'dashboard' | 'api' | 'fleet' | 'documents' | 'wedding' | 'students' | 'courses' | 'bank';
  color: string;
  image?: string;
  github?: string;
  demo?: string;
  publicWebsite?: string;
  methodology?: string;
}
export interface Experience {
  id: string;
  company: string;
  technologies: string[];
}
