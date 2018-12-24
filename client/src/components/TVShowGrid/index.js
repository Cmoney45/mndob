import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';

class TVShowGrid extends Component {

  render() {
    let resultsContent;
    const shows = this.props.results;


    if(shows) {
      resultsContent = <Grid results={shows} />
    } else {
      resultsContent = null;
    }

    return (
      <div>
        {resultsContent}
      </div>
    )
  }
}

TVShowGrid.propTypes = {
  results: PropTypes.array.isRequired
}

export default TVShowGrid;