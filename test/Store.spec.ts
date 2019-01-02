import test from "ava"
import { Subject } from "rxjs"
import { Store } from "../src/Store"
import { createStore } from "../src/createStore"
import { ReceiveBuilder, System } from "../src"

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

test.cb("createStore", t => {
  const system = new System("test")
  class Increment { }
  class Decrement { }
  class TimeoutIncrement { constructor(public time: number) { } }

  const CounterStore = createStore(function (getState, setState) {
    return ReceiveBuilder
      .create()
      .match(Increment, () => setState(getState() + 1))
      .match(Decrement, () => setState(getState() - 1))
      .match(TimeoutIncrement, ({ time }) => setTimeout(() => setState(getState() + 1), time))
      .build()
  }, 0)
  const store = new CounterStore
  const storeRef = system.actorOf(store)
  storeRef.tell(new Increment)
  t.is(store.state, 1)
  system.dispatch(new Decrement)
  t.is(store.state, 0)
  system.dispatch(new TimeoutIncrement(100))
  setTimeout(() => {
    t.is(store.state, 2)
    t.end()
  }, 200)
  system.dispatch(new Increment)
})

test("name", t => {
  var any1 = createStore(function counterStore1() {
    return ReceiveBuilder.create().build()
  })
  t.is(any1.name, "counterStore1")

  var any2 = createStore(() => ReceiveBuilder.create().build(), 0, "counterStore2")
  t.is(any2.name, "counterStore2")

  class CounterStore extends Store<any> {
    createReceive() {
      return this.receiveBuilder().build()
    }
  }
  t.is(CounterStore.name, "CounterStore")
})
