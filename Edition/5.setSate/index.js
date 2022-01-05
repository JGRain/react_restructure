import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 属性外传，不可更改，类组件函数组件都有
 * 状态内部产生，可以更改，自存在与类组件里
 * 唯一能给this.state赋值的地方就是构造函数，只能初始值，其他地方遥想改变状态只能调用setState()方法
 * 每当你调用setState，组件会重新刷新，调用一次render方法，得到新的虚拟dom进行dom更新
 */

/**
 * 当你在事件处理函数中执行setState，组建并不会立刻渲染，而是先把更新存起来，等事件处理函数执行完了再批量更新
 * 1、在事件处理函数中或生命周期函数中批量更新
 * 2、其他地方都是同步更新，比如说setTimeout
 * 3、要谨慎处理this
 *  1、用剪头函数 首选方案
 *  2、如果不实用剪头函数，普通函数中的this=underfined，可以在render使用匿名函数
 *  3、可以在构造函数中重新this.handleClick ,绑死this指针
 *  4、如果要传参，只能使用redner里的匿名函数
 */
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'zhufeng', num: 0 };
  }
  handelClick = () => {
    this.setState(
      state => ({
        num: state.num + 1,
      }),
      () => {
        console.log(this.state.num);
      },
    );
    this.setState(
      state => ({
        num: state.num + 1,
      }),
      () => {
        console.log(this.state.num);
      },
    );
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
