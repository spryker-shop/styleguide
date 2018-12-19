import React from 'react';
import { Link } from 'gatsby';
import style from './header.module.css';

const Header = ({ title }) => (
    <header className={style.header}>
        <h1><Link to="/">{title}</Link></h1>
    </header>
)

export default Header
