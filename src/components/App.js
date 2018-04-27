import React, { Component } from 'react';

//Import app base components (normally I'd put these in a route)
import Header from './header';
import PostalCodeForm from './postal-code-form';

class App extends Component {
  render() {
    return (
      <div id='app'>
        <Header />
        <PostalCodeForm />
      </div>
    );
  }
}

export default App;
