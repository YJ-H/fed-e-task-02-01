#### 简答
1. 
 - 简化开发流程，提高效率
 - 标准化流程 减少人为出错几率
 - 可以复用 提高团队效率
2. 我认为这是一种对前端的升格，能让前端除了业务实现之外还能有另一种选择

#### 编程
1.
```javascript
// 已经发包至npm 包名@y-pkgs/cli
// 具体逻辑代码复制到code目录下@y-pkgs
// github地址 https://github.com/YJ-H/y-packages

//安装包
yarn add @y-pkgs/cli --dev
//使用cli生成index.html文件
yarn yj-cli 
```
2.
```javascript
// 已经发包至npm 包名@y-pkgs/gulp
// 具体逻辑代码复制到code目录下@y-pkgs
// github地址 https://github.com/YJ-H/y-packages
// 在code/pages-boilerplate有具体用法
"clean": "yj-gulp clean", // 清除生成的目录
"lint": "yj-gulp lint", // 格式化文件
"serve": "yj-gulp serve", // --port 8888 --open
"build": "yj-gulp build", //生成编译文件
"start": "yj-gulp start",// 在生产模式下运行项目
"deploy": "yj-gulp deploy --production" // 部署 GitHub Pages。
```
3.
> 详见code/pages-boilerplate/gruntfile.js