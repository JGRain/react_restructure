import React from 'react'
import ReactDOM from 'react-dom'

let virtualDom = (
	<div id="A1" key="A1">
		<div id="B1" key="B1"></div>
		<div id="B2" key="B2"></div>
	</div>
)

function FunctionComponent(props) {
	return virtualDom
}
class ClassComponent extends React.Component {
	render() {
		return virtualDom
	}
}

let functionVirtualDom = <FunctionComponent></FunctionComponent>
let classVirtualDom = <ClassComponent></ClassComponent>
console.log('virtualDom', functionVirtualDom, classVirtualDom)
ReactDOM.render(functionVirtualDom, document.getElementById('root'))
