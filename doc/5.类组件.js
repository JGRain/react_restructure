import React from './react'
import ReactDom from './react-dom'
let root = document.getElementById('root')
/**
 * 1.React元素可能是一个字符串(原生dom类型)，也可能是一个函数（函数组件），也可能是一个类（类组件）
 * 2.再定义组件元素的时候，会把jsx所有的属性封装成一个props对象传递给组件
 * 3.组件名称一定要首字符大写，React是通过首字符来区分原生还是自定义组件
 * 4.组件要先定义，在使用
 * 5.组件要返回并且只有一个React根元素，jSx expressions must have one parent element
 *
 * 类组件如何渲染
 * 1.element定义一个类组件React元素
 * 2.render 1. 县创建类组件的实例new Welcome（props）,this.props=props;
 * 3.       2. 调用实例的render方法得到一个React元素
 *          3. 把这个React元素插入大屏
 */
class Welcome extends React.Component {
	render() {
		return <h1>weclome ,{this.props.name}</h1>
	}
}
ReactDom.render(<Welcome name="123" />, root)

/**
 * jsx = React.creatElement
 * 在浏览器执行的时候，createElement方法返回值才是React元素=虚拟dom
 * jsx是一种语法2，或者是一种写代码的方法，打包时候会进行编译，编译成react.createElement
 * React,createElement 只是创建react元素的方法
 * react元素=虚拟dom 也就是一个普通的jsx对象，描述了真实dom的样子
 * React元素,是不是jsx就是react元素
 * **/
