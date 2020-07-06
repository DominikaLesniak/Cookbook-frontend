import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import RankingSection from '../ranking/RankingSection'
import { userContext } from '../userContext';
import './Dashboard.css'

class NavigationBar extends Component {

    handleLogoutButton = () => {
        localStorage.removeItem('accessToken');
        this.props.signOut();
        this.props.history.push("/")
    }

    render() {
        return (
            <userContext.Consumer>
                {({user}) => {
                    const userSigned = user.id !== undefined;
                    return (
                        <Navbar className="NavigationBar" variant="dark">
                            <Navbar.Brand size="lg">Cookbook</Navbar.Brand>
                            <Nav>
                                <Nav.Link action onClick={() => this.props.history.push("/")}>Home</Nav.Link>
                                <Nav.Link action onClick={() => this.props.history.push("/ranking")}>Ranking</Nav.Link>
                                {userSigned && <Nav.Link action onClick={() => this.props.history.push("/profile")}>Profile</Nav.Link>}
                                {user.name
                                    ? <Nav.Link active="false"> {user.name} logged in</Nav.Link>
                                    : <Nav.Link action onClick={() => this.props.history.push("/login")}>Sign in</Nav.Link>
                                }
                                {userSigned && <Button onClick={() => this.props.logout()} variant="warning">Sign out</Button>}
                            </Nav>
                            {/* <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button  variant="warning">Search</Button>
                            </Form> */}
                        </Navbar>
                    )
                }}
            </userContext.Consumer>
        )
        // return (
        //     <div className="container-fluid">

        //         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //             <div className="brand">Menu<span className="generator">Generator</span></div>
        //             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
        //                 aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarNavDropdown">
        //                 <ul className="navbar-nav mr-auto">
        //                     <li className="nav-item active">
        //                         <Link className="nav-link" to="/main">Strona główna</Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to="/user">Profil</Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to="/menulist">Jadłospisy</Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to="/recipes">Przepisy</Link>
        //                     </li>
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to="/ingredients">Składniki</Link>
        //                     </li>

        //                 </ul>
        //                 <button className="logout btn btn-outline-dark" onClick={this.handleLogoutButton}>Wyloguj się</button>
        //             </div>
        //         </nav>

        //     </div>
        // );
    }
}

export default withRouter(NavigationBar);