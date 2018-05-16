import { Store } from "../Store"

export class StorePostError {
  constructor(public store: Store<any>, public error: Error) { }
}