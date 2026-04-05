import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

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
    'h-12 rounded-2xl border border-app-border bg-white px-4 text-sm transition placeholder:text-app-muted focus:border-app-foreground',
  underline:
    'h-14 w-full rounded-none border-0 border-b border-[#1F1F2714] bg-transparent px-0 py-2 text-[14px] text-[#2c2c2c] transition placeholder:text-[#c6c8cc] focus:border-[#999fa8]',
};

export const Input = ({
  'aria-describedby': ariaDescribedBy,
  className,
  endAdornment,
  error,
  id,
  label,
  hideLabel = false,
  variant = 'default',
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const describedBy = [ariaDescribedBy, error ? errorId : null].filter(Boolean).join(' ') || undefined;

  return (
    <label className="flex w-full flex-col gap-2" htmlFor={inputId}>
      {label ? (
        <span className={cn('text-sm font-medium text-app-foreground', hideLabel && 'sr-only')}>{label}</span>
      ) : null}
      <div className="relative">
        <input
          aria-describedby={describedBy}
          aria-errormessage={error ? errorId : undefined}
          aria-invalid={error ? 'true' : undefined}
          id={inputId}
          className={cn(
            variantClassMap[variant],
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            endAdornment && 'pr-10',
            error && (variant === 'underline' ? 'border-[#D23939]' : 'border-[#D23939]'),
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
      {error ? (
        <span
          aria-live="polite"
          className="text-[12px] font-normal leading-[1.4] text-[#D23939]"
          id={errorId}
          role="alert"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
};
