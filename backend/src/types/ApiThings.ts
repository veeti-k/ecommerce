import { NextFunction, Request, Response } from "express";

export interface Endpoint {
  (req: Request, res: Response): Promise<any> | Promise<void> | any | void;
}

export interface Middleware {
  (req: Request, res: Response, next: NextFunction): Promise<any> | Promise<void> | any | void;
}
