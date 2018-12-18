# Changelog

## 1.1.2

+ new function `createStore` helps you create store quickly.
+ export `ReceiveBuilder` from dependent module `js-actor`.

## 1.1.1

+ state is optional. if state is primitive value, null, undefined, setState should replace state with it.

## 1.0.14

+ upgrade js-actor to 1.1.5

## 1.0.13

+ fix: Dispatch calls the tell multiple times would cause the eventStream emit the same times.
+ feat: change the property state to `abstract`.

## 1.0.12

+ drop the system options

## 1.0.11

+ feat: change the mechanism of Dispath. Dispatch now will map the children to find the instance to tell.
+ feat: new system options `withStoreEvent`. if `withStoreEvent` is true, the lifecycles of store will dispatch StoreEvent.