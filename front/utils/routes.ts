export const routes = {
  home: "/",
  login: "/login",
  register: "/register",

  dashboard: "/dashboard",

  settings: "/settings",
  settingsAccount: "/settings/account",
  settingsPassword: "/settings/password",
  settingsAddresses: "/settings/addresses",
  settingsSessions: "/settings/sessions",

  category: (categoryId: number) => `/category/${categoryId}`,
};

export const apiRoutes = {
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/register",
  tokens: "/auth/tokens",

  userRoot: (user: string) => `/users/${user}`,

  user: {
    addressesRoot: (user: string) => `/users/${user}/addresses`,
    sessionsRoot: (user: string) => `/users/${user}/sessions`,

    addresses: {
      address: (user: string, addressId: string) => `/users/${user}/addresses/${addressId}`,
    },

    sessions: {
      session: (user: string, sessionId: string) => `/users/${user}/sessions/${sessionId}`,
    },
  },
};
