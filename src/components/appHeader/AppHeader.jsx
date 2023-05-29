import {Link, NavLink} from  "react-router-dom";

import './appHeader.scss';





const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul className="app__menu-lists">
                    <li className="app__menu-list"><NavLink exact  to="/"   activeStyle = {{'color': '#9f0013'}} className ="app__menu-link" >Characters</NavLink></li>
                    /
                    <li><NavLink  activeStyle = {{'color': '#9f0013'}} className ="app__menu-link "  to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;