import { NextFunction, Request, Response } from "express";

export type Endpoint = {
  (req: Request, res: Response, next: NextFunction): Promise<any> | Promise<void> | any | void;
};
