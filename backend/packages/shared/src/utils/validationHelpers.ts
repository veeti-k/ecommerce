export const validateString = (obj: any, key: string) => {
  if (!Object.keys(obj).includes(key)) {
    return `'${key}' is required`;
  } else if (typeof obj[key] !== "string") {
    return `'${key}' must be a string`;
  }
};

export const validateNumber = (obj: any, key: string) => {
  if (!Object.keys(obj).includes(key)) {
    return `'${key}' is required`;
  } else if (typeof obj[key] !== "number") {
    return `'${key}' must be a number`;
  } else if (obj[key] < 0) {
    return `'${key}' must be a positive number`;
  }
};

export const validateBoolean = (obj: any, key: string) => {
  if (!Object.keys(obj).includes(key)) {
    return `'${key}' is required`;
  } else if (typeof obj[key] !== "boolean") {
    return `'${key}' must be a boolean`;
  }
};

export const validateArray = (obj: any, key: string) => {
  if (!Object.keys(obj).includes(key)) {
    return `'${key}' is required`;
  } else if (!Array.isArray(obj[key])) {
    return `'${key}' must be an array`;
  }
};
