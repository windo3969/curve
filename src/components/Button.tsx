import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'light' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50';
const sizes = { md: 'h-12 px-6 text-[16px]', sm: 'h-10 px-4 text-[15px]', lg: 'h-14 px-8 text-[17px]' };
const variants: Record<Variant, string> = {
  primary: 'bg-curve-blue text-white hover:bg-[#1F58E8]',
  outline: 'border border-curve-line bg-white text-curve-ink hover:border-curve-blue hover:text-curve-blue',
  light: 'bg-white text-curve-deep hover:bg-curve-blue-soft',
  ghost: 'text-curve-text hover:text-curve-blue',
};

type Common = { children: ReactNode; variant?: Variant; size?: keyof typeof sizes; className?: string };

export function ButtonLink({ to, ...p }: Common & { to: string }) {
  const cls = `${base} ${sizes[p.size ?? 'md']} ${variants[p.variant ?? 'primary']} ${p.className ?? ''}`;
  if (to.startsWith('#')) return <a href={to} className={cls}>{p.children}</a>;
  return <Link to={to} className={cls}>{p.children}</Link>;
}

export function Button({
  type = 'button',
  onClick,
  disabled,
  ...p
}: Common & { type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[p.size ?? 'md']} ${variants[p.variant ?? 'primary']} ${p.className ?? ''}`}
    >
      {p.children}
    </button>
  );
}
