'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
export default function CreditsPage() { const [companyId, setCompanyId] = useState(''); const { data, refetch } = useQuery({ queryKey: ['credits', companyId], enabled: Boolean(companyId), queryFn: async () => (await api.get(`/credits/${companyId}/ledger`)).data }); async function addCredits(){ if(!companyId) return; await api.post('/credits/operations', { companyId, amount: 100, transactionType: 'ADD', description: 'Compra manual via painel' }); refetch(); } return <AppShell title="Créditos"><Card title="Ledger financeiro imutável"><div className="mb-4 flex gap-2"><input className="input" placeholder="Company ID" value={companyId} onChange={(e)=>setCompanyId(e.target.value)} /><button className="btn" onClick={addCredits}>Adicionar 100</button></div><pre className="overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-white">{JSON.stringify(data ?? [], null, 2)}</pre></Card></AppShell>; }
