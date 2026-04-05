import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-app-accent text-app-accent-foreground hover:opacity-90',
  secondary: 'bg-[#f1e4d7] text-app-foreground hover:bg-[#ead8c8]',
  ghost: 'bg-transparent text-app-foreground hover:bg-black/5',
};

export const Button = ({ className, type = 'button', variant = 'primary', ...props }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
      variants[variant],
      className,
    )}
    type={type}
    {...props}
  />
);
