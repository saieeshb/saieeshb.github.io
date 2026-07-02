// ---------------------------------------------------------------------------
// Portfolio content. Edit this file to update the site — everything on the page
// is rendered from the data below.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Saieesh Bairam',
  title: 'Medical Student & Clinical Researcher',
  location: 'Hyderabad, India',
  email: 'hi@saieesh.dev',
  tagline:
    'MBBS candidate at Osmania Medical College focused on evidence synthesis and clinical research.',
  intro:
    "I'm an MBBS candidate at Osmania Medical College in Hyderabad with a strong interest in evidence-based medicine and clinical research. My work spans systematic reviews and meta-analyses, cross-sectional studies, and peer-reviewed case reports across neurology, surgery, and public health — complemented by editorial and peer-review roles for international medical journals.",
  // Optional social/profile links. Leave a value empty ('') to hide the link.
  links: {
    email: 'mailto:hi@saieesh.dev',
    linkedin: 'https://www.linkedin.com/in/saieeshb/',
    github: 'https://github.com/saieeshb',
    orcid: 'https://orcid.org/0009-0007-6780-4328',
    ijms: 'https://ijms.info/IJMS/Bairam-Saieesh',
    googleScholar: '',
  },
};

export const stats = [
  { value: '2', label: 'Peer-reviewed publications' },
  { value: '3', label: 'Research projects' },
  { value: '2', label: 'Editorial & review roles' },
  { value: 'ICMR', label: 'STS 2025 grant recipient' },
];

export type ResearchProject = {
  title: string;
  org: string;
  period: string;
  role?: string;
  description: string;
  contributions?: string[];
  tags?: string[];
  status?: 'ongoing' | 'completed';
};

export const research: ResearchProject[] = [
  {
    title:
      'The Impact of Exercise on Psychosocial Well-Being in Medical Students: A Cross-Sectional Study',
    org: 'Indian Council of Medical Research (ICMR)',
    period: 'April 2025 – Present',
    role: 'Short-Term Studentship (STS) 2025 — Grant Recipient',
    description:
      'Awarded an ICMR Short-Term Studentship grant to investigate how exercise relates to psychosocial well-being among medical students through a cross-sectional study design.',
    contributions: [
      'Protocol formation',
      'Manuscript drafting',
      'Data collection',
      'Data extraction & analysis',
    ],
    tags: ['Cross-Sectional Study', 'Public Health', 'ICMR Grant'],
    status: 'ongoing',
  },
  {
    title:
      'Long-Term Oncological & Functional Outcomes of RAMIE vs. Conventional MIE for Esophageal Cancer',
    org: 'Operation MetaMind',
    period: 'May 2025 – Present',
    role: 'Systematic Review & Meta-Analysis',
    description:
      'Assisting a systematic review and meta-analysis comparing Robot-Assisted Minimally Invasive Esophagectomy (RAMIE) with conventional Minimally Invasive Esophagectomy (MIE), evaluating long-term oncological and functional outcomes in esophageal cancer.',
    tags: ['Systematic Review', 'Meta-Analysis', 'Surgical Oncology'],
    status: 'ongoing',
  },
  {
    title:
      'Comparative Efficacy of Non-Pharmacological Interventions for Motor Symptoms in Parkinson’s Disease: A Network Meta-Analysis of RCTs',
    org: 'American Academy of Neurology — Fall Conference 2024',
    period: 'Sept – Oct 2024',
    role: 'Abstract Proposal',
    description:
      'A network meta-analysis of randomized controlled trials assessing the comparative efficacy of non-pharmacological interventions for motor symptoms in Parkinson’s disease, prepared as an abstract proposal for the AAN Fall Conference 2024.',
    contributions: ['Protocol formation', 'Data extraction & analysis'],
    tags: ['Network Meta-Analysis', 'Neurology', 'RCTs'],
    status: 'completed',
  },
];

export type Publication = {
  authors: string;
  year: string;
  title: string;
  journal: string;
  doi: string;
  url: string;
};

export const publications: Publication[] = [
  {
    authors: 'Nadeem A, Haroon Ahmed M, Ilyas T, et al.',
    year: 'October 10, 2024',
    title:
      'An Incidental Finding of Posterior Nutcracker Syndrome: A Case Report',
    journal: 'Cureus 16(10): e71205',
    doi: '10.7759/cureus.71205',
    url: 'https://doi.org/10.7759/cureus.71205',
  },
  {
    authors: 'Oruganti M S, Haroon Ahmed M, Nadeem A, et al.',
    year: 'October 27, 2024',
    title:
      'Takayasu Arteritis Complicated by Superior Mesenteric Artery Stenosis and Bilateral Renal Arteritis: A Clinical Case Report',
    journal: 'Cureus 16(10): e72477',
    doi: '10.7759/cureus.72477',
    url: 'https://doi.org/10.7759/cureus.72477',
  },
];

