import React, { Component } from 'react';
import axios from 'axios';

export default class SignUpManager extends Component {
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

    handleSubmit(event) {
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
                    console.log(res.data);
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
            <form onSubmit={this.handleSubmit}>
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
                    placeholder="Nazwa użytkownika"
                    onChange={this.handleChange}
                    required />
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Hasło"
                    onChange={this.handleChange}
                    required />
                <input
                    type="password"
                    name="password_confirm"
                    value={this.state.password_confirm}
                    placeholder="Potwierdź hasło"
                    onChange={this.handleChange}
                    required />
                <button type="submit">Zarejestruj</button>
            </form>
        </div>);
    }
}