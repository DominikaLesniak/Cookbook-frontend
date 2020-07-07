import React, { Component } from 'react';
import { userContext } from '../userContext';
import {withRouter } from 'react-router-dom';
import axios from 'axios';

class SignUpManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            password_confirm: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(method) {
        return event => {
            console.log("form submitted");
            event.preventDefault();
            if (this.state.password !== this.state.password_confirm) {
                console.log("Passwords are not the same");
            }
            else {
                const registrationRequest = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }
                axios.post("http://localhost:8080/authorization/signUp", registrationRequest)
                    .then(res => {
                        const authRequest = {
                            usernameOrEmail: this.state.email,
                            password: this.state.password
                        }
                        axios.post("http://localhost:8080/authorization/signIn", authRequest)
                            .then(res => {
                                localStorage.setItem("JWT", res.data.accessToken)
                                const config = {
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("JWT")
                                    }
                                }
                                axios.get("http://localhost:8080/user/profile", config)
                                    .then(res => {
                                        const newUser = {
                                            id: res.data.id,
                                            name: res.data.username,
                                            email: res.data.email,
                                            points: res.data.points,
                                            ownedRecipeNumber: res.data.ownedRecipeNumber,
                                            ratingsNumber: res.data.ratingsNumber
                                        }
                                        console.log(newUser)
                                        method(newUser)
                                        
                                    })
                                    .catch(error => {
                                        console.log("Some Exception", error);
                                    });
                            })
                            .catch(error => {
                                console.log("Authorizarion Exception", error);
                            });
                    })
                    .catch(error => {
                        console.log("Authorizarion Exception", error);
                    });
                    this.props.history.push("/");
            }
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (<div>
            <userContext.Consumer>
                {({loginUser }) => {
                    return (
            <form onSubmit={this.handleSubmit(loginUser)}>
                <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="Email"
                    onChange={this.handleChange}
                    required />
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                    required />
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handleChange}
                    required />
                <input
                    type="password"
                    name="password_confirm"
                    value={this.state.password_confirm}
                    placeholder="Confirm password"
                    onChange={this.handleChange}
                    required />
                <button type="submit">Sign up</button>
            </form>
                    )}}
            </userContext.Consumer>
        </div>);
    }
}

export default withRouter(SignUpManager)