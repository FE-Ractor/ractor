import * as React from "react"
import { render } from "react-dom"
import { dispatch } from "../../../src"
import { connect } from "../../../src/connect/react"
import { Header } from "./header/header"
import { List } from "./list/list"
import { Control } from "./control/control"
import { TodoState, TodoStore } from "./todo.store"
import { InitTodos } from "../messages/InitTodos"

@connect(TodoStore)
export default class Todo extends React.Component<TodoState, {}> {
	public componentDidMount() {
		// 因为 store 是在高阶组件 connect didmount 期间动态生成的。
		// 所以需要 settimeout 一下，等父组件 store 生成之后才能收到 dispatch 的 action
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
