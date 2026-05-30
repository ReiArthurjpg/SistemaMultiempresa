import type { ReactNode } from 'react';
export function Card({ title, children }: { title?: string; children: ReactNode }) { return <section className="card">{title ? <h2 className="mb-4 text-lg font-semibold">{title}</h2> : null}{children}</section>; }
