import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Recipes from '../recipe/Recipes';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            recipes: []
        }
        this.refresh = this.refresh.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
    }

    refresh() {
        axios.get("http://localhost:8080/recipe", {
            params: {
                jsonRequest: {
                    namePattern: this.state.query
                }
            }
        })
            .then(res => {
                const recipes = res.data.recipes;
                this.setState({
                    recipes: recipes
                })
            })
            .catch(error => {
                console.log("Some Exception happened: ", error.toJSON());
            });
    }

    componentDidMount() {
        this.refresh();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitQuery(event) {
        event.preventDefault();
        this.refresh();
    }

    render() {
        return (
            <div>
                <Form inline className="SearchForm" onSubmit={this.submitQuery}>
                    <FormControl type="text" placeholder="Search" onChange={this.handleChange}
                            name="query" value={this.state.query}/>
                    <Button variant="warning" onClick={this.refresh}>Search</Button>
                </Form>
                {this.state.recipes && <Recipes recipes={this.state.recipes} />}
            </div>);
    }
}

export default withRouter(HomePage);