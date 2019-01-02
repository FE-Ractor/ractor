import { IActorReceive, ActorRef } from "js-actor";
import { Store } from "./Store";

type CreateReceive<S> = (getState: () => S, setState: (nextState: S) => void) => IActorReceive

/**
 * @param createReceive 
 * @param initialState 
 */
export function createStore<S>(createReceive: CreateReceive<S>, initialState?: S, name?: string): new () => Store<S> {
  const store = class extends Store<S> {
    public state = initialState as S
    public createReceive() {
      return createReceive(() => this.state, this.replaceState.bind(this))
    }
  }

  Object.defineProperty(store, "name", {
    value: name || createReceive.name
  })

  return store
}
