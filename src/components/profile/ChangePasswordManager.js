import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class ChangePasswordManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordChange: true,
            currentPassword: "",
            password: "",
            passwordConfirm: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangePassword() {
        console.log("passw change");
        this.setState({
            passwordChange: true
        })
    }
    handleSubmit(event) {
        console.log("form submitted");
        event.preventDefault();
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("JWT"),
                "Content-Type": "application/json"
            },
        }
        const data = {      
            oldPassword: this.state.currentPassword,
            newPassword: this.state.password
        }

        axios.put(`http://localhost:8080/user/passwordChange?oldPassword=${this.state.currentPassword}&newPassword=${this.state.password}`, null, config)
            .then(res => {
                console.log("password changed");
                this.setState({
                    passwordChange: false
                })
            })
            .catch(error => {
                console.log("Authorizarion Exception", error);
            });
    }
    render() {
        return (
            <div>
                {this.state.passwordChange && <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="currentPassword">
                        <Form.Label>Enter your current password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your current password"
                            onChange={this.handleChange}
                            name="currentPassword"
                            value={this.state.currentPassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>Enter new password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="newPassword"
                            onChange={this.handleChange}
                            name="password"
                            value={this.state.password}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPasswordConfirm">
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="passwordConfirm"
                            onChange={this.handleChange}
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                        />
                    </Form.Group>
                    <Button variant="light" type="submit">
                        Submit
                </Button>
                </Form>}
            </div>
        )
    }
}