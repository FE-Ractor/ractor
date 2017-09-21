import { AbstractActor, Receive } from "js-actor"

export class Store<S> extends AbstractActor {
	public state = {} as S
	public setState: (state: Partial<S>, callback?: () => void) => void
}
