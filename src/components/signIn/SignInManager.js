import React, { Component } from 'react';
import { userContext } from '../userContext';
import {withRouter } from 'react-router-dom';
import axios from 'axios';

class SignInManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(method) {
        return event => {
            console.log("form submitted");
            event.preventDefault();
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
                            name: res.data.username,
                            email: res.data.email,
                            points: res.data.points,
                            ownedRecipeNumber: res.data.ownedRecipeNumber,
                            ratingsNumber: res.data.ratingsNumber
                        }
                        console.log(newUser)
                        method(newUser)
                        this.props.history.push("/");
                    })
                    .catch(error =>{
                        console.log("Some Exception", error);
                    });                
                })
                .catch(error => {
                    console.log("Authorizarion Exception", error);
                });
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
                {({ user, loginUser }) => {
                    return (
                        <form onSubmit={this.handleSubmit(loginUser)}>
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                placeholder="Email lub login"
                                onChange={this.handleChange}
                                required />
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={this.handleChange}
                                required />
                            <button type="submit" >Zaloguj</button>
                        </form>)
                }}
            </userContext.Consumer>
        </div>);
    }
}


export default withRouter(SignInManager);