import { Todo } from "../types/Todo"

export type Todos = {
	todos: Todo[]
	display: string
}

export const getByCache = () => new Promise<Todos | null>((resolve, reject) => {
	const todos = localStorage.getItem("reactor-todo")
	if (typeof todos === "string") {
		resolve(JSON.parse(todos))
	} else {
		resolve(null)
	}
})