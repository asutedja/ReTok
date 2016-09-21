import React from 'react'
import { render } from 'react-dom'
// import routes from './routes'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

  }
  
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
      );
  }
  
}

window.App = App;
render(<App/>, document.getElementById('app')
);