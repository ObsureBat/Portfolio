export interface SkillItem {
  name: string;
  isPrimary?: boolean;
  group?: string;
  depth?: number; // For OS layered depth
}

export interface SkillDomain {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
  groups?: {
    name: string;
    skills: string[];
  }[];
}

export const SKILLS_DOMAINS: SkillDomain[] = [
  {
    id: 'cybersecurity',
    number: '01',
    title: 'CYBERSECURITY',
    subtitle: 'Offensive Security & Defensive Architecture',
    skills: [
      { name: 'Penetration Testing' },
      { name: 'Network Security' },
      { name: 'Web Application Security' },
      { name: 'IDS / IPS (NIDS)' },
      { name: 'Vulnerability Assessment' },
      { name: 'Threat Mitigation' },
    ],
  },
  {
    id: 'cloud-tools',
    number: '02',
    title: 'CLOUD & TOOLS',
    subtitle: 'AWS Infrastructure & Security Tooling',
    skills: [
      { name: 'AWS EC2', isPrimary: true, group: 'AWS Cloud Services' },
      { name: 'AWS WAF', isPrimary: true, group: 'AWS Cloud Services' },
      { name: 'GuardDuty', isPrimary: true, group: 'AWS Cloud Services' },
      { name: 'CloudWatch', isPrimary: true, group: 'AWS Cloud Services' },
      { name: 'AWS IAM', isPrimary: true, group: 'AWS Cloud Services' },
      { name: 'S3 & Lambda', isPrimary: true, group: 'AWS Cloud Services' },
      { name: 'Burp Suite', isPrimary: false, group: 'Supporting Tools' },
      { name: 'Git / GitHub', isPrimary: false, group: 'Supporting Tools' },
      { name: 'Jira', isPrimary: false, group: 'Supporting Tools' },
    ],
    groups: [
      {
        name: 'AWS Connected Cluster',
        skills: ['AWS EC2', 'AWS WAF', 'GuardDuty', 'CloudWatch', 'AWS IAM', 'S3 & Lambda'],
      },
      {
        name: 'Supporting Toolchain',
        skills: ['Burp Suite', 'Git / GitHub', 'Jira'],
      },
    ],
  },
  {
    id: 'systems-os',
    number: '03',
    title: 'SYSTEMS & SECURITY OS',
    subtitle: 'Penetration Environments & Enterprise Platforms',
    skills: [
      { name: 'Kali Linux', depth: 0 }, // Closest
      { name: 'Parrot Security', depth: 1 },
      { name: 'Metasploitable', depth: 2 },
      { name: 'Ubuntu Linux', depth: 3 },
      { name: 'Windows Systems', depth: 4 },
    ],
  },
  {
    id: 'programming-ml',
    number: '04',
    title: 'PROGRAMMING & MACHINE LEARNING',
    subtitle: 'Software Core & Applied Deep Learning',
    skills: [
      { name: 'Python', group: 'Programming' },
      { name: 'C++', group: 'Programming' },
      { name: 'Java', group: 'Programming' },
      { name: 'JavaScript (ES6+)', group: 'Programming' },
      { name: 'SQL', group: 'Programming' },
      { name: 'TensorFlow / Keras', group: 'Machine Learning' },
      { name: 'PyTorch', group: 'Machine Learning' },
    ],
    groups: [
      {
        name: 'PROGRAMMING',
        skills: ['Python', 'C++', 'Java', 'JavaScript (ES6+)', 'SQL'],
      },
      {
        name: 'MACHINE LEARNING',
        skills: ['TensorFlow / Keras', 'PyTorch'],
      },
    ],
  },
];
