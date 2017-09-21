import { Store } from "../../../src"
import { getByCache, Todos } from "../apis/cache"
import { Todo } from "../types/Todo"

import { InitTodos } from "../messages/InitTodos"
import { ChangeDisplay } from "../messages/ChangeDisplay"
import { AddTodo } from "../messages/AddTodo"
import { ToggleToto } from "../messages/ToggleTodo"
import { DestroyTodo } from "../messages/DestroyTodo"
import { ClearCompleted } from "../messages/ClearCompleted"

export type TodoState = Todos

export class TodoStore extends Store<Todos> {
	public state: Todos = {
		todos: [],
		display: "all"
	}
	public createReceive() {
		return this.receiveBuilder()
		// 初始化
			.match(InitTodos, () => {
				getByCache().then(todos => {
					if (todos) {
						this.setState(todos)
					}
				})
			})
			// 增加todo
			.match(AddTodo, addTodo => {
				const todos = [...this.state.todos, addTodo.todo]
				this.setState({ todos }, () => localStorage.setItem("reactor-todo", JSON.stringify(this.state)))
			})
			// 切换 todo 状态。active，completed
			.match(ToggleToto, toggleTodo => {
				const todos = [...this.state.todos]
				const todo = todos[toggleTodo.todoIndex]
				const todoStatus = todo.status === "active" ? "completed" : "active"
				todo.status = todoStatus
				this.setState({ todos }, () => localStorage.setItem("reactor-todo", JSON.stringify(this.state)))
			})
			// 切换要显示的 todos 状态。all， active， completed
			.match(ChangeDisplay, changeDisplay => this.setState({ display: changeDisplay.display }, () => localStorage.setItem("reactor-todo", JSON.stringify(this.state))))
			.match(DestroyTodo, destroyTodo => {
				const todos = [...this.state.todos]
				todos.splice(destroyTodo.todoIndex, 1)
				this.setState({ todos }, () => localStorage.setItem("reactor-todo", JSON.stringify(this.state)))
			})
			// 清楚已完成的todos
			.match(ClearCompleted, () => {
				const todos = this.state.todos.filter(todo => todo.status !== "completed")
				this.setState({ todos }, () => localStorage.setItem("reactor-todo", JSON.stringify(this.state)))
			})
			.build()
	}
}