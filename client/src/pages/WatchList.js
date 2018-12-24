import React, { Component } from "react";
import _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import WatchListGrid from '../components/WatchList'
import { connect } from "react-redux";

import { getCurrentUsersWatchList } from "../actions/authActions";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class WatchList extends Component {
  
  componentDidMount() {
    this.props.getCurrentUsersWatchList();
  };

  render() {
    const watchList = _.get(this.props, 'auth.profile.watchList', []);
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <WatchListGrid watchList={watchList} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getCurrentUsersWatchList() {
    dispatch(getCurrentUsersWatchList());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchList);