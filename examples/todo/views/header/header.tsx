import * as React from "react"
import { dispatch } from "ractor"
import { Todo } from "../../types/todo"
import { AddTodo } from "../../messages/AddTodo"

export const Header = (todos: Todo[]) =>
	<header className="header">
		<h1>todos</h1>
		<input className="new-todo" onKeyDown={onkeydown(todos)} placeholder="What needs to be done?" autoFocus={true} />
	</header>

const onkeydown = (todos: Todo[]) => (event: React.KeyboardEvent<HTMLInputElement>) => {
	const value = event.currentTarget.value
	if (value === "") return
	if (event.keyCode === 13) {
		dispatch(new AddTodo({ status: "active", value }))
	}
}