import { ActorSystem } from "js-actor"

export class System extends ActorSystem {
  constructor(name: string) {
    super(name)
  }

  public dispatch(message: object, to = "root/", volumn = 0) {
    this.broadcast(message, to, volumn)
  }
}
