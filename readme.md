# Reactor

在 flux 之后的所有方案里，store = event system. 还是 redux 的味道，不过 redux 提倡的 single store 在这里指的是 system.eventStream，而 redux 的 reducer 在这里约等于 store。同是事件系统，redux 对 event handler 的建模没我 powerful(reducer vs actor)。

## 安装

```shell
npm i ractor
```

## API

Reactor 只有3个概念，`System`, `Store` 和 `action`.

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

### System

system 指的就是一个小型的事件系统，一般情况下，你需要手动给你的每一个 app 创建一个 event system。对于包含多个子项目的系统，你又可以让子项目共享一个事件系统，这取决于你的设计。

```ts
const system = new System("app")
```

### Store

Store 有点像 mobx 的 store，一种状态和行为的集合: `new Store(state, behavior)`。

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

## React

[https://github.com/huangbinjie/ractor-react](https://github.com/huangbinjie/ractor-react)

## angular

[https://github.com/huangbinjie/ractor-angular](https://github.com/huangbinjie/ractor-angular)

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
    // store 启动之后监听系统事件中心
    this.context.system.eventStream.on("*", this.loggerListener) 
  }

  public postStop() {
    // store 停止的时候记得注销监听，防止内存泄露
    this.context.system.eventStream.off("*", this.loggerListener)
  }
```

之后自己的 store 继承这个 `LoggerStore` 就有打印日志功能啦

## 之后的规划

暂无

## 最后

[知乎链接](https://zhuanlan.zhihu.com/p/30443458)
