// client.src.components.Grid.index.js

import React, { Component } from 'react';
import { connect } from "react-redux";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InfoIcon from '@material-ui/icons/Info';
// import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import {
  postToUserWatchList,
  removeFromUserWatchList,
  searchUserInfo,
} from "../../actions/authActions";
import "./style.css";

const moment = require('moment');

const gridTileStyle = {
  backgroundColor: 'black',
  maxWidth: 400
}

const dialogStyle = {
  width: "auto",
  height: "auto"
}

const cardStyle = {
  width: "auto",
  height: "auto"
}

const imgStyle = {
  height: '100%',
  width: 'auto',
  display: 'block',
  margin: 'auto'
}

const infoIconStyle = {
  color: 'white'
}

const titleBarStyle = {
  background: 'none'
}

class Grid extends Component {
  state = {
    open: false,
    currentResult: '',
    columnSize: 0
  }

  isAuthenticated() {
    return this.props.auth.isAuthenticated;
  }

  componentDidMount() {
    // this.props.getCurrentUser();
    if (this.isAuthenticated()) {
      this.props.searchUserInfo();
    }

    this.checkScreenSize();

    window.addEventListener('resize', () => {
      this.checkScreenSize();
    })
  }

  handleOpen = result => {
    this.setState({ open: true, currentResult: result });
  }

  checkScreenSize = () => {
    if (window.innerWidth > 1200) {
      this.setState({ columnSize: 7 });
    }
    if (1200 >= window.innerWidth && window.innerWidth > 992) {
      this.setState({ columnSize: 5 });
    }
    if (992 >= window.innerWidth && window.innerWidth > 768) {
      this.setState({ columnSize: 3 });
    }
    if (window.innerWidth < 768) {
      this.setState({ columnSize: 1 });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  addToWatchList = show => {
    this.props.postToUserWatchList(show, this.props.searchUserInfo)
  }

  removeFromWatchListButtonFunction = show => {
    this.props.removeFromUserWatchList(show, this.props.searchUserInfo)
  }

  render() {
    const shows = this.props.results;
    const actions = [
      <Button label="Close" primary={true} onClick={this.handleClose} />
    ]

    return (
      <GridList
        cols={this.state.columnSize}
      >

        {shows.map(result => (
          <GridListTile
            key={result.show.id}
            id="grid-list-tile"
            style={gridTileStyle}
          >
            {result.show.image ? (
              <img
                style={imgStyle}
                src={result.show.image.medium}
                alt={result.show.name}
              />
            ) : (
                <img style={imgStyle}
                  src="https://cdn1.iconfinder.com/data/icons/media-exercise-and-cool-stuff/500/TV_white-512.png"
                  alt={result.show.name}
                  layout-fill="true"
                />
              )}isAuthenticated
            <GridListTileBar
              title={result.show.name}
              subtitle={<span>{moment(result.show.premiered).format('YYYY')} {result.show.network
                ? (<span>• {result.show.network.name}</span>) : (null)}</span>}
              actionIcon={
                <IconButton color="secondary" className="">
                  {
                    //Is User Authenticated?
                    this.isAuthenticated() ?
                      //Does Authenticated User have show on watchlist?
                      this.props.auth.profile.includes(result.show.id)
                        ? (
                          <RemoveIcon
                            onClick={() => this.removeFromWatchListButtonFunction(result)}
                          />
                        ) : (
                          <AddIcon
                            onClick={() => this.addToWatchList(result)}
                          />
                        )
                      : (null)
                  }
                </IconButton>
              }
            />
            <GridListTileBar
              title={""}
              titlePosition="top"
              actionIcon={
                <IconButton>
                  <InfoIcon
                    style={infoIconStyle}
                    onClick={() => this.handleOpen(result)}
                  />
                </IconButton>
              }
              actionPosition="right"
              style={titleBarStyle}
            />
          </GridListTile>
        ))}

        <Dialog
          id="modal-popup"
          actions={actions}
          //modal={false}
          open={this.state.open}
          onClose={this.handleClose}
          style={dialogStyle}
        ><div>
            {this.state.currentResult ? (
              <Card
                className="showModal"
                style={cardStyle}
                id="modal-card"
              >
                <CardHeader
                  title={this.state.currentResult.show.name}
                  subheader={<span>{moment(this.state.currentResult.show.premiered).format('YYYY')} 
                  {this.state.currentResult.show.network ? (<span>• {this.state.currentResult.show.network.name}</span>) : (null)}</span>}
                />
                <CardContent>
                  <b>Summary</b>: 
                  {this.state.currentResult.show.summary ? (this.state.currentResult.show.summary.replace(/<\/?[^>]+(>|$)/g, "")) : " N/A"}
                  <br />
                  <br />
                  {this.state.currentResult.show.officialSite ? (<span><b>Official Site</b>: <a href={this.state.currentResult.show.officialSite} target="_blank">Click here</a></span>) : (null)}
                </CardContent>
              </Card>
            ) : (null)
            }</div>
        </Dialog>

      </GridList>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    postToUserWatchList,
    removeFromUserWatchList,
    searchUserInfo,
  }
)(Grid);