export const publicationsNote =
  'Contributed to manuscript writing and image generation for the following peer-reviewed publications.';

export type Editorial = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const editorial: Editorial[] = [
  {
    role: 'Student Editor',
    org: 'International Journal of Medical Students (IJMS)',
    period: 'February 2025 – Present',
    description:
      'Editorial work supporting a peer-reviewed journal dedicated to medical student research.',
  },
  {
    role: 'Peer Reviewer',
    org: 'Cureus',
    period: 'October 2024 – Present',
    description:
      'Reviewing submitted manuscripts for scientific quality and clarity as part of the journal’s peer-review process.',
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: 'Deputy Head of Technical Team',
    org: 'OMC C.A.R.E.S.',
    period: 'May 2023 – June 2024',
    location: 'Hyderabad, India',
    points: [
      'OMC C.A.R.E.S. is a community outreach service programme undertaking impactful projects for the betterment of society.',
      'Created and optimized short-form content for social media, increasing engagement and reach by 50% in 6 months and helping recruit over 700 volunteers.',
      'Raised the team’s quality and content standards, and collaborated with the core team on strategic decisions and project planning aligned with the club’s vision.',
    ],
  },
];

export type Project = {
  title: string;
  org: string;
  period: string;
  location: string;
  points: string[];
};

export const projects: Project[] = [
  {
    title: 'Hands-on-Hearts',
    org: 'OMC C.A.R.E.S.',
    period: 'June 2023 – Nov 2023',
    location: 'Hyderabad, India',
    points: [
      'A CPR-training program that trained over 2,000 first-responders across the city.',
      'Produced trailer and recap videos that helped recruit over 700 medical students as volunteers.',
      'Collaborated with organizers, volunteer medicos, and first-responders to ensure training quality and effectiveness.',
    ],
  },
  {
    title: 'A White-Coat Summer',
    org: 'OMC C.A.R.E.S.',
    period: 'May 2023',
    location: 'Hyderabad, India',
    points: [
      'A seven-day summer camp for teens interested in medicine and health, organized by medical college students.',
      'Edited and produced short-form content capturing daily highlights, generating strong community engagement.',
    ],
  },
  {
    title: 'Camp Raspberry',
    org: 'Pascack Valley Regional High School District',
    period: 'Nov 2018 – May 2019',
    location: 'Montvale, NJ',
    points: [
      'An interactive program for children with special needs.',
      'Participated in themed events across Pascack Valley and Pascack Hills high schools, working with staff and campers to build a positive, supportive atmosphere.',
    ],
  },
];

export type Education = {
  institution: string;
  degree: string;
  period: string;
  location: string;
  points: string[];
};

export const education: Education[] = [
  {
    institution: 'Osmania Medical College',
    degree: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    period: 'Expected May 2028',
    location: 'Hyderabad, India',
    points: [
      'Distinction in Biochemistry; First Class in Pharmacology.',
      'Active research club member and OMC C.A.R.E.S. volunteer supporting community outreach programs.',
    ],
  },
  {
    institution: 'Pascack Hills High School',
    degree: 'High School Diploma',
    period: 'Montvale, NJ',
    location: 'Montvale, NJ',
    points: [
      'Studied Honors Biology and Chinese.',
      'Junior programmer for the Robotics Team (Team 1676).',
      'Varsity Swimming athlete; volunteered for Camp Raspberry.',
    ],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: 'Systematic Review & Meta-Analysis',
    items: ['Rayyan', 'RevMan', 'AIDE', 'PICOTT', 'Risk of Bias (RoB)'],
  },
  {
    category: 'Statistical & Data',
    items: ['R', 'RStudio', 'Microsoft Excel'],
  },
  {
    category: 'Writing & Referencing',
    items: ['LaTeX', 'Microsoft Word', 'Zotero', 'Mendeley'],
  },
  {
    category: 'Media & Design',
    items: ['Adobe Premiere Pro', 'Final Cut', 'Adobe Photoshop', 'Paint.net'],
  },
  {
    category: 'Platforms',
    items: ['Windows', 'macOS', 'Linux'],
  },
];

export const interests = [
  'Weightlifting',
  'Swimming',
  'Japanese',
  'Anime',
  'Steins;Gate',
];
