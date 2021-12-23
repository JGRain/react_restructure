import React from './react'
import ReactDom from './react-dom'
let root = document.getElementById('root')
let element = React.createdElement(
	'h1',
	{
		className: 'title',
		style: {
			color: 'red',
		},
	},
	React.createdElement('span', null, 'hello'),
	'world'
)
ReactDom.render(element, root)
