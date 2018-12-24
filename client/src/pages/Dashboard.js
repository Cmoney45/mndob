import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import {
    logoutUser,
    getCurrentUser,
} from "../actions/authActions";

const cardStyle = {
    width: 400,
    margin: "auto"
}

class Dashboard extends Component {

    componentDidMount = e => {
        this.props.getCurrentUser();
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <Card style={cardStyle}>
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Hey there,</b> {user.name.split(" ")[0]}
                                <b>{user.test}</b>
                                <p className="flow-text grey-text text-darken-1">
                                    You are logged into a full-stack{" "}
                                    <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
                            </h4>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Logout
                </button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser, getCurrentUser }
)(Dashboard);