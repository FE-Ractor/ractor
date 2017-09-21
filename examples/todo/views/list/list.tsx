import * as React from "react"
import { dispatch } from "../../../../src"
import { Todo } from "../../types/todo"
import { ToggleToto } from "../../messages/ToggleTodo"
import { DestroyTodo } from "../../messages/DestroyTodo"

export class List extends React.Component<{ todos: Todo[], display: string }, {}> {
	public render() {
		const items = this.props.todos
			.filter(todo => this.props.display === "all" ? true : todo.status === this.props.display)
			.map((todo, index) => (
				<li className={todo.status} key={index}>
					<div className="view">
						<input className="toggle" type="checkbox" onChange={this.toggle(index)} checked={todo.status === "completed" ? true : false} />
						<label>{todo.value}</label>
						<button className="destroy" onClick={this.destroy(index)}></button>
					</div>
				</li>
			))
		return (
			<section className="main">
				<input className="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul className="todo-list">
					{items}
				</ul>
			</section>
		)
	}

	private toggle = (index: number) => () => {
		dispatch(new ToggleToto(index))
	}

	private destroy = (index: number) => () => {
		dispatch(new DestroyTodo(index))
	}
}
