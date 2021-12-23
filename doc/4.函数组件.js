import React from './react'
import ReactDom from './react-dom'
let root = document.getElementById('root')
/**
 * 1、定义一个React元素，也就是 虚拟dom他的type=Welcome
 * 2.render方法会执行这个welcome函数，并传入props对象，得到返回的虚拟dom
 * 3、把返回的虚拟dom转化成正式dom并插入到
 * @param {*} porps
 * @returns
 */
function Hello(props) {
	return <h1>{props.name}</h1>
}
function Welcome(porps) {
	return (
		<h1>
			hellow, <Hello name={porps.name} />
		</h1>
	)
}
// type = 字符串的话说明是一个原生dom类型 span h1 div
// type =函数的话，说明他是一个函数组件
// let element = React.createElement(Welcome, { className: 'title' })
let element = <Welcome name="title" />
console.log(JSON.stringify(element, null, 2))
ReactDom.render(element, root)
