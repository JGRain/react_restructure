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
        <ChildCounter count={this.state.number} />
        <button onClick={this.add}>+</button>
      </div>
    );
  }
  componentDidMount() {
    console.log('父 4.componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('父 5.shouldComponentUpdate');
    return true; // 如果偶数更新 奇数不更新
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
    this.state = { number: 0 };
    console.log('子 1.set props and state');
  }
  // 类的静态方法，从属性对象映射对象
  static getDerivedStateFromProps(nextProps, prevState) {
    let { count } = nextProps;
    if (count % 2 === 0) {
      return { number: count * 2 };
    } else {
      return { number: count * 3 };
    }
    return null;
  }
  componentWillMount() {
    console.log('子 1.componentWillMount');
  }
  render() {
    console.log('子 2.render');

    return <div id={`counter${this.state.number}`}>{this.state.number}</div>;
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
// class Demo extends React.Component {
//   constructor() {
//     super();
//     this.state = { number: 1 };
//   }
//   render() {
//     let element;
//     if (this.state.number > 1) {
//       element = null;
//     } else {
//       element = <span>{this.state.number}</span>;
//     }
//     return element;
//   }
// }
// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(<Counter name="zhufeng" />, document.getElementById('root'));
