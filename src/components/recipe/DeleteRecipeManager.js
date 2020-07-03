import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class DeleteRecipeManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId: this.props.recipeId,
            delete: false,
            cancel: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleCancel() {
        this.props.cancelDelete();
    }

    handleDelete() {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("JWT"),
                "Content-Type": "application/json"
            },
        }
        console.log("confirmed");
        axios.delete(`http://localhost:8080/recipe/${this.state.recipeId}`, config)
            .then(res => {
                console.log("recipe deleted")
                this.props.history.goBack();
            })
            .catch(error => {
                console.log("Exception while deleting recipe", error);
            });
    }

    render() {
        return (
            <div>
                <Button variant="danger" onClick={this.handleDelete} >Confirm</Button>
                <Button variant="outline-danger" onClick={this.handleCancel} >Cancel</Button>
            </div>
        )
    }
}

export default withRouter(DeleteRecipeManager);