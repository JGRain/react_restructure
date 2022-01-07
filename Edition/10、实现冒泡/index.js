import React from './react';
import ReactDOM from './react-dom';

/**
 * 10 实现冒泡
 */
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'zhufeng', num: 0 };
  }
  // 合成事件对象 并不是原生的，是封装的
  handelClickB = event => {
    console.log(event);
    this.setState({
      num: this.state.num + 1,
    });
    console.log(this.state.num);

    this.setState({
      num: this.state.num + 1,
    });
    console.log(this.state.num);
  };
  handelClickA = event => {
    console.log(event);
    this.setState({
      num: this.state.num + 1,
    });
    console.log(this.state.num);

    this.setState({
      num: this.state.num + 1,
    });
    console.log(this.state.num);
  };
  clickDiv = () => {
    console.log('clickDiv');
  };
  render() {
    return (
      <div onClick={this.clickDiv()}>
        <h1>hello, {this.props.name}</h1>
        <h2> {this.state.num}</h2>
        <button onClick={this.handelClickA}>+</button>
        <button onClick={this.handelClickB}>+</button>
      </div>
    );
  }
}
let element = <Clock name="zhufeng" />;
ReactDOM.render(element, document.getElementById('root'));
