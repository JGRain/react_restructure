import React from 'react';
import ReactDOM from 'react-dom';

class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.wrapper = React.createRef();
  }
  addMessage() {
    this.setState({
      messages: [`${this.state.messages.length}`, ...this.state.messages],
    });
  }
  getSnapshotBeforeUpdate() {
    return {
      prevScrollTop: this.wrapper.current.scrollTop, // 上次卷去的高度
      prevscrollHeight: this.wrapper.current.scrollHeight, // 上次的内容高度
    };
  }
  componentDidUpdate(
    prevProps,
    prevState,
    { prevScrollTop, prevscrollHeight },
  ) {
    this.wrapper.current.scrollTop =
      prevScrollTop + (this.wrapper.current.scrollheight - prevscrollHeight);
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.addMessage();
    }, 1000);
  }
  render() {
    let style = {
      height: '100px',
      width: '200px',
      border: '1px solid red',
      overflow: 'auto',
    };
    return (
      <div style={style} ref={this.wrapper}>
        {this.state.messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    );
  }
}
// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(<ScrollList name="zhufeng" />, document.getElementById('root'));
