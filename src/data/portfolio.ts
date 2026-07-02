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
    'MS4 at Osmania Medical College focused on evidence synthesis and clinical research.',
  intro:
    "I'm an MBBS student at Osmania Medical College in Hyderabad with a strong interest in evidence-based medicine and clinical research. My work spans systematic reviews and meta-analyses, registry-based cohort studies, decision-analytic modeling, cross-sectional studies, and peer-reviewed case reports across oncology, neurology, surgery, and public health; complemented by research associate, editorial, and peer-review roles.",
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
  { value: '14', label: 'Research projects' },
  { value: '2', label: 'Editorial & review roles' },
  { value: 'ICMR', label: 'STS 2025 grant recipient' },
];

export const researchFilters = [
  { key: 'all', label: 'All' },
  { key: 'srma', label: 'Reviews & Meta' },
  { key: 'database', label: 'Database' },
  { key: 'model', label: 'Decision Models' },
  { key: 'methods', label: 'Methods' },
  { key: 'clinical', label: 'Clinical Studies' },
];

export const researchStatusLabels = {
  accepted: 'Accepted',
  registered: 'Registered',
  submitted: 'Submitted',
  active: 'Active',
  progress: 'In development',
  ongoing: 'Ongoing',
  completed: 'Completed',
} as const;

export type ResearchStatus = keyof typeof researchStatusLabels;

