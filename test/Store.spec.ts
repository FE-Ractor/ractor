import test from "ava"
import { Subject } from "rxjs"
import { Store } from "../src/Store"

test("store should support subscribe to the observer of rxjs", t => {
  class TestStore<S> extends Store<S> {
    public createReceive() {
      return this.receiveBuilder().build()
    }
  }
  const subject = new Subject<{ value: number }>()
  const store = new TestStore<{ value: 1 }>()
  store.subscribe(subject)
  subject.subscribe(state => t.is(state.value, 1))
  store.setState({ value: 1 })
})

test("replace state while state is undefined", t => {
  class TestStore extends Store<any> {
    public createReceive() {
      return this.receiveBuilder().build()
    }
  }
  const store = new TestStore
  t.is(store.state, undefined)
  store.setState({ value: 1 })
  t.deepEqual(store.state, { value: 1 })
})

test("replace state while state is null", t => {
  class TestStore extends Store<any> {
    state = null
    public createReceive() {
      return this.receiveBuilder().build()
    }
  }
  const store = new TestStore
  t.is(store.state, null)
  store.setState({ value: 1 })
  t.deepEqual(store.state, { value: 1 })
})

test("replace state while state is primitive value", t => {
  class TestStore extends Store<any> {
    state = 1
    public createReceive() {
      return this.receiveBuilder().build()
    }
  }
  const store = new TestStore
  t.is(store.state, 1)
  store.setState({ value: 1 })
  t.deepEqual(store.state as any, { value: 1 })
})