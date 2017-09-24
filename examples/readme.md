# Examples

|> 安装运行该文件夹下所有的 demo 都需要 [typescript](https://www.npmjs.com/package/typescript) 和 webpack

## 安装

先进入想要运行的 demo 文件夹

```shell
cd todo
```

安装依赖

```shell
npm i
```

编译 ts 文件

```shell
tsc
```

打包入口文件

```shell
# 需要在 demo 的根目录
webpack app.js bundle.js
```