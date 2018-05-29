import { ActorSystem, AbstractActor, ActorRef } from "js-actor"

export class System extends ActorSystem {
  constructor(name: string) {
    super(name)
  }

  public dispatch(message: object) {
    const rootChildren = this.getRoot().getContext().children
    tellChildren(rootChildren, message)
  }
}

function tellChildren(children: Map<string, ActorRef>, message: object) {
  for (let storeRef of children.values()) {
    storeRef.tell(message)
    const nextChildren = storeRef.getContext().children
    if (nextChildren.size > 0) {
      tellChildren(nextChildren, message)
    }
  }
}
