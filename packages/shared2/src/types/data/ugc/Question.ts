import { DocumentStuff } from "../documentStuff";

export interface IQuestion {
  productId: string;
  nickname: string;
  title: string;
  content: string;
  isApproved: boolean;
}

export interface IQuestionAnswer {
  questionId: string;
  productId: string;
  nickname: string;
  content: string;
  byEmployee: boolean;
  isApproved: boolean;
}

export type QuestionDocument = IQuestion & DocumentStuff;
export type QuestionAnswerDocument = IQuestionAnswer & DocumentStuff;
