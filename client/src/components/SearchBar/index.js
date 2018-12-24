import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import TVShowGrid from '../TVShowGrid';
import API from '../../utils/API';
import './style.css';
import debounce from "lodash.debounce";

class SearchBar extends Component {
  state = {
    searchText: '',
    results: []
  }
  
  delayedCallback = debounce(this.ajaxCall, 400)

  ajaxCall(event) {
    const value = event.target.value;

    if (value === '') {
      this.setState({ results: [] })
    } else {
      API.getShows(event.target.value)
        .then(res => {
          this.setState({ results: res.data })
        })
        .catch(err => console.log(err));
    }
  }

  onTextChange(event) {
    event.persist();
    this.delayedCallback(event);
  }

  render() {
    return (
      <div id="search-page-div">
        <div id="search-title">
          SEARCH
        </div>
        <div id="search-div">
          <TextField
            name="searchText"
            id="search-text"
            onChange={this.onTextChange.bind(this)}
            floatinglabeltext="Search for TV Show"
            fullWidth={true}
          />
        </div>

        <br />

        <div>
          {this.state.results.length > 0 ? (
            <TVShowGrid results={this.state.results} />
          ) : null}
        </div>
      </div>
    )
  }
}

export default SearchBar;