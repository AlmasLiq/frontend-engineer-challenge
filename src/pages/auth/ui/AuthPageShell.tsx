import type { PropsWithChildren } from 'react';

type AuthPageShellProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
}>;

export const AuthPageShell = ({
  eyebrow,
  title,
  description,
  children,
}: AuthPageShellProps) => (
  <div className="flex h-full w-full max-w-[400px] flex-col">
    <header className="space-y-4">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-app-muted">{eyebrow}</p>
      ) : null}
      <h2 className="text-[32px] font-medium leading-[1.2] tracking-[0] text-[#2e2f33]">
        {title}
      </h2>
      {description ? <p className="text-sm leading-6 text-app-muted">{description}</p> : null}
    </header>
    <div className="pt-7">{children}</div>
  </div>
);
