import { test } from "ava"
import { Subject } from "rxjs"
import { Store } from "../src/Store"

test("store should support subscribe to observer of rxjs", t => {
  const subject = new Subject
  const store: Store<{ value: 1 }> = new Store
  store.subscribe(subject)
  subject.subscribe((state: { value: number }) => t.is(state.value, 1))
  store.setState({value: 1})
})