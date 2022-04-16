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
    reviewsAdd: (productId: number) => `/products/${productId}/reviews/write`,

    questions: (productId: number) => `/products/${productId}/questions`,
    questionsAdd: (productId: number) => `/products/${productId}/questions/ask`,
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
    productRoot: (productId: number) => `/products/${productId}`,

    product: {
      reviewsRoot: (productId: number) => `/products/${productId}/reviews`,

      reviews: {
        reviewRoot: (productId: number, reviewId: number) =>
          `/products/${productId}/reviews/${reviewId}`,

        review: {
          commentsRoot: (productId: number, reviewId: number) =>
            `/products/${productId}/reviews/${reviewId}/comments`,

          comments: {
            comment: (productId: number, reviewId: number, commentId: number) =>
              `/products/${productId}/reviews/${reviewId}/comments/${commentId}`,
          },
        },
      },

      questionsRoot: (productId: number) => `/products/${productId}/questions`,

      questions: {
        questionRoot: (productId: number, questionId: number) =>
          `/products/${productId}/questions/${questionId}`,

        question: {
          answersRoot: (productId: number, questionId: number) =>
            `/products/${productId}/questions/${questionId}/answers`,

          answers: {
            answer: (productId: number, questionId: number, answerId: number) =>
              `/products/${productId}/questions/${questionId}/answers/${answerId}`,
          },
        },
      },
    },
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
