import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fffaf2_0%,_#f2e5d7_52%,_#ead9cb_100%)]">
    <div className="container-shell flex min-h-screen items-center justify-center py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-app-border bg-app-surface shadow-[0_24px_80px_rgba(47,28,18,0.12)] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-[linear-gradient(160deg,_#251714_0%,_#5b3125_45%,_#c15e3d_100%)] p-10 text-app-accent-foreground lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Orbitto Service</p>
            <h1 className="max-w-sm text-5xl font-semibold leading-tight">
              Frontend skeleton with production-oriented wiring.
            </h1>
          </div>
          <div className="max-w-sm space-y-3 text-sm text-white/72">
            <p>Routing, API boundaries, forms, queries, testing, and styling are prepared.</p>
            <p>Next step is implementing auth use cases against the selected backend fork.</p>
          </div>
        </section>
        <section className="p-6 sm:p-8 lg:p-10">
          <Outlet />
        </section>
      </div>
    </div>
  </main>
);
