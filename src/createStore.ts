import { IActorReceive, ActorRef } from "js-actor";
import { Store } from "./Store";

type CreateReceive<S> = (getState: () => S, setState: (nextState: S) => void) => IActorReceive

/**
 * @param createReceive 
 * @param initialState 
 */
export function createStore<S>(createReceive: CreateReceive<S>, initialState?: S): new () => Store<S> {
  return class extends Store<S> {
    public state = initialState as S
    public createReceive() {
      return createReceive(() => this.state, this.replaceState.bind(this))
    }
  }
}
