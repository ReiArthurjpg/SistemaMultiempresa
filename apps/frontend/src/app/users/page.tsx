'use client';
import { useQuery } from '@tanstack/react-query';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { listResource } from '@/lib/api';
export default function Page() { const { data } = useQuery({ queryKey: ['users'], queryFn: () => listResource('/users') }); return <AppShell title="Usuários"><Card title="CRUD Usuários"><div className="mb-4 flex justify-between"><p className="text-slate-500">Listagem inicial com paginação cursor-based e pronta para formulários ShadCN.</p><button className="btn">Novo</button></div><pre className="overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-white">{JSON.stringify(data ?? [], null, 2)}</pre></Card></AppShell>; }
