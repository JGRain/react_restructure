class Updater {
	constructor() {
		this.queue = []
	}
	setState(update) {
		if (typeof update === 'function') {
			this.state = { ...this.state, ...update(this.state) }
		} else {
			this.state = { ...this.state, ...update }
		}
	}
}
let updater = new Updater()
updater.setState({ name: 123, number: 1 })
console.log(updater.state)

updater.setState((previousState) => ({ number: previousState.number + 1 }))
console.log(updater.state)

updater.setState({ number: 2 })
console.log(updater.state)

updater.setState({ number: 3 })
console.log(updater.state)
