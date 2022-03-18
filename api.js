let express = require('express')
let cors = require('cors')
let app = express()
app.use(cors())

app.get('/api/users', (req, res, next) => {
	let start = parseInt(req.query.start)
	let pageSize = parseInt(req.query.pageSize)
	let users = []
	for (let index = start; index < pageSize; index++) {
		users.push({ id: `${index + 1}`, name: `name_${index}` })
	}
	setTimeout(() => {
		res.json(users)
	}, 3000)
})

app.listen(8000)
