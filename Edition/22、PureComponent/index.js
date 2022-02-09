import React from 'react';
import ReactDOM from 'react-dom';

class PureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let oldKeyLength = Object.keys(this.state).length;
    let newKeyLength = Object.keys(nextState).length;
    if (oldKeyLength !== newKeyLength) {
      return true;
    }
    for (const key in this.state) {
      if (this.state[key] !== nextState[key]) {
        return true;
      }
    }
    return false;
  }
}
class Counter extends React.PureComponent {
  state = { name: 'zhufeng', number: 0 };
  onClick = (event, amount) => {
    this.setState({
      number: this.state.number + amount,
    });
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   let oldKeyLength = Object.keys(this.state).length;
  //   let newKeyLength = Object.keys(nextState).length;
  //   if (oldKeyLength !== newKeyLength) {
  //     return true;
  //   }
  //   for (const key in this.state) {
  //     if (this.state[key] !== nextState[key]) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  render() {
    console.log('render');
    return (
      <div>
        <p>{this.state.name}</p>
        <p>{this.state.number}</p>
        <button onClick={event => this.onClick(event, 1)}>+</button>
      </div>
    );
  }
}

// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(<Counter />, document.getElementById('root'));
