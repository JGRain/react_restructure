import React from 'react'
import ReactDom from 'react-dom'
// 1.jsx表达式 可以吧一些表达式放在大括号里
// 表达式就是变量、常量喝运算符的组合1+2 a+b
// 属性名不能是js的关键字 class =>classname for=>htmlfort
// 2.jsx也是对象 if for中使用
let title = 'hello'
// let Element = (
// 	<h1 className={title} style={{ color: 'red' }} htmlFor="username">
// 		{title}
// 	</h1>
// )
function greeting(name) {
	if (name) {
		return <h1>hello {name}</h1>
	} else {
		return <h1>hello stranger</h1>
	}
}
// let Element = greeting('zhufeng')

let names = ['大猫', '二毛', '三毛']
let lis = names.map((name) => <li>{name}</li>)
let Element = <ul>{lis}</ul>
ReactDom.render(Element, document.getElementById('root'))
