import * as React from "react"
import { connect } from "../../../src/connect/react"
import { CounterStore } from "../behaviors/counterStore"
import { dispatch } from "../../../src/index"
import { Increment } from "../messages/Increment"
import { Decrement } from "../messages/Decrement"

@connect(CounterStore)
export class Counter extends React.Component<{ value: number }> {
	public render() {
		return (
			<p>
				Clicked: {this.props.value} times
			{' '}
				<button onClick={() => dispatch(new Increment)}>
					+
			</button>
				{' '}
				<button onClick={() => dispatch(new Decrement)}>
					-
			</button>
				{' '}
				<button onClick={this.incrementIfOdd}>
					Increment if odd
			</button>
				{' '}
				<button onClick={this.incrementAsync}>
					Increment async
			</button>
			</p>
		)
	}

	public incrementIfOdd = () => {
		if (this.props.value % 2 === 1) {
			dispatch(new Increment)
		}
	}

	public incrementAsync = () => {
		setTimeout(() => dispatch(new Increment), 1000)
	}
}