import { Store } from "../Store"

export class StorePreStart {
  constructor(public store: Store<any>) { }
}