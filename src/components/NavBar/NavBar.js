import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Navbar.module.css';

export default function NavBar() {
    return (
        <header className={s.navbar}>
            <nav>
                <ul className={s['nav-list']}>
                    <li className={s['list-item']}>
                        <NavLink exact to="/catalogos" activeClassName={s['active-link']}>Catálogo</NavLink>
                        <NavLink exact to="/favs" activeClassName={s['active-link']}>Favoritas</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}