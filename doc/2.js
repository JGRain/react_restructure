class Updater {
  constructor() {
    this.state = { number: 0 };
    this.queue = [];
  }
  setState(newState) {
    this.queue.push(newState);
  }
  flush() {
    for (let index = 0; index < this.queue.length; index++) {
      let update = this.queue[index];
      if (typeof update === 'function') {
        this.state = { ...this.this.state, ...update(this.state) };
      } else {
        this.state = { ...this.this.state, ...update };
      }
    }
  }
}
let updater = new Updater();
updater.setState({ num: 1 });
updater.setState(pre => ({ num: pre.num + 1 }));
updater.flush();
console.log(updater.state);
