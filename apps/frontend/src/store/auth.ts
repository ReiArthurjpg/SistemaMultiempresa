import { create } from 'zustand';
type AuthState = { accessToken?: string; user?: { email: string; role: string }; setSession: (session: { accessToken: string; user: { email: string; role: string } }) => void; logout: () => void };
export const useAuthStore = create<AuthState>((set) => ({ setSession: (session) => { localStorage.setItem('nexora.accessToken', session.accessToken); set(session); }, logout: () => { localStorage.removeItem('nexora.accessToken'); set({ accessToken: undefined, user: undefined }); } }));
