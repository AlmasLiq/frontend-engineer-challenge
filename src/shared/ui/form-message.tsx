type FormMessageProps = {
  tone?: 'default' | 'error' | 'success';
  children: string;
};

const toneClassMap: Record<NonNullable<FormMessageProps['tone']>, string> = {
  default: 'border-app-border bg-[#f6efe7] text-app-foreground',
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

export const FormMessage = ({ tone = 'default', children }: FormMessageProps) => (
  <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClassMap[tone]}`}>{children}</div>
);
