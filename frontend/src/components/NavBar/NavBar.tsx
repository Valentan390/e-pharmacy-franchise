import { FC } from "react";
import { Nav_div, Nav_nav, Nav_NavLink, NavSeparator } from "./NavBar.styled";
import { navItems } from "../../constants";
import { useMediaQueryResponsive, useMobileMenu } from "../../hooks";

const NavBar: FC = () => {
  const { closeMobileMenu } = useMobileMenu();
  const { isDesktop } = useMediaQueryResponsive();

  return (
    <Nav_nav>
      {navItems.map(({ id, to, text }, index) => (
        <Nav_div key={id}>
          {index !== navItems.length - 1 && <NavSeparator />}
          <Nav_NavLink
            to={to}
            onClick={isDesktop ? undefined : closeMobileMenu}
          >
            {text}
          </Nav_NavLink>
        </Nav_div>
      ))}
    </Nav_nav>
  );
};

export default NavBar;
