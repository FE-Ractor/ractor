import * as React from "react"
import { ActorRef, Receive, ReceiveBuilder } from "js-actor"
import { system } from "../../system"
import { Store } from "../../Store"

export function connect<S extends object>(store: new () => Store<S>) {
	return function <P>(component: React.ComponentClass<P>): any {
		return class ConnectedComponent extends React.Component<P, S> {
			private actorRef: ActorRef
			private actor: Store<S>
			private unsubscribe: () => void

			constructor() {
				super()
				this.actor = new store()
				this.state = this.actor.state
			}
			public componentWillUnmount() {
				// 从系统中移除并停止我们的 store
				system.stop(this.actorRef)
				// 取消监听 store, 这个取消操作是否可以省略？
				this.unsubscribe()
			}
			public componentDidMount() {
				// 为系统安装我们的 store
				this.actorRef = system.actorOf(this.actor, "__store__")
				// 订阅已经启动的 store，监听 store 的状态变化
				this.unsubscribe = this.actor.subscribe((state, callback) => {
					this.setState(state, callback)
				})
			}
			public render() {
				return React.createElement(component, Object.assign({}, this.props, this.state))
			}
		}
	}
}
