import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  endAdornment?: ReactNode;
  error?: string;
  label?: string;
  hideLabel?: boolean;
  variant?: 'default' | 'underline';
};

const variantClassMap: Record<NonNullable<InputProps['variant']>, string> = {
  default:
    'h-12 rounded-2xl border border-app-border bg-white px-4 text-sm outline-none transition placeholder:text-app-muted focus:border-app-foreground',
  underline:
    'h-14 w-full rounded-none border-0 border-b border-[#1F1F2714] bg-transparent px-0 py-2 text-[14px] text-[#2c2c2c] outline-none transition placeholder:text-[#c6c8cc] focus:border-[#999fa8]',
};

export const Input = ({
  className,
  endAdornment,
  error,
  id,
  label,
  hideLabel = false,
  variant = 'default',
  ...props
}: InputProps) => (
  <label className="flex w-full flex-col gap-2">
    {label && !hideLabel ? <span className="text-sm font-medium text-app-foreground">{label}</span> : null}
    <div className="relative">
      <input
        id={id}
        className={cn(
          variantClassMap[variant],
          endAdornment && 'pr-10',
          error && (variant === 'underline' ? 'border-red-400' : 'border-red-400'),
          className,
        )}
        {...props}
      />
      {endAdornment ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-[#bec3cd]">
          {endAdornment}
        </div>
      ) : null}
    </div>
    {error ? <span className="text-xs text-red-500">{error}</span> : null}
  </label>
);
