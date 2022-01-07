import React from './react';
import ReactDOM from './react-dom';

/**
 * 如果我们想在React获取真实DOM元素的话
 * 1、ref 如果给input增加ref属性，值是一个字符串this。ref.a=此input转成真实dom之后的真实DOM
 */
class Sum extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.b = React.createRef();
    this.result = React.createRef();
  }
  // 合成事件对象 并不是原生的，是封装的
  add = event => {
    let aValue = this.a.current.value;
    let bValue = this.b.current.value;
    this.result.current.value = +aValue + +bValue;
  };
  render() {
    return (
      <div>
        <input ref={this.a} />+ <input ref={this.b} />
        <button onClick={this.add}>=</button>
        <input ref={this.result} />
      </div>
    );
  }
}
let element = <Sum name="zhufeng" />;
ReactDOM.render(element, document.getElementById('root'));
