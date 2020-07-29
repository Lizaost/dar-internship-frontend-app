import React, {useState} from 'react';
import './App.scss';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import {Home} from "./pages/home/Home";
import {Posts} from "./pages/posts/Posts";
import {Details} from "./pages/post-details/Details";
import {Chat} from "./pages/chat/Chat";


function App() {


    return (
        <Router>
            <div className="App">
                <nav className="nav-menu">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
                        <li>
                            <Link to="/chat">Chat</Link>
                        </li>
                    </ul>
                </nav>
                <div className="content">
                    <Switch>
                        <Route path="/chat">
                            <Chat />
                        </Route>
                        <Route exact path="/posts">
                            <Posts />
                        </Route>
                        <Route path="/posts/:id">
                            <Details />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/*">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
