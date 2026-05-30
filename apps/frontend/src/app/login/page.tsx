'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
const schema = z.object({ email: z.string().email(), password: z.string().min(8), twoFactorCode: z.string().optional() });
type FormData = z.infer<typeof schema>;
export default function LoginPage() { const setSession = useAuthStore((s) => s.setSession); const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { email: 'master@nexora.local', password: 'Admin@123' } }); async function onSubmit(values: FormData) { const { data } = await api.post('/auth/login', values); setSession(data); location.href = '/dashboard'; } return <main className="grid min-h-screen place-items-center bg-slate-100"><form onSubmit={handleSubmit(onSubmit)} className="card w-full max-w-md space-y-4"><div><p className="text-sm font-semibold text-slate-500">Nexora White Label</p><h1 className="text-3xl font-bold">Entrar</h1></div><input className="input" placeholder="Email" {...register('email')} />{errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}<input className="input" type="password" placeholder="Senha" {...register('password')} /><input className="input" placeholder="Código 2FA (se habilitado)" {...register('twoFactorCode')} /><button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? 'Entrando...' : 'Entrar'}</button></form></main>; }
