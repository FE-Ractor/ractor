import { test } from "ava"
import { Subject } from "rxjs"
import { Store } from "../src/Store"

class TestStore<S> extends Store<S> {
  public createReceive() {
    return this.receiveBuilder().build()
  }
}

test("store should support subscribe to the observer of rxjs", t => {
  const subject = new Subject<{ value: number }>()
  const store = new TestStore<{ value: 1 }>()
  store.subscribe(subject)
  subject.subscribe(state => t.is(state.value, 1))
  store.setState({ value: 1 })
})