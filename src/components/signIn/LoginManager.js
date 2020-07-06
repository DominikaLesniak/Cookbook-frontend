import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import SignInManager from './SignInManager';
import SignUpManager from './SignUpManager';

export default class LoginManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signInClicked: false,
            signUpClicked: false
        }
        
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
    }

    handleSignInClick() {
        this.setState(prevState => ({
            signInClicked: !prevState.signInClicked,
            signUpClicked: false
        }));
    }

    handleSignUpClick() {
        this.setState(prevState => ({
            signUpClicked: !prevState.signUpClicked,
            signInClicked: false
        }));
    }

    render() {
        return (
        <div>
            <Button variant = "warning" onClick={this.handleSignInClick}>Sign in</Button>
            <Button variant = "warning" onClick={this.handleSignUpClick}>Create account</Button>
            <ChooseForm signIn={this.state.signInClicked} signUp={this.state.signUpClicked}/>
        </div>);
    }
}

function ChooseForm(props) {
    if (!props.signIn && !props.signUp) {
      return null;
    }
  
    return (
      <div>
        {props.signIn ? 
            <SignInManager/> :
            <SignUpManager/>}
      </div>
    );
  }