import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/components/layout/query-provider';
export const metadata: Metadata = { title: 'Nexora SaaS', description: 'SaaS multiempresa white label com créditos e permissões.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body><QueryProvider>{children}</QueryProvider></body></html>; }
