import { DocumentStuff } from "../documentStuff";

export interface IProduct {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  isDeleted: boolean;
  categoryId: string;
  bulletPoints: string[];
  images: string[];

  averageStars: number;
  reviewCount: number;
  questionCount: number;
}

export type ProductDocument = IProduct & DocumentStuff;
