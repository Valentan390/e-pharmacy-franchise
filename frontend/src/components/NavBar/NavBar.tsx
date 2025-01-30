import { FC } from "react";
import { Nav_div, Nav_nav, Nav_NavLink } from "./NavBar.styled";
import { navItems } from "../../constants";

const NavBar: FC = () => {
  return (
    <Nav_nav>
      {navItems.map(({ id, to, text }) => (
        <Nav_div key={id}>
          <Nav_NavLink to={to}>{text}</Nav_NavLink>
        </Nav_div>
      ))}
    </Nav_nav>
  );
};

export default NavBar;
