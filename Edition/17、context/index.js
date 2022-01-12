import React from 'react';
import ReactDOM from 'react-dom';

let ThemContext = React.createContext();
class Header extends React.Component {
  render() {
    return (
      <ThemContext.Consumer>
        {value => (
          <div style={{ border: `5px solid ${value.color}`, padding: '5px' }}>
            Header
            <Title />
          </div>
        )}
      </ThemContext.Consumer>
    );
  }
}
class Title extends React.Component {
  render() {
    return (
      <ThemContext.Consumer>
        {value => (
          <div style={{ border: `5px solid ${value.color}`, padding: '5px' }}>
            Title
          </div>
        )}
      </ThemContext.Consumer>
    );
  }
}
class Main extends React.Component {
  render() {
    return (
      <ThemContext.Consumer>
        {value => (
          <div style={{ border: `5px solid ${value.color}`, padding: '5px' }}>
            Main
            <Countent />
          </div>
        )}
      </ThemContext.Consumer>
    );
  }
}
class Countent extends React.Component {
  render() {
    return (
      <ThemContext.Consumer>
        {value => (
          <div style={{ border: `5px solid ${value.color}`, padding: '5px' }}>
            Countent
            <button onClick={() => value.changeColor('red')}>变红</button>
            <button onClick={() => value.changeColor('green')}>变绿</button>
          </div>
        )}
      </ThemContext.Consumer>
    );
  }
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red' };
  }
  changeColor = color => {
    this.setState({ color });
  };
  render() {
    let value = { color: this.state.color, changeColor: this.changeColor };
    let style = {
      margin: '10px',
      border: `5px solid ${this.state.color}`,
      padding: '5px',
      width: '200px',
    };
    return (
      <ThemContext.Provider value={value}>
        <div style={style}>
          <Header />
          <Main />
        </div>
      </ThemContext.Provider>
    );
  }
}
// element 也是一个虚拟DOM，或者说React元素
ReactDOM.render(<Page name="zhufeng" />, document.getElementById('root'));
