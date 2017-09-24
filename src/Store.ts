import { AbstractActor, Receive } from "js-actor"

export class Store<S> extends AbstractActor {
	public state = {} as S
	public listeners: Listener<S>[] = []

	public subscribe(listener: Listener<S>) {
		this.listeners.push(listener)
		return () => {
			const index = this.listeners.indexOf(listener)
			this.listeners.splice(index, 1)
		}
	}

	public setState(nextState: Partial<S>, callback?: () => void) {
		Object.assign(this.state, nextState)
		for (let listener of this.listeners) {
			listener(this.state, callback)
		}
	}
}


export type Listener<S> = (state: S, callback?: () => void) => void