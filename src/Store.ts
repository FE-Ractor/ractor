import { AbstractActor, ActorContext, Receive } from "js-actor"
import { System } from "./System"

export interface StoreContext extends ActorContext {
	system: System
}
export abstract class Store<S> extends AbstractActor {
	public state = {} as S
	public context: StoreContext
	public listeners: Array<Listener<S> | Observer<S>> = []
	public abstract createReceive(): Receive

	/**
	 * 新增了对 rxjs 的 Observable 的支持，后续考虑支持 https://github.com/tc39/proposal-observable
	 * 灵感来源：https://github.com/reactjs/redux/blob/master/src/createStore.js#L209
	 * 
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
			throw TypeError("expected the listener to be an function or observer.")
		}

		return {
			unsubscribe: () => {
				const index = this.listeners.indexOf(listener)
				this.listeners.splice(index, 1)
			}
		}
	}

	/**
	 * 去掉了 callback，callback 的初衷是状态成功修改之后调用。
	 * 但是对于 store 来说， setState 是同步的而且是必定会成功的，所以这个 callback 是没有意义。
	 * 
	 * @param nextState 
	 */
	public setState(nextState: Partial<S>) {
		this.state = Object.assign({}, this.state, nextState)
		for (let listener of this.listeners) {
			if (typeof listener === "function") {
				listener(this.state)
			} else if (typeof listener === "object") {
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