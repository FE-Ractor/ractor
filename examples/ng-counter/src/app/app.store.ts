import { Injectable } from "@angular/core"
import { Store } from "ractor"
import { Increment } from "./Increment"
import { Decrement } from "./Decrement"

@Injectable()
export class AppStore extends Store<{ value: number }> {
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
