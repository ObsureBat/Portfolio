import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import { SmoothScroll } from '@/components/dom/SmoothScroll';
import { Navbar } from '@/components/dom/Navbar';

// Dynamically import SceneContainer with SSR disabled at root level
const SceneContainer = dynamic(
  () => import('@/components/canvas/SceneContainer'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Ayush Sharma | Software Engineer | Full-Stack, Cloud & Security',
  description: 'Portfolio of Ayush Sharma — Computer Science graduate specializing in full-stack engineering, cloud architecture, and cybersecurity research.',
  keywords: [
    'Ayush Sharma',
    'Software Engineer',
    'Full-Stack Developer',
    'Cloud Architect',
    'AWS Certified',
    'Cybersecurity',
    'React',
    'TypeScript',
    'Node.js',
    'Electron',
    'TensorFlow',
    'NIDS'
  ],
  authors: [{ name: 'Ayush Sharma' }],
  creator: 'Ayush Sharma',
  openGraph: {
    title: 'Ayush Sharma | Software Engineer | Full-Stack, Cloud & Security',
    description: 'Computer Science graduate building production software, cloud-native platforms, and AI defensive research systems.',
    siteName: 'Ayush Sharma Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Sharma | Software Engineer',
    description: 'Full-stack engineering, cloud architecture, and cybersecurity research.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ]
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0D13',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#F5F5F3]">
      <body className="font-sans antialiased bg-[#F5F5F3] text-zinc-900 selection:bg-zinc-900 selection:text-white relative min-h-screen overflow-x-hidden">
        <SmoothScroll>
          {/* Top-level persistent WebGL 3D Canvas */}
          <SceneContainer />
          
          {/* Persistent Header */}
          <Navbar />

          {/* Subtle Framer Tactile Matte Texture Overlay */}
          <div 
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-30 opacity-[0.022] mix-blend-multiply bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" 
          />

          {/* DOM Section Content */}
          <main className="relative z-10 pointer-events-auto">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
