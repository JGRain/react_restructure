
import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(<h1>hello</h1>, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

// let Element = React.createElement('h1', null, 'hello ')
// let Element = (
// 	<h1 className="title" style={{ color: 'red' }}>
// 		<span>Hello </span>world
// 	</h1>
// )

let Element = React.createElement(
	'h1',
	{
		className: 'title',
		style: {
			color: 'red',
		},
	},
	React.createElement('span', null, 'hello'),
	'world'
)
console.log(JSON.stringify(Element, null, 2))
// 会把react元素转化成真实dom并插入到页面root容器中去
ReactDOM.render(Element, document.getElementById('root'))

/**
 * 就是一个普通的js对象，就是虚拟DOM
 * {
 *  'type': 'h1',
 *  'props': {
 *    "children": 'Hello'
 *  }
 * }
 */
/**
 *你以前在写js
 * jsx很像html,更像js，而非html，里面的写法更多的是js写法  document.getElementById('rooot')
 *  <h1>hellow</h1>非常直观
 * createElement不是那么直观
 * JSX在webapack大巴的时候，会走babel-loader，babel-;oader会把jsx转译成从reactElement
 *
 */

