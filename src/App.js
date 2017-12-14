import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifs: [],
      isLoading: true
    };
  }

  componentDidMount(){

    this.performSearch();
    // Native fetch method - newer browser support and no IE support

    // fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    //     .then(response => response.json())
    //     .then(responseData => {
    //       this.setState({ gifs: responseData.data });
    //     })
    //     .catch(error => {
    //       console.log('Error fetching and parsing data', error);
    //     });


    // axios fetch method - lots of browser support, built in features, supports IE8+

    // axios.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    //   .then(response => {
    //     this.setState({ gifs: response.data.data });
    //   })
    //   .catch(error => {
    //     console.log('Error fetching and parsing data', error);
    //   });
  }

  performSearch = (query = 'dogs') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
      .then(response => {
        this.setState({
          gifs: response.data.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {
            (this.state.isLoading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
