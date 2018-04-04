# Reactor

Ractor is a event system based state management for frontend app that inspired by Redux and Akka Actor.

## Motivation

I'm a big fan of Redux. I had been used Redux for two years. It's concept is perfect but i don't like something in Redux.

#### Pure Reducer

I know pure is good(eg. suitable for test). But it's a little tied to separate a impure action to two files(reducer and middleware). It's more convenient for me or other people to write the impure actions in most scenarios. Pure and Impure has its own advantages. I tend to write impure ”reducer“ due to the es7 asynchronous function.

#### Dialog problem

Imagine you have a page A and a component Dialog rendered in A. In A, you have a button that want to tell Dialog to open. Now switch page A to page B, you should to unmount Dialog.
How do you do this with redux?
In Redux way, your need to initialize a Dialog state in redux store. But if switch A to B, Dialog has unmounted, the Dialog state is still in redux store. It's the problem.

So I made a new state management Ractor which inspired by Redux and Akka Actor.

## Install

```sh
npm i ractor
```

## Usage

Please open [this](https://corol.gitbooks.io/ractor/content/) for detail document and usage.
