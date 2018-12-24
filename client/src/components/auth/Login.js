import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Card from '@material-ui/core/Card';

const cardStyle = {
  width: 450,
  margin: "auto",
  marginTop: 30,
  padding: 30
}

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/Watchlist");
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/Watchlist"); // push user to dashboard when they login
        };

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };


    render() {

        const { errors } = this.state;
        return (
            <Card
              style={cardStyle}
            >
            <div className="container">
                <div className="row">
                    <div className="col s8">
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b>
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <span>   </span>
                                <label htmlFor="password">Password</label>

                                {/* Spans that will handle any error received from the login server */}
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>

                            </div>
                            <div className="col s12" style={{ marginTop: "10px", paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                      color: "white",
                                      backgroundColor: "#007bff",
                                      fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`
                                    }}
                                    type="submit"
                                    className="btn btn-large"
                                >Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Card>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
