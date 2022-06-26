interface Errors {
  [key: string]: string | null;
}

// const authErrorPrefix = "Login failed.";

const authErrors: Errors = {
  SessionRequired: null,
};

export const getAuthError = (key?: string) => {
  if (!key) return null;

  const error = authErrors[key];
  if (typeof error === "undefined")
    return "Hmm, something went wrong. Please try again.";

  return authErrors[key];
};
