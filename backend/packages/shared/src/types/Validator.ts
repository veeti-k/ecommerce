import { AtLeastOne } from "./Util";

export type Validators = AtLeastOne<{
  params: any;
  body: any;
}>;
