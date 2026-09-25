export interface CredentialItem {
  id: string;
  number: string;
  type: 'CERTIFICATION' | 'ACTIVITY';
  title: string;
  date: string;
  organization: string;
  credentialId?: string;
  verificationUrl?: string;
  description?: string;
  recordType: string;
  indexLabel: string;
  image: string;
  gallery?: string[];
}

export const CREDENTIALS_DATA: CredentialItem[] = [
  {
    id: 'thm-pentest',
    number: '01',
    type: 'CERTIFICATION',
    title: 'Jr Penetration Tester',
    date: 'May 2026',
    organization: 'TryHackMe',
    credentialId: 'THM-B5X1M1ZKEM',
    verificationUrl: 'https://tryhackme.com',
    description:
      'Hands-on penetration testing methodologies, web exploitation, privilege escalation, network pivoting, and defensive security posture.',
    recordType: 'VERIFIED CERTIFICATE',
    indexLabel: 'Jr Penetration Tester',
    image: '/certifications/jr-penetration-tester.png',
  },
  {
    id: 'aws-ccp',
    number: '02',
    type: 'CERTIFICATION',
    title: 'AWS Certified Cloud Practitioner',
    date: 'May 2024 – May 2027',
    organization: 'Amazon Web Services',
    credentialId: '358fdf75634349f8bb0ab4c6846a0fe9',
    verificationUrl: 'https://aws.amazon.com/verification',
    description:
      'Validation of comprehensive AWS Cloud infrastructure, security architecture, IAM compliance, VPC networking, and cloud economics.',
    recordType: 'OFFICIAL AWS CERTIFICATION',
    indexLabel: 'AWS Certified Cloud Practitioner',
    image: '/certifications/aws-ccp.jpg',
  },
  {
    id: 'bits-bytes-networking',
    number: '03',
    type: 'CERTIFICATION',
    title: 'The Bits and Bytes of Computer Networking',
    date: 'April 2024',
    organization: 'Google / Coursera',
    credentialId: '6EF3NJT86HC8',
    verificationUrl: 'https://coursera.org/verify/6EF3NJT86HC8',
    description:
      'Rigorous foundation in computer networking architecture: TCP/IP, 5-layer model, DNS, DHCP, IPv4/IPv6 subnetting, routing algorithms, and network packet analysis.',
    recordType: 'GOOGLE CERTIFIED COURSE',
    indexLabel: 'Bits & Bytes of Networking',
    image: '/certifications/computer-networking.jpeg',
  },
  {
    id: 'def-sec-2025',
    number: '04',
    type: 'ACTIVITY',
    title: 'Sole Student Delegate',
    date: '2025',
    organization: '2nd Annual DEF SEC 2025, Delhi',
    description:
      'Selected delegate representing academic research in defense cybersecurity frameworks, national cyber resilience, and threat intelligence.',
    recordType: 'OFFICIAL DELEGATE RECORD',
    indexLabel: 'DEF SEC 2025 Delegate',
    image: '/certifications/defsec-1.jpg',
    gallery: [
      '/certifications/defsec-1.jpg',
      '/certifications/defsec-2.jpg',
      '/certifications/defsec-3.jpg',
    ],
  },
  {
    id: 'ic3se-2025',
    number: '05',
    type: 'ACTIVITY',
    title: 'Research Paper Presentation',
    date: '2025',
    organization: 'IC3SE 2025, Amity University',
    description:
      'Presented academic research paper on AI-driven network intrusion detection systems (NIDS) and adaptive AWS cloud firewalls.',
    recordType: 'CONFERENCE PRESENTATION',
    indexLabel: 'IC3SE 2025 Presentation',
    image: '/certifications/ic3se-1.jpg',
    gallery: [
      '/certifications/ic3se-1.jpg',
      '/certifications/ic3se-2.jpg',
    ],
  },
  {
    id: 'agile-testing',
    number: '06',
    type: 'CERTIFICATION',
    title: 'Introduction to Agile Testing',
    date: 'April 2024',
    organization: 'Infosys Springboard',
    verificationUrl: 'https://verify.onwingspan.com',
    description:
      'Agile test methodologies, test-driven development (TDD), automated quality assurance strategies, and continuous integration testing.',
    recordType: 'INFOSYS CERTIFICATION',
    indexLabel: 'Introduction to Agile Testing',
    image: '/certifications/agile-testing.png',
  },
];
