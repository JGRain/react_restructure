import React from './react';
import ReactDOM from './react-dom';

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
    console.log('Couter 1.set props and state');
  }
  componentWillMount() {
    console.log('Couter 2.componentWillUnmount');
  }
  add = event => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    console.log('Couter 3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.add}>+</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('Couter 4.componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Couter 5.shouldComponentUpdate');
    return nextState.number % 2 === 0; // 如果偶数更新 奇数不更新
  }
  componentWillUpdate() {
    console.log('Couter 6.componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('Couter 7.componentDidUpdate');
  }
}
let element = <Counter name="zhufeng" />;
ReactDOM.render(element, document.getElementById('root'));
