import { ActorSystem } from "js-actor"

export class System extends ActorSystem {
  constructor(name: string, maxListener?: number) {
    super(name, maxListener)
  }
  public dispatch(message: object) {
    super.tell("__store__", message)
  }
}
