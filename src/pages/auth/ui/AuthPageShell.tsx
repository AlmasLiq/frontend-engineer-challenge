import type { PropsWithChildren } from 'react';

type AuthPageShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export const AuthPageShell = ({
  eyebrow,
  title,
  description,
  children,
}: AuthPageShellProps) => (
  <div className="mx-auto flex w-full max-w-md flex-col gap-8">
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-app-muted">{eyebrow}</p>
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-app-foreground">{title}</h2>
        <p className="text-sm leading-6 text-app-muted">{description}</p>
      </div>
    </header>
    {children}
  </div>
);
