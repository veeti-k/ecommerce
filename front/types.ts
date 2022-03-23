export type BulletPoint = {
  id: string;
  text: string;
};

export type ShowCaseProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: string;
  discountPercent: number;
  discountAmount: number;
  isDiscounted: boolean;
  isDeleted: boolean;
  averageStars: number;
  reviewCount: number;
  questionCount: number;
  importantBulletpoints: BulletPoint[];
};
