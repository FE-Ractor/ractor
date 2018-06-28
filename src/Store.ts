import { AbstractActor, ActorContext, IActorReceive } from "js-actor"
import { System } from "./System"

export interface StoreContext extends ActorContext {
	system: System
}
export abstract class Store<S> extends AbstractActor {
	private listeners: Array<Listener<S> | Observer<S>> = []
	public state = {} as S
	public context!: StoreContext

	/**
	 * listener can be function or observer of rxjs
	 * @param listener 
	 */
	public subscribe(listener: (Listener<S> | Observer<S>)): Subscription {

		if (typeof listener === "object" && listener.next) {
			this.listeners.push(listener)
			listener.next(this.state)
		} else if (typeof listener === "function") {
			this.listeners.push(listener)
			listener(this.state)
		} else {
			throw TypeError("expected the listener to be a function or observer.")
		}

		return {
			unsubscribe: () => {
				const index = this.listeners.indexOf(listener)
				this.listeners.splice(index, 1)
			}
		}
	}

	/**
	 * setState is sync.
	 * @param nextState 
	 */
	public setState(nextState: Partial<S>) {
		this.state = Object.assign({}, this.state, nextState)
		for (let listener of this.listeners) {
			if (typeof listener === "function") {
				listener(this.state)
			} else {
				listener.next(this.state)
			}
		}
	}
}


export type Listener<S> = (state: S) => void
export type Observer<S> = {
	next: (state: S) => void
}
export type Subscription = {
	unsubscribe: () => void
}