import { Link, Outlet, useLocation } from 'react-router-dom';

import authHeroUrl from '@/shared/assets/illustrations/auth-hero.svg';
import { Logo } from '@/shared/ui/logo';

export const AuthLayout = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login' || pathname === '/';
  const isRegisterPage = pathname === '/register';
  const isForgotPasswordPage = pathname === '/forgot-password';
  const isResetPasswordPage = pathname === '/reset-password';

  if (isForgotPasswordPage || isResetPasswordPage) {
    return (
      <main className="min-h-screen bg-white">
        <section className="relative min-h-screen px-6 sm:px-10 lg:px-[56px]">
          <div className="absolute left-6 top-4 z-10 sm:left-10 lg:left-[56px] lg:top-[18px]">
            <Logo />
          </div>

          <div className="flex min-h-screen items-center justify-center px-4 py-20">
            <Outlet />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-[560px_minmax(0,1fr)]">
        <section className="relative min-h-screen bg-white px-6 sm:px-10 lg:px-[56px]">
          <div className="absolute left-6 top-4 z-10 sm:left-10 lg:left-[56px] lg:top-[18px]">
            <Logo />
          </div>

          <div className="flex min-h-screen items-center justify-center py-28">
            <Outlet />
          </div>

          {isLoginPage || isRegisterPage ? (
            <footer className="absolute bottom-8 left-6 right-6 border-t border-[#f0f0f0] pt-5 text-center text-[15px] leading-6 text-[#8f94a3] sm:left-10 sm:right-10 lg:left-[56px] lg:right-[56px]">
              {isLoginPage ? (
                <>
                  Еще не зарегистрированы?{' '}
                  <Link className="font-medium text-[#3a9bea]" to="/register">
                    Регистрация
                  </Link>
                </>
              ) : (
                <>
                  Уже есть аккаунт?{' '}
                  <Link className="font-medium text-[#3a9bea]" to="/login">
                    Войти
                  </Link>
                </>
              )}
            </footer>
          ) : null}
        </section>

        <section className="relative hidden min-h-screen overflow-hidden bg-[#eef3fb] lg:flex lg:items-center lg:justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.72)_0%,_rgba(255,255,255,0)_55%)]" />
          <img
            alt=""
            aria-hidden="true"
            className="relative z-10 h-auto w-[512px] max-w-[62%]"
            src={authHeroUrl}
          />
        </section>
      </div>
    </main>
  );
};
