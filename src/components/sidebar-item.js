import { NavLink } from "react-router-dom";
const SidebarItem = ({ to, children, title, exact }) => {
  return (
    <li className="sidebar__item">
      <NavLink
        to={to}
        className="sidebar__link"
        activeClassName="sidebar__active"
        exact={exact}
      >
        {children}
        <span>{title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
