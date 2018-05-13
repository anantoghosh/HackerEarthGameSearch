import * as React from 'react';
import './App.css';
import ItemsListData from './containers/Table';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ItemsListData />
      </div>
    );
  }
}

export default App;
