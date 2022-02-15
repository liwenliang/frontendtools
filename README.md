## 简介

这个项目是使用`https://vvbin.cn/doc-next/`项目改造而成，使用的是它的 electron 版本，目的是希望能够解决一些本地化开发的效率问题；使用了最新的`vue3`,`vite2`,`TypeScript`等主流技术开发，同时也是为了学习参考而创建的项目。

## 运行开发

`yarn dev:app`

## nodejs 版本

执行`yarn build:app`能够打包成功的 nodejs 版本，目前试着只有 v14.19.0

## 代码提交规范

- 参考 vue 规范 (Angular)
  - feat 增加新功能
  - fix 修复问题/BUG
  - style 代码风格相关无影响运行结果的
  - perf 优化/性能提升
  - refactor 重构
  - revert 撤销修改
  - test 测试相关
  - docs 文档/注释
  - chore 依赖更新/脚手架配置修改等
  - workflow 工作流改进
  - ci 持续集成
  - mod 不确定分类的修改
  - wip 开发中
  - types 类型修改

> `feat(home): add home page`
