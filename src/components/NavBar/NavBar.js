import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Navbar.module.css';

export default function NavBar() {
    return (
        <header className={s.navbar}>
            <nav>
                <ul className={s['nav-list']}>
                    <li className={s['list-item']}>
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink to="/favs" >Favoritas</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}