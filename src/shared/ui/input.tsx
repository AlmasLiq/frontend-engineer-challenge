import type { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
};

export const Input = ({ className, error, id, label, ...props }: InputProps) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-medium text-app-foreground">{label}</span>
    <input
      id={id}
      className={cn(
        'h-12 rounded-2xl border border-app-border bg-white px-4 text-sm outline-none transition placeholder:text-app-muted focus:border-app-foreground',
        error && 'border-red-400',
        className,
      )}
      {...props}
    />
    {error ? <span className="text-xs text-red-500">{error}</span> : null}
  </label>
);
