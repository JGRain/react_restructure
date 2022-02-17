import React from 'react'
import ReactDOM from 'react-dom'
/**
 * 竞态
 *
 */
const API = {
	// 1 4000 2 3000 3 2000 4 1000
	async fetchArticle(id) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ id, title: `title_${id}` })
			}, 1000 * (5 - id))
		})
	},
}
function Article({ id }) {
	const [article, setArticle] = React.useState({})
	React.useState(() => {
		console.log(id)
		// let didCancel = false // 定义一个变脸记录此请求是否取消了
		async function fetchData() {
			const articleData = await API.fetchArticle(id)
			// 如果没有取消，我就赋值，如果取消了，就不赋值了
			// if (!didCancel) setArticle(articleData)
			setArticle(articleData)
		}
		fetchData()
		// return () => {
		// 	// 销毁函数
		// 	didCancel = true
		// }
	}, [id])
	return (
		<div>
			<p>{article.title}</p>
		</div>
	)
}
function App() {
	let [id, setId] = React.useState(1)
	return (
		<div>
			<p>id:{id}</p>
			<Article id={id} />
			<button onClick={() => setId(id + 1)}>改变ID</button>
		</div>
	)
}
function render() {
	ReactDOM.render(
		<>
			<App />
		</>,
		document.getElementById('root')
	)
}
render()

/**  
 * (alias) useMemo<{
    number: number;
}>(factory: () => {
    number: number;
}, deps: React.DependencyList): {
    number: number;
}
 * 
 * 
 * 
*/
