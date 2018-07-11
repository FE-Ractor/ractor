import { ActorSystem } from "js-actor"

export class System extends ActorSystem {
  constructor(name: string) {
    super(name)
  }

  public dispatch(message: object, volumn: number) {
    this.broadcast(message, volumn)
  }
}
