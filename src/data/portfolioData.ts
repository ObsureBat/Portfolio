export interface Education {
  degree: string;
  institution: string;
  specialization: string;
  period: string;
  cgpa: string;
  certification?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  isCurrent?: boolean;
}

export interface ResearchSpotlight {
  title: string;
  role: string;
  period: string;
  advisors: string[];
  stats: { label: string; value: string; numValue: number; prefix?: string; suffix?: string }[];
  description: string;
  conference: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  period: string;
  badge: string;
  description: string;
  stack: string[];
  github?: string;
  liveUrl?: string;
  colorHex: string; // Theme accent for project world
  imagePlaceholderText: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  color: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  credentialId?: string;
  date: string;
  details?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ayush Sharma",
    title: "Software Engineer",
    location: "Gurugram, Haryana, India",
    email: "ayushsharmasd03@gmail.com",
    phone: "+91 76685 81706",
    linkedin: "https://linkedin.com/in/ayush-sharma-805810218/",
    github: "https://github.com/ObsureBat",
  },
  hero: {
    eyebrow: "WELCOME TO MY WEBSITE",
    headline: "Cloud & Cybersecurity Engineer building intelligent, secure software.",
    subline: "From AI-driven intrusion detection and adaptive AWS firewalls to production software and cloud-native platforms, I turn complex problems into working systems.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Read About Me",
  },
  about: {
    heading: "Engineering Scalable Systems, Cloud Infrastructure & Resilient Code.",
    paragraphs: [
      "I’m a Computer Science graduate from Bennett University specializing in full-stack engineering, cloud architecture, and security. I build end-to-end production software — from high-performance e-commerce platforms and offline-first desktop POS/ERP systems (React, Electron, Node.js, PostgreSQL) to serverless web applications on AWS.",
      "Alongside software development, I conduct applied AI & cloud defensive research, engineering real-time threat detection pipelines integrating deep learning with AWS WAF, GuardDuty, and CloudWatch. Whether building customer-facing applications or securing distributed cloud backends, my focus is on shipping clean, resilient, production-ready code."
    ],
    narrative: "I’m a Computer Science graduate from Bennett University specializing in full-stack engineering, cloud architecture, and security. I build end-to-end production software — from high-performance e-commerce platforms and offline-first desktop POS/ERP systems (React, Electron, Node.js, PostgreSQL) to serverless web applications on AWS. Alongside software development, I conduct applied AI & cloud defensive research, engineering real-time threat detection pipelines integrating deep learning with AWS WAF, GuardDuty, and CloudWatch. Whether building customer-facing applications or securing distributed cloud backends, my focus is on shipping clean, resilient, production-ready code.",
    badges: [
      { icon: "Laptop", label: "Full-Stack & Offline Systems" },
      { icon: "Cloud", label: "AWS Cloud Architecture" },
      { icon: "Shield", label: "AI & Security Research (IC3SE 2025)" }
    ],
    pillars: [
      {
        title: "Full-Stack Systems",
        tech: "React • TypeScript • Node.js • Electron • PostgreSQL",
        highlight: "Shipped offline-first POS & ERP with double-entry accounting engine + live e-commerce platform.",
        icon: "Code2"
      },
      {
        title: "Cloud & Infrastructure",
        tech: "AWS Lambda • S3 • DynamoDB • CloudWatch • WAF",
        highlight: "Serverless architectures, real-time logging pipelines, and automated cloud threat mitigation.",
        icon: "Cloud"
      },
      {
        title: "Applied AI & Security",
        tech: "TensorFlow • IDS/IPS • Deep Learning • Penetration Testing",
        highlight: "Built AGESIFY adaptive cloud firewall; 97.1% intrusion detection accuracy; published IC3SE 2025 researcher.",
        icon: "ShieldAlert"
      }
    ],
    highlights: [
      { value: "2+", label: "Shipped Production Systems" },
      { value: "97.1%", label: "Threat Detection Accuracy" },
      { value: "1", label: "IC3SE Research Publication" }
    ],
    education: {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Bennett University",
      specialization: "Full-Stack, Cloud & Cybersecurity",
      period: "2022 – 2026",
      cgpa: "8.0 / 10.0",
      certification: "AWS Certified Cloud Practitioner"
    } as Education,
    locationInfo: {
      city: "Gurugram, IN",
      status: "Open to SDE / Full-Stack Engineer, Cloud/DevOps, and Security Analyst roles.",
      availabilityBadge: "Available for Opportunities"
    }
  },
  experience: [
    {
      title: "Freelance Software Developer",
      company: "GPI Industries Pvt Ltd",
      period: "May 2026 – Present",
      location: "Remote / On-site",
      isCurrent: true,
      bullets: [
        "Built and deployed the company's e-commerce storefront (gpipvtltd.com) using React and Node.js, with JWT-based authentication, an admin management portal, and SEO-friendly server-side rendering for Google Search & Shopping visibility.",
        "Building a desktop POS, Accounting, and CRM system with React, TypeScript, Electron, Node.js, and PostgreSQL — offline billing with automatic sync once connection is restored.",
        "Designed an automated double-entry accounting engine posting journal entries (receivables, payables, revenue, tax, inventory) directly from finalized invoices.",
        "Built a print-ready PDF invoicing system with GST/HSN breakdowns and thermal-printer support for point-of-sale hardware."
      ]
    },
    {
      title: "Member",
      company: "Cypher Club, Bennett University",
      period: "2023 – 2024",
      location: "Greater Noida, India",
      bullets: [
        "Led cybersecurity workshops and student hands-on CTF initiatives focused on ethical hacking, network sniffing, and web vulnerability analysis."
      ]
    }
  ] as ExperienceItem[],
  research: {
    title: "AI-Driven Network Intrusion Detection & Adaptive Cloud Firewall System",
    heading: "AI-Driven NIDS & AGESIFY Adaptive Cloud Firewall System",
    role: "Research Lead",
    period: "Jul 2024 – Jan 2026",
    advisors: ["Wg Cdr (Dr.) Ajay Kumar", "Dr. Pradeep Kumar Arya"],
    stats: [
      { label: "Detection Accuracy", value: "97.1%", numValue: 97.1, suffix: "%" },
      { label: "Architectures Fused", value: "3", numValue: 3, prefix: "" },
      { label: "Cloud Ecosystem", value: "AWS WAF", numValue: 100, prefix: "Native " }
    ],
    description: "Trained a NIDS combining Transformer, BiLSTM, and CNN architectures in TensorFlow/Keras, reaching 97.1% accuracy detecting DDoS, SQL injection, and other attack vectors. Extended it into AGESIFY, an AI-native adaptive cloud firewall deployed with AWS WAF, GuardDuty, and CloudWatch for real-time detection and blocking of DDoS, SQL injection, and path-traversal attempts. Built self-optimizing mitigation logic and automated response protocols for port-scan and buffer-overflow attempts, reducing false positives through continuous traffic analysis and feedback-driven model updates.",
    conference: "Presented at IC3SE 2025, Amity University's international conference on computing and security."
  } as ResearchSpotlight,
  projects: [
    {
      id: "cloud-elearning",
      title: "Cloud-Native E-Learning Platform",
      category: "AWS Cloud Infrastructure & AI",
      period: "Jan – May 2025",
      badge: "AWS Serverless",
      description: "Serverless platform with live HD video stream orchestration, an AI chatbot, and multi-language translation supporting up to 250 concurrent users. Implemented HIPAA-aligned security controls, KMS encryption, and live CloudWatch telemetry dashboards.",
      stack: ["React", "TypeScript", "AWS Chime SDK", "Lambda", "DynamoDB", "S3", "Lex", "Translate"],
      github: "https://github.com/ObsureBat",
      colorHex: "#4D6BFF",
      imagePlaceholderText: "AWS Cloud Infrastructure"
    },
    {
      id: "gpi-storefront",
      title: "GPI Industries Storefront",
      category: "Production E-Commerce Platform",
      period: "May 2026 – Present",
      badge: "Production Live",
      description: "Full production e-commerce storefront for GPI Industries featuring secure JWT auth, administrative inventory portal, and SSR tuned for Google Search & Shopping discoverability.",
      stack: ["React", "Node.js", "Express", "JWT Auth", "PostgreSQL", "SSR/SEO"],
      liveUrl: "https://gpipvtltd.com",
      colorHex: "#FF4FD8",
      imagePlaceholderText: "E-Commerce Storefront"
    },
    {
      id: "gpi-pos-crm",
      title: "Offline-First POS, Accounting & CRM",
      category: "Desktop Enterprise Software",
      period: "In Progress",
      badge: "Electron Desktop",
      description: "Desktop billing and ERP system with offline transaction queueing and automatic cloud synchronization. Includes an automated double-entry accounting engine and thermal-printer-ready GST/HSN PDF generator.",
      stack: ["React", "TypeScript", "Electron", "Node.js", "PostgreSQL", "Tailwind"],
      colorHex: "#3FE8B0",
      imagePlaceholderText: "Offline POS & Accounting"
    }
  ] as ProjectItem[],
  skills: [
    {
      category: "Cybersecurity",
      color: "#4D6BFF",
      skills: ["Penetration Testing", "Network Security", "Web Application Security", "IDS / IPS (NIDS)", "Vulnerability Assessment", "Threat Mitigation"]
    },
    {
      category: "Cloud & Tools",
      color: "#8A4FFF",
      skills: ["AWS EC2", "AWS WAF", "GuardDuty", "CloudWatch", "AWS IAM", "S3 & Lambda", "Burp Suite", "Git / GitHub", "Jira"]
    },
    {
      category: "Systems & Security OS",
      color: "#3FE8B0",
      skills: ["Kali Linux", "Parrot Security", "Metasploitable", "Ubuntu Linux", "Windows Systems"]
    },
    {
      category: "Programming & Machine Learning",
      color: "#FF4FD8",
      skills: ["Python", "C++", "Java", "JavaScript (ES6+)", "SQL", "TensorFlow / Keras", "PyTorch"]
    }
  ] as SkillCategory[],
  certifications: [
    {
      title: "Jr Penetration Tester",
      issuer: "TryHackMe",
      credentialId: "THM-B5X1M1ZKEM",
      date: "May 2026",
      details: "Hands-on penetration testing methodologies, web exploitation, privilege escalation, and network pivoting."
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "May 2024 – May 2027",
      details: "Validation of overall understanding of AWS Cloud platform, architecture, security, and compliance."
    },
    {
      title: "Sole Student Delegate",
      issuer: "2nd Annual DEF SEC 2025, Delhi",
      date: "2025",
      details: "Selected delegate representing academic research in defense cybersecurity frameworks."
    },
    {
      title: "Research Paper Presentation",
      issuer: "IC3SE 2025, Amity University",
      date: "2025",
      details: "Presented research paper on AI-driven network intrusion detection and adaptive AWS cloud firewalls."
    },
    {
      title: "The Bits and Bytes of Computer Networking",
      issuer: "Google / Coursera",
      date: "2024"
    },
    {
      title: "Introduction to Agile Testing",
      issuer: "Coursera",
      date: "2024"
    }
  ] as CertificationItem[],
};
