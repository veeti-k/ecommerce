export type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

export type ResolvedCategory = {
  id: number;
  name: string;
  parentId: number | null;
  children: ResolvedCategory[];
};

export type bulletPoint = {
  id: string | null;
  text: string;
};
export const bulletPointDefaultValue = { id: null, text: "" };

export type imageLink = {
  id: string | null;
  link: string;
};
export const imageLinkDefaultValue = { id: null, link: "" };

export type ShowCaseProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  discountAmount: number;
  isDiscounted: boolean;
  isDeleted: boolean;
  averageStars: number;
  reviewCount: number;
  questionCount: number;
  bulletPoints: bulletPoint[];
  images: imageLink[];
};

export type ProductPageProduct = {
  path: Category[];
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  discountAmount: number;
  isDiscounted: boolean;
  isDeleted: boolean;
  averageStars: number;
  reviewCount: number;
  questionCount: number;
  bulletPoints: bulletPoint[];
  images: imageLink[];
};

export type Address = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
};
