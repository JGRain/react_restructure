import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 12、学习生命周期
 *
 */
class Counter extends React.Component {
  // 默认属性
  static defaultProps = {
    name: 'zhufeng',
  };
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    console.log('父 1.set props and state');
  }
  componentWillMount() {
    console.log('父 2.componentWillUnmount');
  }
  add = event => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    console.log('父 3.render');
    return (
      <div id={`counter${this.state.number}`}>
        <p>{this.state.number}</p>
        {this.state.number === 4 ? null : (
          <ChildCounter count={this.state.number} />
        )}
        <button onClick={this.add}>+</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('父 4.componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('父 5.shouldComponentUpdate');
    return nextState.number % 2 === 0; // 如果偶数更新 奇数不更新
  }
  componentWillUpdate() {
    console.log('父 6.componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('父 7.componentDidUpdate');
  }
}
class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    // console.log('子 1.set props and state');
  }
  componentWillMount() {
    console.log('子 1.componentWillMount');
  }
  render() {
    console.log('子 2.render');

    return <div id={`counter${this.props.count}`}>{this.props.count}</div>;
  }
  componentDidMount() {
    console.log('子 3.componentDidMount');
  }
  componentWillUpdate() {
    console.log('父 4.componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('父 5.componentDidUpdate');
  }
  componentWillReceiveProps() {
    console.log('子 6.componentWillReceiveProps');
  }
  componentWillUnmount() {
    console.log('子 7.componentWillUnmount');
  }
}
let element = <Counter name="zhufeng" />;
ReactDOM.render(element, document.getElementById('root'));
