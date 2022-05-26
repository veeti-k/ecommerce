import { DocumentStuff } from "..";

export interface IQuestion {
  productId: string;
  nickname: string;
  title: string;
  content: string;
  isDeleted: boolean;
  isApproved: boolean;
}

export interface IQuestionAnswer {
  question: string;
  nickname: string;
  content: string;
  byEmployee: boolean;
  isDeleted: boolean;
  isApproved: boolean;
}

export type QuestionDocument = IQuestion & DocumentStuff;
export type QuestionAnswerDocument = IQuestionAnswer & DocumentStuff;
