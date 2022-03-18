import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

/**
 * 如何在hooks中发起AJAX请求，以及如何实现分页加载
 * offset = 0 pageSize=5 0~4
 * offset = 5 pageSize=5 5~10
 * offset = 10 pageSize=5 10~15
 */
const PAGE_SIZE = 5
function useRequest(url) {
	let [start, setStart] = useState(0)
	let [users, setUsers] = useState([])
	async function loadMore() {
		setUsers(null)
		let pageDate = await fetch(
			`${url}?start=${start}&pageSize=${start + PAGE_SIZE}`
		).then((res) => {
			console.log('res', res)
			return res.json()
		})

		setUsers([...users, ...pageDate])
		setStart(start + PAGE_SIZE)
	}
	useEffect(loadMore, [])
	return [users, loadMore]
}
function App() {
	let [users, loadMore] = useRequest('http://localhost:8000/api/users')
	if (!users) {
		return <div>加载中。。。。。。</div>
	}
	return (
		<>
			<ul>
				{users.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
			<button onClick={loadMore}>loadMore</button>
		</>
	)
}
function render() {
	ReactDOM.render(<App />, document.getElementById('root'))
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
