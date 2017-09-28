# Reactor

类 actor + redux 的状态管理方案。基础库仅依赖我之前写的 [js-actor](https://github.com/huangbinjie/js-actor)。

## 灵感

在略大点的项目里，可控性比自由性更重要。
因为 redux 的一些特性，这通常是 redux 发挥的场景。比如，视图和行为分离，action 抽象等等。
但是 redux 的 reducer 和 store 之间的关系太松散。模块化不仅仅是低耦合，也要高内聚。所以我需要一种实现一种高内聚的模块化的表达组件的方式的同时，又要保持上面提到的视图和行为分离，action 抽象。
是的，一句话就能表达：`Component(state, view, behavior)`。

所以 ractor 不仅可以让你采用 redux 那种 domain store 的方式，也能让你采用 mobx 那种 state store 的方式完成状态管理哦

## 设计

Reactor 只有3个显式概念，`Store`, `dispatch` 和 `action`.

### Action

action 是对行为的一种抽象，它拥有充分的自我描述性，可序列化。不同于 redux 的 {type, payload}。Ractor 的 action 需要通过 class 生成。参考以下代码:

```ts
 // 定义一个 action
 class WhoToGreet {
  constructor(public who: string) {}
 }

 // 实例化 action
 new WhoToGreet("Corol")
```

### Store

Store 有点像 mobx 的 store，一种状态和行为的集合: `Store(state, behavior)`。

```ts
  class GreetingStore extends Store<{name: string}> {
    state = {name: "Corol"}

    createReceive() {
      return this.receiveBuilder()
      .match(WhoToGreet, whoToGreet => this.setState({name: whoToGreet.name}))
      .match(Greeting, greeting => console.log("Wellcome " + greeting.name))
      .build()
    }
 }
```

Store 继承自 [AbstractActor](https://github.com/huangbinjie/js-actor#abstractactor)

### dispatch

dispatch 可以往我们的事件系统中广播 action.

```ts
  dispatch(new WhoToGreet("Corol"))
```

## React

和 React 一起使用也很简单。`connect/react/connect.ts` 提供了连接 Store 和 React 的功能。它是一个高阶组件: `connect(Store)(React)`:

```ts
  @connect(TodoStore)
  class Todo extends React.Component<TodoState, {}> {}
```

## Examples

+ [counter](https://github.com/huangbinjie/reactor/tree/master/examples/counter)
+ [todo](https://github.com/huangbinjie/reactor/tree/master/examples/todo)

## 关于 middleware

既然我采用的 actor 的 oop 范式。不同于 redux 的那种组合方式的 middleware。Reactor 也可以使用继承的方式实现 middleware，比如实现一个打印日志的 store:

```ts
export class LoggerStore extends Store<{}> {

  public loggerListener = (obj: object) => {
    const date = new Date()
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:`, obj)
  }

  public preStart() {
    // 自定义一个打印日志的功能
    // store 启动的时候监听系统事件中心
    this.context.system.eventStream.on("*", this.loggerListener) 
  }

  public postStop() {
    // store 停止的时候记得注销监听，防止内存泄露
    this.context.system.eventStream.off("*", this.loggerListener)
  }
```

之后自己的业务 store 继承这个 `LoggerStore` 就有打印日志功能啦

## 之后的规划

+ 支持 Observable
+ 优化

## 最后

如果你有好的建议，请留言...
