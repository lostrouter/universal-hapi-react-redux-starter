import React from 'react';
import { Link } from 'react-router';

if (global.__WEBPACK__IS_CLIENT) {
    require('./app.scss');
}

const App = React.createClass({
    render() {
        return (
            <div>
                <header>
                    <Link to="/">Cool App</Link>
                    <ul className="top-nav">
                        <li className="top-nav-item"><Link to="/stargazers">Star Gazers</Link></li>
                        <li className="top-nav-item"><Link to="/about">About</Link></li>
                    </ul>
                </header>
                {this.props.children}
                <footer>
                    made by me
                </footer>
            </div>
        );
    }
});

export default App;
