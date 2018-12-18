<p>&nbsp;</p>
<p align='center'>
  <img src="http://acgfun.b0.upaiyun.com/image/ractor@300px.png" width="300" />
</p>
<h1 align="center">Ractor</h1>
<p align='center'>一个基于 action 设计的状态管理工具</p>
<p>&nbsp;</p>

## 安装

```sh
npm i ractor
```

## 快速了解 Ractor

Ractor 仅仅包含三个基本概念，您只需要熟悉这三样东西就能彻底掌握 Ractor 的用法。

### System
和其他库有所区别， Ractor 的事件系统和逻辑系统是分开的，需要单独创建。一般情况下，您只需要为你的 App 创建一个事件系统。


```ts
import { System } from "ractor";
export const system = new System("counter");
```

### Action

类似 Redux 的 action，不过 Ractor 需要用 class 创建它。

```ts
export class Increment {}
```

### Store

通俗的说，你可以把 Ractor 的 Store 理解为 Redux 的 Store。唯一的区别是，Redux 的 Store 内置了一套事件分发机制，Ractor 的事件分发由 System 处理。

Store 是个抽象类，你的业务 Store 需要继承它并实现 createReceive 方法。Store 里有个很方便的工具类可以帮您构建用来处理事件的 Receive 对象。

```ts
import { Increment } from "./Increment";
import { Decrement } from "./Decrement";
import { Store } from "ractor";

export class CounterStore extends Store<{ value: number }> {
  public state = { value: 1 };
  public createReceive() {
    return this.receiveBuilder()
      .match(Increment, async () => this.setState({ value: this.state.value + 1 }))
      .match(Decrement, async () => this.setState({ value: this.state.value - 1 }))
      .build();
    }
}
```

除了 class 创建 Store 之外，Ractor 还提供了比较简单的创建方式 `createStore`

```ts
import { ReceiveBuilder } from "ractor"

const CounterStore = createStore((state, replaceState) => {
  return ReceiveBuilder
    .create()
    .match(Increment, () => replaceState(state + 1))
    .match(Decrement, () => replaceState(state - 1))
    .build()
})
```

## React

我们可以用 [ractor-react](https://github.com/huangbinjie/ractor-react) 也可以用 [ractor-hooks](https://github.com/huangbinjie/ractor-hooks) 搭配 React 使用。这里主要介绍 `ractor-hooks`。

### Provider
在这里注入 system

```ts
  import { Provider } from "ractor-hooks"
  import { System } from "ractor"

  function App() {
    return <Provider system={new System("app")}><Counter /></Provider>
  }
```

### useStore
输入 Ractor Store 的子类作为参数，输出实例化之后的状态。

```ts
function Counter() {
  const counter = useStore(CounterStore)
  return jsx
}
```

### useSystem
输出 `Provider` 注入的 system。建议直接倒入 system，不太建议使用这种方式获取 system。

```ts
function Counter() {
  const system = useSystem(CounterStore)
  system.dispatch(new Increment)
  return jsx
}
```

## Examples

+ [class store counter](https://stackblitz.com/edit/ractor-hooks)
+ [functional store counter](https://stackblitz.com/edit/ractor-hooks-createstore?file=index.js)
