import { IActorReceive } from "js-actor";
import { Store } from "./Store";

type CreateReceive = (state: any, setState: (nextState: any) => void) => IActorReceive

/**
 * Due to the closure will keep the old state, we need to recall it at every call. 
 * So createStore will create a child store to process task after receive any action then stop it.
 * 
 * @param createReceive 
 * @param initialState 
 */
export function createStore<S>(createReceive: CreateReceive, initialState?: any): new () => Store<S> {
  return class extends Store<S> {
    public state = initialState
    public createReceive() {
      return this.receiveBuilder()
        .matchAny(obj => {
          const receive = createReceive(this.state, (nextState: any) => {
            this.replaceState(nextState)
            childRef.getActor().context.stop()
          })
          const Child = createChildProcessor(receive)
          const childRef = this.context.actorOf(new Child)
          childRef.tell(obj)
        })
        .build()
    }
  }
}

function createChildProcessor(receive: IActorReceive): new () => Store<any> {
  return class ChildProcessor extends Store<any> {
    createReceive() {
      return receive
    }
  }
}