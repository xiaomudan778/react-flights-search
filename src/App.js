import React, { Component } from 'react';

import './App.css';
import Header from './components/header/header';
import Search from './components/search/search';
import FlightResult from './components/result/flights-result';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      data:""
    }
  }

  formChildSearch(params) {
  this.setState({
    data : params
  })
}
  render() {
    return (
      <div className="app">
        <Header/>
        <section className="app__content">
        <Search callback={this.formChildSearch.bind(this)}/>
        <FlightResult data={this.state.data}/>
        </section>
      </div>
    );
  }
}

export default App;
