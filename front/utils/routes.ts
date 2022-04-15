export const routes = {
  home: "/",
  login: "/login",
  register: "/register",

  management: "/management",
  managementAddProduct: "/management/add/product",
  managementCategories: "/management/categories",
  managementOrders: "/management/orders",
  managementUsers: "/management/users",
  managementStores: "/management/stores",

  settings: "/settings",
  settingsAccount: "/settings/account",
  settingsPassword: "/settings/password",
  settingsAddresses: "/settings/addresses",
  settingsSessions: "/settings/sessions",

  category: (categoryId: number) => `/category/${categoryId}`,

  productRoot: (productId: number) => `/products/${productId}`,

  product: {
    edit: (productId: number) => `/products/${productId}/edit`,
    reviews: (productId: number) => `/products/${productId}/reviews`,
    reviewsAdd: (productId: number) => `/products/${productId}/reviews/add`,
  },
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

  productsRoot: "/products",

  products: {
    product: (productId: number) => `/products/${productId}`,
  },

  categoriesRoot: "/categories",

  categories: {
    category: (categoryId: number) => `/categories/${categoryId}`,
  },

  storesRoot: "/stores",

  stores: {
    store: (storeId: string) => `/stores/${storeId}`,
  },
};
