import "./Navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">
          <p>Domov</p>
        </NavLink>
        <NavLink to="/selected">
          <p>Vybrané položky</p>
        </NavLink>
        <NavLink to="/insert">
          <p>Vlozit polozku</p>
        </NavLink>
        <NavLink to="/delete">
          <p>Vymazat polozku</p>
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
