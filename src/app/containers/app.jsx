import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

if (global.__WEBPACK__IS_CLIENT) {
    require('./app.scss');
}

const App = React.createClass({
    render() {
        const children = React.cloneElement(this.props.children, this.props);

        return (
            <div>
                <header>
                    <Link to="/">Cool App</Link>
                    <ul className="top-nav">
                        <li className="top-nav-item"><Link to="/stargazers">Star Gazers</Link></li>
                        <li className="top-nav-item"><Link to="/about">About</Link></li>
                    </ul>
                </header>
                {children}
                <footer>
                    made by me
                </footer>
            </div>
        );
    }
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
