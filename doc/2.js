const babel = require('@babel/core')
// const babel = require('@babel/plugin-transform-react-jsx')
const sourceCode = `<h1 id='title'><span>world</span></h1>`
const result = babel.transform(sourceCode, {
	plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
})

console.log(result.code)
