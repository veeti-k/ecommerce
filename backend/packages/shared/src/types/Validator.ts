import { AtLeastOne } from "./Util";

export interface Validator {
  (obj: any): Promise<any>;
}

export type Validators = AtLeastOne<{
  params: Validator;
  body: Validator;
}>;
