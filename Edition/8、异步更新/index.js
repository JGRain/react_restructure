import React from './react';
import ReactDOM from './react-dom';
import { updateQueue } from './Component';

/**
 * 1、 如何绑定事件
 * 2、如何实现组件更新
 * 3、如何实现组件异步更新
 */
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'zhufeng', num: 0 };
  }
  handelClick = () => {
    updateQueue.isBatchingUpdate = true;
    this.setState({
      num: this.state.num + 1,
    });
    console.log(this.state.num);

    this.setState({
      num: this.state.num + 1,
    });
    console.log(this.state.num);
    updateQueue.betchUpdate()
  };
  render() {
    return (
      <div>
        <h1>hello, {this.props.name}</h1>
        <h2> {this.state.num}</h2>
        <button onClick={this.handelClick}>+</button>
      </div>
    );
  }
}
let element = <Clock name="zhufeng" />;
ReactDOM.render(element, document.getElementById('root'));
