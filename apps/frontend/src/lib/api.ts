import axios from 'axios';
export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8007' });
api.interceptors.request.use((config) => { if (typeof window !== 'undefined') { const token = localStorage.getItem('nexora.accessToken'); if (token) config.headers.Authorization = `Bearer ${token}`; } return config; });
export async function listResource(path: string) { const { data } = await api.get(path); return data; }
