import React from 'react';
import ReactDOM from 'react-dom';

// createElement返回react元素
/**
 * 参数1 标签类型 h1 span div
 * 参数2 属性
 * 参数3 往后的都是儿子们
 * */
let element = (
  <h1 className="title" style={{ color: 'red' }}>
    Hellow<span>world</span>
  </h1>
);
console.log(JSON.stringify(element, null, 2));
// 会把你这个React元素，也就是常熟的虚拟dom转换成真实dom并插入到页面中Root容器中去

// ReactDOM才是最核心干活的，它在浏览器里执行的时候吗，可以把React元素，也就是虚拟dom转换成真实DOM
ReactDOM.render(element, document.getElementById('root'));

/**  
 * 就是一个普通的js对象，就是虚拟dom
{
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {
    "children": "hellow"
  },
  "_owner": null,
  "_store": {}
}
*/
/**
 * 你以前在写js
 * JSX很像html，更像js，而非html 里面的写法更多的是JS写法 doucment.getElementById('root').className='title'
 *
 * <h1>Hellow</h1>非常直观
 * createElement 不是那么直观
 * jsx在webPack打包的时候会走babel-loader，babel-loader会把jsx转义成createElement
 * 真正浏览器跑的时候就是createElement，在浏览器里运行的时候，才会执行createElement方法得到虚拟DOM
 * react元素=虚拟DOM
 *
 * */
