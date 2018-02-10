import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Favorite from './favorite';
import Search from './search';

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav>
                        <span className="logo">An iTunes search</span>
                        <ul className="menu">
                            <li>
                                <NavLink to="/search"><i className="fa fa-search"></i><span>Search</span></NavLink>
                            </li>
                            <li>
                                <NavLink to="/favorite"><i className="fa fa-heart"></i><span>Favorites</span></NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route exact path="/" component={Search}></Route>
                    <Route exact path="/favorite" component={Favorite}></Route>
                    <Route exact path="/search/" component={Search}></Route>
                </Switch>
            </div>
        );
    }
}
export default App;
