import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 高阶组件 他是一个函数
 * 反向继承 基于反向继承，我们可以拦截生命周期，state还有渲染过程
 * 比如说这个Button是一个antd提供的标准组件，我们改不了，那应该如何增强它，给他加儿子数字，加点击事件，让儿子数字变动
 */

function withTracker(OldComponent) {
  return class MouseTracker extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }
    handleMouseMove = event => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };
    render() {
      return (
        <div
          onMouseMove={this.handleMouseMove}
          style={{ border: '1px solid red' }}
        >
          <OldComponent {...this.state} />
        </div>
      );
    }
  };
}
// 要求类组件的render还是函数组件返回值只能返回一个React元素
let Hello = props => (
  <React.Fragment>
    <h1>移动鼠标</h1>
    <p>
      当前鼠标位置X:{props.x},y:{props.y}
    </p>
  </React.Fragment>
);
let HighOrder = withTracker(Hello);

// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(<HighOrder />, document.getElementById('root'));
