import { ActorSystem, AbstractActor, ActorRef } from "js-actor"

export class System extends ActorSystem {
  constructor(name: string) {
    super(name)
  }

  public dispatch(message: object) {
    this.eventStream.emit("*", message)
  }
}