export type ResearchProject = {
  title: string;
  org: string;
  period: string;
  role?: string;
  description: string;
  note?: string;
  contributions?: string[];
  tags?: string[];
  lanes?: string[];
  code?: string;
  status?: ResearchStatus;
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
    lanes: ['clinical'],
    status: 'ongoing',
  },
  {
    title: 'Is robotic esophagectomy actually better than the standard approach?',
    org: 'Operation MetaMind',
    period: 'May 2025 – Present',
    role: 'Systematic Review & Meta-Analysis',
    description:
      'A meta-analysis of surgical, oncological, and survival outcomes in robotic versus conventional minimally invasive esophagectomy.',
    note: 'ACS Clinical Congress 2026. Fast-tracked for JACS.',
    tags: ['Reviews & Meta', 'Surgical Oncology', 'Esophageal Cancer'],
    lanes: ['srma'],
    code: 'RAMIE',
    status: 'accepted',
  },
  {
    title: 'Does a BRAF inhibitor work in a leukemia too rare to run a trial on?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'Proportional Meta-Analysis',
    description:
      'A proportional meta-analysis of response and survival with vemurafenib in resistant hairy cell leukemia.',
    note: 'SOHO 2026. Registered on PROSPERO, in screening.',
    tags: ['Reviews & Meta', 'Hematology', 'Oncology'],
    lanes: ['srma'],
    code: 'VEMURAF',
    status: 'accepted',
  },
  {
    title: 'Does prophylactic mesh prevent parastomal hernia, or only delay it?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'Meta-Analysis with Trial Sequential Analysis',
    description:
      'A meta-analysis with trial sequential analysis, pooling long-term follow-up the guidelines were written without.',
    note: 'Research Hackathon 2026 finalist. Targeting ACS 2027.',
    tags: ['Reviews & Meta', 'Trial Sequential Analysis', 'Surgery'],
    lanes: ['srma'],
    code: 'CHIMNEY',
    status: 'progress',
  },
  {
    title: 'Has anal cancer treatment actually changed across three decades?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'SEER Population-Based Cohort',
    description:
      'A SEER population-based cohort of treatment trends and survival, 2000 to 2023.',
    note: 'Registered on OSF. Journal article in progress.',
    tags: ['Database', 'SEER', 'Cancer Outcomes'],
    lanes: ['database'],
    code: 'Anl_CA',
    status: 'registered',
  },
  {
    title:
      'Does Commission on Cancer accreditation improve resection and survival in gastric cancer?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'SEER Population-Based Cohort',
    description:
      'A SEER population-based cohort of resectable gastric adenocarcinoma, accredited versus non-accredited centers.',
    note: 'Abstract submitted, ACS Clinical Congress 2026.',
    tags: ['Database', 'SEER', 'Gastric Cancer'],
    lanes: ['database'],
    code: 'SEER',
    status: 'submitted',
  },
  {
    title: 'Does surgical staging erase the racial survival gap?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'SEER Equity Analysis',
    description:
      'A pan-cancer sentinel lymph node biopsy equity analysis using the new 2018+ SEER variables.',
    note: 'Abstract submitted, ACS Clinical Congress 2026.',
    tags: ['Database', 'SEER', 'Health Equity'],
    lanes: ['database'],
    code: 'SEER',
    status: 'submitted',
  },
  {
    title: 'Does resection beat non-operative management in oligometastatic colorectal cancer?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'SEER Population-Based Cohort',
    description:
      'A SEER 17 population-based cohort, 2010 to 2023, comparing surgical resection with non-operative management.',
    note: 'Abstract submitted, ACS Clinical Congress 2026.',
    tags: ['Database', 'SEER', 'Colorectal Cancer'],
    lanes: ['database'],
    code: 'SEER',
    status: 'submitted',
  },
  {
    title: 'Is ctDNA-guided surveillance worth the cost in rectal cancer?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'Decision-Analytic Model',
    description:
      'A decision-analytic model of ctDNA-augmented watch-and-wait after total neoadjuvant therapy, built on an active surveillance trial.',
    note: 'In development.',
    tags: ['Decision Models', 'ctDNA', 'Health Economics'],
    lanes: ['model'],
    code: 'MARKOV',
    status: 'progress',
  },
  {
    title: 'Decision-analytic modeling program',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'Health-Economic Modeling Track',
    description:
      'The training track and idea engine behind health-economic modeling in R.',
    note: 'Active.',
    tags: ['Decision Models', 'Methods', 'R'],
    lanes: ['model', 'methods'],
    code: 'DARTH',
    status: 'active',
  },
  {
    title: 'Plasma exchange or IVIG for osmotic demyelination syndrome?',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'Systematic Review',
    description:
      'A systematic review of case reports and series for a syndrome no trial will study.',
    note: 'Registered on PROSPERO. Screening in progress.',
    tags: ['Reviews & Meta', 'Neurology', 'Case Series'],
    lanes: ['srma'],
    code: 'SRMA ODS',
    status: 'registered',
  },
  {
    title: 'Population-based cancer registry cohort',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'Retrospective Cohort',
    description:
      'A retrospective cohort on Indian national registry data, via ICMR.',
    note: 'In development.',
    tags: ['Database', 'NCRP', 'Cancer Registry'],
    lanes: ['database'],
    code: 'NCRP',
    status: 'progress',
  },
  {
    title: 'A faster risk-of-bias workflow',
    org: 'Operation MetaMind',
    period: 'Current',
    role: 'Reproducible Methods Pipeline',
    description:
      'A reproducible ROBINS-I and ROB2 pipeline, packaged as a method in its own right.',
    note: 'Cochrane Colloquium 2026. In active use.',
    tags: ['Methods', 'Risk of Bias', 'Cochrane'],
    lanes: ['methods'],
    code: 'RoBer | COP',
    status: 'accepted',
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
    lanes: ['srma'],
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
    role: 'Research Associate',
    org: 'Operation MetaMind',
    period: 'July 2025 – Present',
    location: 'Hyderabad, India',
    points: [
      'Contributing to an independent research collective focused on systematic reviews, meta-analyses, registry-based cohorts, decision modeling, and reproducible evidence synthesis.',
      'Collaborating across project teams on protocol development, screening, data extraction, manuscript preparation, and conference abstract submissions.',
      'Supporting methodologically rigorous workflows across oncology, surgery, neurology, and health-economic research projects.',
    ],
  },
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
      'Distinction in Biochemistry; First Division in Pharmacology and Forensic Medicine.',
      'Active research club member and previous OMC C.A.R.E.S. volunteer.',
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
