import { Increment } from "../messages/Increment"
import { Decrement } from "../messages/Decrement"
import { Store } from "../../../src/Store"

export class CounterStore extends Store<{ value: number }> {
	public state = { value: 1 }
	public createReceive() {
		return this.receiveBuilder()
			.match(Increment, () => {
				const state = { value: this.state.value + 1 }
				this.setState(state)
			})
			.match(Decrement, () => {
				const state = { value: this.state.value - 1 }
				this.setState(state)
			})
			.build()
	}
}

