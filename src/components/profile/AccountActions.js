import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ChangePasswordManager from './ChangePasswordManager';
import DeleteAccountManager from './DeleteAccountManager';
import DeleteDialog from '../DeleteDialog'
import { userContext } from '../userContext';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AccountActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordChange: false,
            accountDelete: false
        }
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }

    handleChangePassword() {
        console.log("passw change began");
        this.setState(prevState => ({
            passwordChange: !prevState.passwordChange
        }));
    }

    handleDeleteAccount() {
        console.log("account delete began");
        this.setState(prevState => ({
            accountDelete: !prevState.accountDelete
        }));
    }

    handleDelete(method) {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("JWT"),
                "Content-Type": "application/json"
            },
        }
        axios.delete(`http://localhost:8080/user`, config)
            .then(res => {
                console.log("account deleted");
                method();
                this.props.history.push("/");
            })
            .catch(error => {
                console.log("Authorizarion Exception", error);
            });
    }

    render() {
        return (
            <div>
                <userContext.Consumer>
                    {({ logoutUser }) => {
                        return (
                            <div>
                                <Button variant="warning" onClick={this.handleChangePassword}>Change password</Button>
                                <Button variant="warning" onClick={this.handleDeleteAccount}>Delete account</Button>
                                {this.state.passwordChange && <ChangePasswordManager />}
                                {this.state.accountDelete && <DeleteDialog deletedItem="account" onAgreed={() => this.handleDelete(logoutUser)} />}
                            </div>)
                    }}
                </userContext.Consumer>
            </div>);
    }
}

export default withRouter(AccountActions)