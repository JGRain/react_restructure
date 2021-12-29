## 1.JSX的执行过程
1. 我们写代码的时候写的JSX`<h1>hello</h1>`
2. 打包时候，会调用webpack中的babel-loader把JSX写法转换成JS写法 createElement
3. 我们在浏览器里执行createElement，得到虚拟DOM，也就是React元素，它是一个普通的js对象，描述了你再界面上想看到的DOM元素的样式
4. 把React元素（虚拟DOM）给了ReactDOM.render,render会吧虚拟DOM转换成真实DOM，并且插入到页面


## 问题