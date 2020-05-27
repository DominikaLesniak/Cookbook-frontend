import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ChangePasswordManager from './ChangePasswordManager';
import DeleteAccountManager from './DeleteAccountManager';

export default class AccountActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordChange: false,
            accountDelete: false
        }
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }
    componentDidMount() {
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

    render() {
        return (
            <div>
                <Button variant="light" onClick={this.handleChangePassword}>Change password</Button>
                <Button variant="light" onClick={this.handleDeleteAccount}>Delete account</Button>
                {this.state.passwordChange && <ChangePasswordManager />}
                {this.state.accountDelete && <DeleteAccountManager/>}
            </div>);
    }
}
