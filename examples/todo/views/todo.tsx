import * as React from "react"
import { render } from "react-dom"
import { connect, dispatch } from "../../../src"
import { Header } from "./header/header"
import { List } from "./list/list"
import { Control } from "./control/control"
import { TodoState, TodoStore } from "./todo.store"
import { InitTodos } from "../messages/InitTodos"

@connect(TodoStore)
export default class Todo extends React.Component<TodoState, {}> {
	public componentDidMount() {
		setTimeout(() => dispatch(new InitTodos), 0)
	}
	public render() {
		return (
			<section className="todoapp">
				{Header(this.props.todos)}
				<List todos={this.props.todos} display={this.props.display} />
				<Control display={this.props.display} todos={this.props.todos} />
			</section>
		)
	}
}
