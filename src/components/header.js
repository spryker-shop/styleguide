import React from 'react';
import { Link } from 'gatsby';

export default ({ title }) => (
    <header className="navbar is-fixed-top is-primary">
        <div className="container is-fullhd">
            <div className="navbar-brand">
                <Link className="navbar-item has-text-white" to="/">{title}</Link>
            </div>
        </div>
    </header>
)
