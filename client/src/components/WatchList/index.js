import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import RemoveIcon from '@material-ui/icons/Remove';

import { connect } from "react-redux";
import './style.css'
import {
  removeFromUserWatchList,
  getCurrentUsersWatchList,
} from "../../actions/authActions";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'black'
  },
  gridList: {
    width: 500,
    height: 700,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
});

function WatchListGrid(props) {
  const { classes, watchList } = props;

  const removeFromWatchListButtonFunction = show => {
    props.removeFromUserWatchList(show, props.getCurrentUsersWatchList)
  }
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <h1 id="title">Watch List</h1>
        </GridListTile>
        {watchList.map(show => (
          <GridListTile key={show._id}>
            {show.show.image ? (
              <img
                src={show.show.image.medium}
                alt={show.show.name}
              />
            ) : (
                <img
                  src="https://cdn1.iconfinder.com/data/icons/media-exercise-and-cool-stuff/500/TV_white-512.png"
                  alt={show.show.name}
                  layout-fill="true"
                />
              )}
            <GridListTileBar
              title={show.show.name}
              actionIcon={
                <IconButton className={classes.icon}>
                  <RemoveIcon
                    onClick={() => removeFromWatchListButtonFunction(show)}
                  />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

WatchListGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  watchList: PropTypes.arrayOf(PropTypes.object)
};


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(

  mapStateToProps,
  {
    removeFromUserWatchList,
    getCurrentUsersWatchList,
  }
)(withStyles(styles)(WatchListGrid));


