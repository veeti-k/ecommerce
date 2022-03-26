export type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

export type BulletPoint = {
  id: number;
  text: string;
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
  importantBulletpoints: BulletPoint[];
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
  importantBulletpoints: BulletPoint[];
  bulletPoints: BulletPoint[];
};
