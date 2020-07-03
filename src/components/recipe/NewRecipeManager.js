import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { userContext } from '../userContext';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import './Recipe.css';

class NewRecipeManager extends Component {
    constructor(props) {
        super(props);

        if (this.props.recipe !== undefined) {
            console.log("editing recipe");
            console.log(this.props.recipe);
            this.state = {
                recipeId: this.props.recipe.recipeId,
                title: this.props.recipe.name,
                text: this.props.recipe.text,
                imageUrl: this.props.recipe.imageUrl,
                ingredients: this.props.recipe.ingredients,
                edit: true
            }
        } else {
            this.state = {
                title: "",
                text: "",
                imageUrl: "",
                ingredients: [
                    {
                        name: "",
                        amount: ""
                    }
                ],
                edit: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddFields = this.handleAddFields.bind(this);
        this.handleRemoveFields = this.handleRemoveFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddFields = () => {
        const values = [...this.state.ingredients];
        values.push({ name: '', amount: '' });
        this.setState({
            ingredients: values
        });
    };

    handleRemoveFields = (index) => {
        console.log(index);
        const values = [...this.state.ingredients];
        if (values.length > 1) {

            values.splice(index, 1);
            this.setState({
                ingredients: values
            });
        }
    };

    handleIngredientChange = (index, event) => {
        console.log(index);
        const values = [...this.state.ingredients];
        if (event.target.name === "name") {
            values[index].name = event.target.value;
        } else {
            values[index].amount = event.target.value;
        }
        this.setState({
            ingredients: values
        });
    }

    handleSubmit(user) {
        return event => {
            event.preventDefault();
            if (user.id !== undefined) {
                console.log("posting rating");

                const data = {
                    name: this.state.title,
                    text: this.state.text,
                    imageUrl: this.state.imageUrl,
                    ingredients: this.state.ingredients,
                    authorId: user.id
                }
                const config = {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("JWT"),
                        "Content-Type": "application/json"
                    }
                }

                if (this.state.edit) {
                    axios.put(`http://localhost:8080/recipe/${this.state.recipeId}`, data, config)
                        .then(res => {
                            console.log("recipe edited");
                            this.props.handleEditRecipe();
                        })
                        .catch(error => {
                            console.log("Authorizarion Exception", error);
                        });
                } else {
                    axios.post(`http://localhost:8080/recipe`, data, config)
                        .then(res => {
                            this.props.history.push(`/recipe/${res.data}`)
                        })
                        .catch(error => {
                            console.log("Authorizarion Exception", error);
                        });
                }


            } else {
                console.log("nie");
            }
        }
    }

    render() {
        return (
            <div>
                <userContext.Consumer>
                    {({ user }) => {
                        return (
                            <div>
                                <Form className="FormLook" onSubmit={this.handleSubmit(user)}>
                                    <Form.Group className="Title" controlId="title">
                                        <Form.Label size="lg" >Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="title"
                                            onChange={this.handleChange}
                                            name="title"
                                            value={this.state.title}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Ingredients</Form.Label>
                                        {this.state.ingredients.map((ingredient, index) => (
                                            <Form.Row>
                                                <Col xs={5}>
                                                    <Form.Label column="sm">Name:</Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        placeholder="name"
                                                        onChange={event => this.handleIngredientChange(index, event)}
                                                        name="name"
                                                        value={ingredient.name}
                                                    />
                                                </Col>
                                                <Col xs={5}>
                                                    <Form.Label column="sm">Amount:</Form.Label>
                                                    <Form.Control
                                                        size="sm"
                                                        type="text"
                                                        placeholder="amount"
                                                        onChange={event => this.handleIngredientChange(index, event)}
                                                        name="amount"
                                                        value={ingredient.amount}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Button variant="warning" onClick={this.handleAddFields}>+</Button>
                                                </Col>
                                                <Col>
                                                    <Button variant="warning" onClick={() => this.handleRemoveFields(index)}>-</Button>
                                                </Col>
                                            </Form.Row>
                                        ))}
                                    </Form.Group>
                                    <Form.Group controlId="Preparation">
                                        <Form.Label>Preparation:</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            type="text"
                                            placeholder="text"
                                            onChange={this.handleChange}
                                            name="text"
                                            value={this.state.text}
                                        />
                                    </Form.Group>
                                    <Form.Label>Image url</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="imageUrl"
                                        onChange={this.handleChange}
                                        name="imageUrl"
                                        value={this.state.imageUrl}
                                    />
                                    <Button variant="warning" type="submit">
                                        Save recipe
                                    </Button>
                                </Form>
                            </div>)
                    }}
                </userContext.Consumer>
            </div>
        )
    }
}

export default withRouter(NewRecipeManager)