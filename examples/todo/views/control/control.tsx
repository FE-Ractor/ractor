import * as React from "react"
import { dispatch } from "ractor"
import { Todo } from "../../types/todo"
import { ChangeDisplay } from "../../messages/ChangeDisplay"
import { ClearCompleted } from "../../messages/ClearCompleted"

type Props = {
	display: string
	todos: Todo[]
}

export class Control extends React.Component<Props, {}> {
	public render() {
		const { display, todos } = this.props
		return (
			<footer className="footer">
				<span className="todo-count"><strong>{todos.filter(item => item.status === "active").length}</strong> item left</span>
				<ul className="filters">
					<li>
						<a className={display === "all" ? "selected" : ""} href="#/" onClick={this.show("all")}>All</a>
					</li>
					<li>
						<a className={display === "active" ? "selected" : ""} href="#/active" onClick={this.show("active")}>Active</a>
					</li>
					<li>
						<a className={display === "completed" ? "selected" : ""} href="#/completed" onClick={this.show("completed")}>Completed</a>
					</li>
				</ul>
				<button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
			</footer>
		)
	}

	private clearCompleted = () => {
		dispatch(new ClearCompleted)
	}
	
	private show = (display: string) => () => dispatch(new ChangeDisplay(display))
}