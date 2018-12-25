<p>&nbsp;</p>
<p align='center'>
  <img src="http://acgfun.b0.upaiyun.com/image/ractor@300px.png" width="300" />
</p>
<h1 align="center">Ractor</h1>
<p align='center'>Another action based state management tool</p>
<p>&nbsp;</p>

[中文文档](https://github.com/FE-Ractor/ractor/blob/master/readme.cn.md)

## Install

```sh
npm i ractor
```

## Quick Start

Ractor builds upon three main ideas.

### System

System is an event system. Normally, You need to create one for your logic app.

```ts
import { System } from "ractor";
export const system = new System("counter");
```

### Message

The abstraction of system behavior. You can create it by class.

```ts
export class Increment {}
```

### Store

Conceptually, your can think of Store like a event handler or redux’s reducer.

Store is an abstract class, abstract method createReceive needs to return an Receive object. There is a convenient helper method `receiveBuilder` to help you to create Receive object

```ts
import { Increment } from "./Increment";
import { Decrement } from "./Decrement";
import { Store } from "ractor";

export class CounterStore extends Store<{ value: number }> {
  public state = { value: 1 };
  public createReceive() {
    return this.receiveBuilder()
      .match(Increment, async () =>
        this.setState({ value: this.state.value + 1 }))
      .match(Decrement, async () =>
        this.setState({ value: this.state.value + 1 }))
      .build();
    }
}
```

There is a convenient function `createStore` to createStore quickly.

```ts
import { ReceiveBuilder } from "ractor"

const CounterStore = createStore((getState, setState) => {
  return ReceiveBuilder
    .create()
    .match(Increment, () => setState(getState() + 1))
    .match(Decrement, () => setState(getState() - 1))
    .build()
}, 0)
```

## React

There is the quick glance of [ractor-hooks](https://github.com/huangbinjie/ractor-hooks)

### Provider

Create an event system for your App.

```ts
  import { Provider } from "ractor-hooks"
  import { System } from "ractor"

  function App() {
    return <Provider system={new System("app")}><Counter /></Provider>
  }
```

### useStore

Inject Store to your component, return the state of the store which had injected.

```ts
function Counter() {
  const counter = useStore(CounterStore)
  return jsx
}
```

### useSystem

Take the system out of current context.

```ts
function Counter() {
  const system = useSystem(CounterStore)
  return <button onClick={() => system.dispatch(new Increment)}>+</button>
}
```

## Examples

+ [counter](https://stackblitz.com/edit/ractor-hooks)
