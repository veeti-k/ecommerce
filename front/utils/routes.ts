export const routes = {
  home: "/",
  login: "/login",
  register: "/register",

  settings: "/settings",
  settingsAccount: "/settings/account",
  settingsPassword: "/settings/password",
  settingsAddresses: "/settings/addresses",
  settingsSessions: "/settings/sessions",
};

export const apiRoutes = {
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/register",
  tokens: "/auth/tokens",

  userRoot: (user: string) => `/users/${user}`,

  user: {
    addressesRoot: (user: string) => `/users/${user}/addresses`,

    addresses: {
      address: (user: string, address: string) => `/users/${user}/addresses/${address}`,
    },
  },
};
