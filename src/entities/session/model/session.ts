export type SessionUser = {
  email: string;
  id: string;
  status?: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: SessionUser;
};

const AUTH_SESSION_STORAGE_KEY = 'auth-session';


export const getAuthSession = (): AuthSession | null => {

  const rawValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  }
};

export const setAuthSession = (session: AuthSession) => {
  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
};
