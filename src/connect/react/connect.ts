import * as React from "react"
import { ActorRef, Receive, ReceiveBuilder } from "js-actor"
import { system } from "../../system"
import { Store } from "../../Store"

export function connect<S extends object>(store: new () => Store<S>) {
	return function <P>(component: React.ComponentClass<P>): any {
		return class ConnectedComponent extends React.Component<P, S> {
			private actorRef: ActorRef
			private actor: Store<S>
			constructor() {
				super()
				this.actor = new store()
				this.state = this.actor.state
				this.actor.setState = (state: Pick<S, keyof S>, callback: () => void) => {
					this.actor.state = Object.assign(this.actor.state, state)
					this.setState(state, callback)
				}
			}
			public componentWillUnmount() {
				system.stop(this.actorRef)
			}
			public componentDidMount() {
				this.actorRef = system.actorOf(this.actor, "__store__")
			}
			public render() {
				return React.createElement(component, Object.assign({}, this.props, this.state))
			}
		}
	}
}
