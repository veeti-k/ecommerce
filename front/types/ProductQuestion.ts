export type ProductQuestionAnswer = {
  id: string;
  questionId: string;
  answerersNickname: string;
  content: string;
  createdAt: string;
  byEmployee: boolean;
};

export type ProductQuestion = {
  id: string;
  productId: number;
  questionersNickname: string;
  title: string;
  content: string;
  createdAt: string;
  answers: ProductQuestionAnswer[];
};
