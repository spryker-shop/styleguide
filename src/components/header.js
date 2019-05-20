import React from 'react';
import { Link } from 'gatsby';

export default ({ title, toggleSidebar, sidebarActiveClass }) => (
    <header className="navbar is-fixed-top is-primary">
        <div className="container is-fullhd">
            <div className="navbar-brand">
                <Link className="navbar-item has-text-white" to="/">{title}</Link>
                <button className={`navbar-burger burger ${sidebarActiveClass()}`} aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample" onClick={toggleSidebar}>
                    <span aria-hidden="true">&nbsp;</span>
                    <span aria-hidden="true">&nbsp;</span>
                    <span aria-hidden="true">&nbsp;</span>
                </button>
            </div>
        </div>
    </header>
)
