import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 高阶组件 他是一个函数
 * 反向继承 基于反向继承，我们可以拦截生命周期，state还有渲染过程
 * 比如说这个Button是一个antd提供的标准组件，我们改不了，那应该如何增强它，给他加儿子数字，加点击事件，让儿子数字变动
 */
class Button extends React.Component {
  state = { name: '按钮' };
  componentWillMount() {
    console.log('Button componentWillMount');
  }
  componentDidMount() {
    console.log('Button componentDidMount');
  }
  render() {
    console.log('Button render');
    return <button name={this.state.name}>{this.props.title}</button>;
  }
}
const wrapper = OldComponent => {
  return class NewComponent extends OldComponent {
    state = { number: 0 };
    componentWillMount() {
      console.log('NewComponent componentWillMount');
      super.componentWillMount();
    }
    componentDidMount() {
      console.log('NewComponent componentDidMount');
      super.componentDidMount();
    }
    handleClick = event => {
      this.setState({
        number: this.state.number + 1,
      });
    };
    render() {
      console.log('NewComponent render');
      let oldComponentRenderElement = super.render();
      let newProps = {
        ...oldComponentRenderElement.props,
        // ...this.state,
        onClick: this.handleClick,
      };
      return React.cloneElement(
        oldComponentRenderElement,
        newProps,
        this.state.number,
      );
    }
  };
};
const NewButton = wrapper(Button);
// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(<NewButton title="title" />, document.getElementById('root'));
