import { AbstractActor, Receive } from "js-actor"

export class Store<S> extends AbstractActor {
	public state = {} as S
	public setState: (state: Pick<S, keyof S>, callback?: () => void) => void
}
