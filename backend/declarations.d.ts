import { IUserDocument } from "./src/models";
declare global {
  declare namespace Express {
    export type User = IUserDocument;
  }
}
