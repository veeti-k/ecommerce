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

export type BulletPoint = {
  id: number;
  text: string;
};

export type ImageLink = {
  id: number;
  link: string;
};

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
  bulletPoints: BulletPoint[];
  images: ImageLink[];
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
  bulletPoints: BulletPoint[];
};
