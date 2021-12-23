class Updater {
	constructor() {
		this.queue = []
	}
	setState(newState) {
		this.queue.push(newState)
	}
	flush() {
		for (let i = 0; i < this.queue.length; i++) {
			let update = this.queue[i]
			if (typeof update === 'function') {
				this.state = { ...this.state, ...update(this.state) }
			} else {
				this.state = { ...this.state, ...update }
			}
		}
	}
}
let updater = new Updater()
updater.setState({ name: 123, number: 1 })
updater.setState((previousState) => ({ number: previousState.number + 1 }))
updater.setState({ number: 2 })
updater.setState({ number: 3 })

updater.flush()
console.log(updater.state)
