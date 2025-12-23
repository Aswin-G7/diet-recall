import { useEffect, useRef } from "react";
import "./Sidebar.scss";
import feather from "feather-icons";

const Sidebar = () => {
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    feather.replace();
  }, []);

  const toggleMenu = () => {
    navRef.current.classList.toggle("nav--open");
    hamburgerRef.current.classList.toggle("hamburger-menu--open");

    // 🔑 Re-run feather after DOM updates
    setTimeout(() => {
      feather.replace();
    }, 0);
  };

  return (
    <>
      <div className="title__container">
        <div className="made"></div>
      </div>

      <div className="sidebar">
        <div className="hamburger-menu__container" onClick={toggleMenu}>
          <div className="hamburger-menu" ref={hamburgerRef}>
            <div className="hamburger-menu__line"></div>
            <div className="hamburger-menu__line"></div>
            <div className="hamburger-menu__line"></div>
          </div>
        </div>

        <nav className="nav" ref={navRef}>
          <div className="nav__item" style={{ "--i": 1 }}>
            <i data-feather="home"></i>
            <span className="nav__item-text">Home</span>
          </div>

          <div className="nav__item" style={{ "--i": 2 }}>
            <i data-feather="bell"></i>
            <span className="nav__item-text">Notification</span>
          </div>

          <div className="nav__item" style={{ "--i": 3 }}>
            <i data-feather="settings"></i>
            <span className="nav__item-text">Settings</span>
          </div>

          <div className="nav__item" style={{ "--i": 4 }}>
            <i data-feather="user"></i>
            <span className="nav__item-text">Profile</span>
          </div>

          <div className="nav__item" style={{ "--i": 5 }}>
            <i data-feather="log-out"></i>
            <span className="nav__item-text">Log Out</span>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;
