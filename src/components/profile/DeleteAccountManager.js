import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { userContext } from '../userContext';
import axios from 'axios';

export default class DeleteAccountManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete: false,
            cancel: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        console.log("constructor");
    }

    handleCancel() {
        this.setState({
            cancel: true
        })
    }

    handleDelete(method) {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("JWT"),
                "Content-Type": "application/json"
            },
        }
        // const data = {      
        //     oldPassword: this.state.currentPassword,
        //     newPassword: this.state.password
        // }
        console.log("confirmed");
        axios.delete(`http://localhost:8080/user`, config)
            .then(res => {
                console.log("account deleted");
                method();
            })
            .catch(error => {
                console.log("Authorizarion Exception", error);
            });
    }

    render() {
        if (this.state.cancel) {
            return null;
        }
        return (
            <div>
                <userContext.Consumer>
                    {({logoutUser}) => {
                        return (
                            <div>
                                <Button variant="danger" onClick={() => this.handleDelete(logoutUser)} >Confirm</Button>
                                <Button variant="outline-danger" onClick={this.handleCancel} >Cancel</Button>
                            </div>)
                    }}
                </userContext.Consumer>
            </div>
        )
    }
}