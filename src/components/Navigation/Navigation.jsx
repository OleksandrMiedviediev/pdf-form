import { NavLink } from 'react-router-dom'
import css from './Navigation.module.css'
import clsx from 'clsx'


const NavLinkClass = ({ isActive }) => { return clsx(css.link, isActive && css.active)}

export default function Navigation() {
    return (
        <nav className={css.container}>
            <NavLink to="/" className={NavLinkClass}>Home</NavLink>
            <NavLink to="/dokuments" className={NavLinkClass}>Dokuments</NavLink>
      </nav>
    )
}


