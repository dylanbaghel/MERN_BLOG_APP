import React from 'react';
import classNames from 'classnames';
import { isEmail } from 'validator';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

import { startLogin } from './../action/authActions';
import { setFlash } from './../action/flashActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    handleEmailChange(e) {
        const email = e.target.value;
        this.setState(() => ({
            email: email.trim()
        }));
    }

    handlePasswordChange(e) {
        const password = e.target.value;
        this.setState(() => ({
            password: password.trim()
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.email) {
            this.setState(() => ({
                errors: { email: "Email is Required" }
            }));
            return;
        } else if (!isEmail(this.state.email)) {
            this.setState(() => ({
                errors: { email: "Invalid Email" }
            }));
            return;
        }
        if (!this.state.password || this.state.password.length < 6) {
            this.setState(() => ({
                errors: { password: "Password is Required and must be 6 chars long" }
            }));
            return;
        }

        this.props.startLogin(this.state.email, this.state.password)
                                    .then(() => {
                                    })
                                    .catch((e) => {
                                        this.props.setFlash("error", e.errors.message);
                                    });
    }

    render() {
        return (
            <div className="container">
                <h2 className="mb-3">Login</h2>
                <div className="card-card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                placeholder="Enter Email..."
                                className={classNames('form-control', {
                                    'is-invalid': this.state.errors.email
                                })}
                            />
                            <div className="invalid-feedback">{this.state.errors.email}</div>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                placeholder="Enter Password..."
                                className={classNames('form-control', {
                                    'is-invalid': this.state.errors.password
                                })}
                            />
                            <small>No Account? <Link to="/signup">Create One</Link></small>
                            <div className="invalid-feedback">{this.state.errors.password}</div>
                        </div>
                        <button className="btn btn-outline-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: (email, password) => dispatch(startLogin(email, password)),
        setFlash: (type, message) => dispatch(setFlash(type, message))
    }
};

export default connect(undefined, mapDispatchToProps)(Login);