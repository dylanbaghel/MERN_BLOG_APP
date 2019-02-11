import React from 'react';
import { isEmail } from 'validator';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startRegister } from './../action/authActions';
import { setFlash } from './../action/flashActions';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: {
                name: "",
                email: "",
                password: ""
            }
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e) {
        const email = e.target.value;
        this.setState(() => ({
            email
        }), () => {
            this.validateEmail();
        });
    }
    handlePasswordChange(e) {
        const password = e.target.value;
        this.setState(() => ({
            password
        }), () => {
            this.validatePassword();
        });
    }
    handleNameChange(e) {
        const name = e.target.value;
        this.setState(() => ({
            name
        }), () => {
            this.validateName();
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.validateEmail();
        this.validateName();
        this.validatePassword();

        setTimeout(() => {
            if (!this.state.errors.name && !this.state.errors.email && !this.state.errors.password) {
                this.props.startRegister({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
                .then(() => {})
                .catch(e => {
                    this.props.setFlash("error", e.errors.message);
                });

                this.setState(() => ({
                    name: '',
                    email: '',
                    password: '',
                    errors: {
                        name: "",
                        email: "",
                        password: ""
                    }
                }));
            }
        }, 0);
    }

    validateName() {
        const { name } = this.state;
        this.setState((prevState) => {
            if (!name) {
                return {
                    errors: { ...prevState.errors, name: "Name is Required " }
                };
            } else if (name.length < 3) {
                return {
                    errors: { ...prevState.errors, name: "Too Short " }
                };
            }
            return {
                errors: {
                    ...prevState.errors,
                    name: ""
                }
            };
        });
    }

    validateEmail() {
        const { email } = this.state;
        this.setState((prevState) => {
            if (!email) {
                return {
                    errors: { ...prevState.errors, email: "Email is Required" }
                };
            } else if (!isEmail(email)) {
                return {
                    errors: { ...prevState.errors, email: "Invalid Email " }
                };
            }
            return {
                errors: {
                    ...prevState.errors,
                    email: ""
                }
            };
        });
    }

    validatePassword() {
        const { password } = this.state;
        this.setState((prevState) => {
            if (!password) {
                return {
                    errors: { ...prevState.errors, password: "Password is Required " }
                };
            } else if (password.length < 6) {
                return {
                    errors: { ...prevState.errors, password: "Too Short" }
                };
            }
            return {
                errors: {
                    ...prevState.errors,
                    password: ""
                }
            };
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="mb-3">Signup</h2>
                <div className="card-card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                value={this.state.name}
                                placeholder="Enter Name"
                                onChange={this.handleNameChange}
                                className={classNames('form-control', {
                                    'is-invalid': this.state.errors.name
                                })}
                            />
                            <div className="invalid-feedback">{this.state.errors.name}</div>
                        </div>
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
                            <small><Link to="/login">Already Have An Account.</Link></small>
                            <div className="invalid-feedback">{this.state.errors.password}</div>
                        </div>
                        <button disabled={!this.state.name || !this.state.email || !this.state.password || this.state.errors.name || this.state.errors.email || this.state.errors.password} className="btn btn-outline-success">Signup</button>
                    </form>
                </div>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startRegister: (data) => dispatch(startRegister(data)),
        setFlash: (type, message) => dispatch(setFlash(type, message))
    };
};

export default connect(undefined, mapDispatchToProps)(SignUp);