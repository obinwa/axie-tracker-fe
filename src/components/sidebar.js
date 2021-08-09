// @ts-nocheck
import { Link } from "react-router-dom";
import logo from "../assets/logo1.jpeg";
// import user from "../assets/user.png";
import logout from "../assets/logout.svg";
import SidebarItem from "./sidebar-item";
// import menu from "../assets/menu.svg";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        {/* <div className="sidebar__menu">
          <img src={menu} alt="menu" />
        </div> */}
        <div className="sidebar__logo">
          <img src={logo} alt="diamond logo" />
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            <SidebarItem to="/" title="Dashboard" exact={true}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.93745 0H1.31245C0.58873 0 0 0.58873 0 1.31245V4.68745C0 5.41132 0.58873 6.00005 1.31245 6.00005H6.93745C7.66132 6.00005 8.25005 5.41132 8.25005 4.68745V1.31245C8.25005 0.58873 7.66132 0 6.93745 0Z"
                  fill="black"
                />
                <path
                  d="M6.93745 7.49994H1.31245C0.58873 7.49994 0 8.08867 0 8.81253V16.6875C0 17.4113 0.58873 18 1.31245 18H6.93745C7.66132 18 8.25005 17.4113 8.25005 16.6875V8.81253C8.25005 8.08867 7.66132 7.49994 6.93745 7.49994Z"
                  fill="black"
                />
                <path
                  d="M16.6876 12H11.0626C10.3387 12 9.75 12.5887 9.75 13.3126V16.6876C9.75 17.4113 10.3387 18 11.0626 18H16.6876C17.4113 18 18 17.4113 18 16.6876V13.3126C18 12.5887 17.4113 12 16.6876 12Z"
                  fill="black"
                />
                <path
                  d="M16.6876 0H11.0626C10.3387 0 9.75 0.58873 9.75 1.31245V9.18745C9.75 9.91132 10.3387 10.5 11.0626 10.5H16.6876C17.4113 10.5 18 9.91132 18 9.18745V1.31245C18 0.58873 17.4113 0 16.6876 0V0Z"
                  fill="black"
                />
              </svg>
            </SidebarItem>
            <SidebarItem to="customer" title={"New Scholar"}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0C6.383 0 4.25391 2.1291 4.25391 4.74609C4.25391 7.36309 6.383 9.49219 9 9.49219C11.617 9.49219 13.7461 7.36309 13.7461 4.74609C13.7461 2.1291 11.617 0 9 0Z"
                  fill="black"
                />
                <path
                  d="M14.9051 12.5928C13.6057 11.2734 11.8831 10.5469 10.0547 10.5469H7.94531C6.11691 10.5469 4.39432 11.2734 3.09495 12.5928C1.80193 13.9057 1.08984 15.6387 1.08984 17.4727C1.08984 17.7639 1.32595 18 1.61719 18H16.3828C16.674 18 16.9102 17.7639 16.9102 17.4727C16.9102 15.6387 16.1981 13.9057 14.9051 12.5928Z"
                  fill="black"
                />
              </svg>
            </SidebarItem>
            {/* <SidebarItem to="/transaction" title="Transaction">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.4844 3.59375H2.51562C1.12853 3.59375 0 4.72228 0 6.10938V16.8906C0 18.2777 1.12853 19.4062 2.51562 19.4062H20.4844C21.8715 19.4062 23 18.2777 23 16.8906V6.10938C23 4.72228 21.8715 3.59375 20.4844 3.59375ZM2.51562 5.03125H20.4844C21.0788 5.03125 21.5625 5.51492 21.5625 6.10938V7.54688H1.4375V6.10938C1.4375 5.51492 1.92117 5.03125 2.51562 5.03125ZM20.4844 17.9688H2.51562C1.92117 17.9688 1.4375 17.4851 1.4375 16.8906V8.98438H21.5625V16.8906C21.5625 17.4851 21.0788 17.9688 20.4844 17.9688Z"
                  fill="black"
                />
                <path
                  d="M5.03125 15.8125H4.3125C3.91557 15.8125 3.59375 15.4907 3.59375 15.0938V14.375C3.59375 13.9781 3.91557 13.6562 4.3125 13.6562H5.03125C5.42818 13.6562 5.75 13.9781 5.75 14.375V15.0938C5.75 15.4907 5.42818 15.8125 5.03125 15.8125Z"
                  fill="black"
                />
              </svg>
            </SidebarItem> */}
            {/* <SidebarItem to="/users" title="Users">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0C6.383 0 4.25391 2.1291 4.25391 4.74609C4.25391 7.36309 6.383 9.49219 9 9.49219C11.617 9.49219 13.7461 7.36309 13.7461 4.74609C13.7461 2.1291 11.617 0 9 0Z"
                  fill="black"
                />
                <path
                  d="M14.9051 12.5928C13.6057 11.2734 11.8831 10.5469 10.0547 10.5469H7.94531C6.11691 10.5469 4.39432 11.2734 3.09495 12.5928C1.80193 13.9057 1.08984 15.6387 1.08984 17.4727C1.08984 17.7639 1.32595 18 1.61719 18H16.3828C16.674 18 16.9102 17.7639 16.9102 17.4727C16.9102 15.6387 16.1981 13.9057 14.9051 12.5928Z"
                  fill="black"
                />
              </svg>
            </SidebarItem> */}
          </ul>
        </nav>
        <Link className="sidebar__logout" to="/logout">
          {/* <img src={user} alt="user" /> */}
          <div>
            <p>{sessionStorage.getItem("name")}</p>
            <p>{sessionStorage.getItem("email")}</p>
          </div>
          <img src={logout} alt="logout" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
