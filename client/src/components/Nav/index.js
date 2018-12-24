// client.src.Nav.index.js

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import TouchApp from '@material-ui/icons/TouchApp';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
//import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//import InboxIcon from "@material-ui/icons/MoveToInbox";
//import MailIcon from "@material-ui/icons/Mail";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./style.css";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    backgroundColor: "#010b1c",
    borderRadius: "0px 50px",
    color: "white",
    paddingTop: "0.3em",
    paddingBottom: "0.3em"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navBar: {
    backgroundImage: "linear-gradient(45deg, #C3073F, #960731)",
    height: "6em"
  },
  icon: {
    fontSize: "48px"
  }
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'aclonica',
      'Unlock',
      'sans-serif'
    ].join(','),
  },
});

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };


  doSomething = (text) => {
    this.context.router.history.push('/' + text);
  };


  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {["Home", "Search", "Watchlist"].map((text, index) => (
            <Link to={`/${text}`} key={text}>
              <ListItem button key={text}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {[/*"Account Settings", */(this.props.isAuth) ? "Logout" : "Login"].map((text, index) => (
            <Link to={`/${text}`} key={text}>
              <ListItem button key={text}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root} id="navBar">
            <AppBar position="static">
              <Toolbar className={classes.navBar}>
                <Button
                    color="inherit"
                    onClick={this.toggleDrawer("left", true)}
                  >
                    Menu
                </Button>
                <Typography id="title" variant="h2" color="textPrimary" align="center" className={classes.grow}>
                  Welcome to VIST
                </Typography>
                <div style={{ marginLeft: 20 }}>
                 <IconButton className={classes.TouchApp} color="inherit" aria-label="Menu">
                  <TouchApp className={classes.icon} />
                </IconButton>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        </MuiThemeProvider>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withStyles(styles)(TemporaryDrawer));
