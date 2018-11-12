# Ractor

Ractor is an event system based and multiple stores architecture state management for frontend app that inspired by Redux and Akka Actor.

## Motivation

I'm big fan of Redux. It's concept is perfect but i don't like something in Redux.

### Pure Reducer

I know pure is good(eg. suitable for test and debug). But it's a little tied to separate a impure action to two files(reducer and middleware). It's more convenient for me or other people to write the impure actions in most scenarios. Pure and Impure has its own advantages. I tend to write impure ”reducer“ due to the es7 asynchronous function.

### Dialog Problem

Imagine you have a page A and a component Dialog rendered in A. In A, you have a button that want to tell Dialog to open. Now switch page A to page B, you should to unmount Dialog.

How do you do this with redux?

In Redux way, you need to initialize a Dialog state in redux store. But if switch A to B, Dialog has unmounted, the Dialog state is still in redux store. It's the problem.

In Ractor way, we can dynamic mount and unmount the "reducer".

### State Problem

After you create a new action in your component. At this moment, You know what part of the state was modified. However you can do nothing to tell your state consumer to just receive this part of state. 

In Redux way, your should merge your state to redux, then your component will receive the whole state and recognize the state that you just merged into redux. 

In Ractor, we can just update the specifical state due to the multiple store architecture.

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

## React

With react, we can use [ractor-react](https://github.com/huangbinjie/ractor-react) to connect react component to ractor event system.

### Provider

The Provider is a hight order component to connect system and stores. Then provide the event system to our react app. You need to use it once when you render the root component.

```ts
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "ractor-react";
import { system } from "./system";
import { CounterStore } from "./CounterStore";
import { Counter } from "./Counter";

render(
  <Provider system={system} stores={[CounterStore]}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);
```

### Providers

The Providers is also a HOC. Providers can subscribe multiple stores that you passed. When you call setState in one of them, you component will receive the new state.

```ts
import { Providers } from "ractor-react";
import { CounterStore } from "./CounterStore";

@Providers([ CounterStore ])
export class Counter extends React.Component<{ value?: number }>
```

### Dispatch

Dispatch message to system is also simple.

```ts
import { system } from "./system";

system.dispatch(new Increment());
```

## Demos

+ [counter](https://codesandbox.io/s/olr841rqvz)

## Document

Please open [this](https://corol.gitbooks.io/ractor/content/) for detail document and usage.
