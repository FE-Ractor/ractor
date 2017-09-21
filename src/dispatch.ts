import { system } from "./system"

export const dispatch = (message: object) => system.dispatch("__store__", message)