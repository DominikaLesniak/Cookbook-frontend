import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class DeleteRatingManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleCancel() {
        this.props.deleteEnd();
    }

    handleDelete() {
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("JWT"),
                "Content-Type": "application/json"
            },
        }
        console.log("confirmed");
        axios.delete(`http://localhost:8080/recipe/${this.props.recipeId}/rating/${this.props.rating.id}`, config)
            .then(res => {
                console.log("recipe deleted")
                this.props.deleteEnd();
                this.props.refreshActive();
            })
            .catch(error => {
                console.log("Exception while deleting rating", error);
            });
    }

    render() {
        return (
            <div>
                <Button variant="danger" onClick={this.handleDelete} >Confirm</Button>
                <Button variant="outline-warning" onClick={this.handleCancel} >Cancel</Button>
            </div>
        )
    }
}

export default withRouter(DeleteRatingManager);