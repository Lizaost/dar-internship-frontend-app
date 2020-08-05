import React, {useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import {Home} from "./pages/home/Home";
import {Posts} from "./pages/posts/Posts";
import {Details} from "./pages/post-details/Details";
import {Room} from "./pages/room/Room";
import {UserInfo} from './types/interfaces';
import {UserContext} from "./services/context";
import {Videos} from "./pages/videos/Videos";


function App() {

    const [user, setUser] = useState<UserInfo | null>(null);
    console.log(user);


    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
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
                                <Link to="/room">Room</Link>
                            </li>
                            <li>
                                <Link to="/videos">Videos</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="content">
                        <Switch>
                            <Route path="/room/:id">
                                <Room/>
                            </Route>
                            <Route path="/videos">
                                <Videos/>
                            </Route>
                            <Route exact path="/posts">
                                <Posts/>
                            </Route>
                            <Route path="/posts/:id">
                                <Details/>
                            </Route>
                            <Route exact path="/">
                                <Home setUser={setUser}/>
                            </Route>
                            <Route path="*">
                                <h2>Not found</h2>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
