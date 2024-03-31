import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [userAdminDropdownOpen, setUserAdminDropdownOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false); // New state for organization dropdown

  const toggleAuthDropdown = () => {
    setAuthDropdownOpen(!authDropdownOpen);
  };

  const toggleUserAdminDropdown = () => {
    setUserAdminDropdownOpen(!userAdminDropdownOpen);
  };

  const toggleOrgDropdown = () => { // Function to toggle organization dropdown
    setOrgDropdownOpen(!orgDropdownOpen);
  };

  return (
    <aside id="sidebar">
      <div className="d-flex">
        <button
          className="btn btn-dark m-2"
          aria-label="open drawer"
          onClick={() => {
            document.querySelector("#sidebar").classList.toggle("expand");
          }}
        >
          <span className="bi bi-list text-light"></span>
        </button>
        <div className="sidebar-logo m-3">
          <Link to="#" className="text-dark">Globi Vista</Link>
        </div>
      </div>
      <ul className="list-unstyled sidebar-nav">
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link text-dark">
            <button className="btn btn-dark">
              <span className="bi bi-chat-dots text-light"></span>
            </button>
            <span className="ms-3" style={{ fontSize: "0.72rem" }}>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="#" className="sidebar-link text-dark">
            <button className="btn btn-dark">
              <span className="bi bi-file-text text-light"></span>
            </button>
            <span className="ms-3" style={{ fontSize: "0.72rem" }}>Documentation</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link
            to="/view-customer"
            className="sidebar-link collapsed has-dropdown text-dark"
            data-bs-toggle="collapse"
            data-bs-target="#authDropdown"
            aria-expanded={authDropdownOpen}
            aria-controls="authDropdown"
            onClick={toggleAuthDropdown}
          >
            <button className="btn btn-dark">
              <span className="bi bi-people text-light"></span>
            </button>
            <span className="ms-3" style={{ fontSize: "0.72rem" }}>Customer Management</span>
          </Link>
          <ul
            id="authDropdown"
            className={`sidebar-dropdown list-unstyled collapse ${
              authDropdownOpen ? "show" : ""
              }`}
            data-bs-parent="#sidebar"
          >
            <li className="sidebar-item">
              <Link to="/view-customer" className="sidebar-link text-dark">
                View Customer
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/add-customer" className="sidebar-link text-dark">
                Add Customer
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <Link
            to="/view-users"
            className="sidebar-link collapsed has-dropdown text-dark"
            data-bs-toggle="collapse"
            data-bs-target="#userAdminDropdown"
            aria-expanded={userAdminDropdownOpen}
            aria-controls="userAdminDropdown"
            onClick={toggleUserAdminDropdown}
          >
            <button className="btn btn-dark">
              <span className="bi bi-people text-light"></span>
            </button>
            <span className="ms-3" style={{ fontSize: "0.72rem" }}>User Administration</span>
          </Link>
          <ul
            id="userAdminDropdown"
            className={`sidebar-dropdown list-unstyled collapse ${
              userAdminDropdownOpen ? "show" : ""
              }`}
            data-bs-parent="#sidebar"
          >
            <li className="sidebar-item">
              <Link to="/view-users" className="sidebar-link text-dark">
                View User
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/add-user" className="sidebar-link text-dark">
                Add User
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <Link
            to="/view-organizations"
            className="sidebar-link collapsed has-dropdown text-dark"
            data-bs-toggle="collapse"
            data-bs-target="#orgDropdown"
            aria-expanded={orgDropdownOpen}
            aria-controls="orgDropdown"
            onClick={toggleOrgDropdown}
          >
            <button className="btn btn-dark">
              <span className="bi bi-building text-light"></span> {/* Icon for organization */}
            </button>
            <span className="ms-3" style={{ fontSize: "0.72rem" }}>Organization Management</span>
          </Link>
          <ul
            id="orgDropdown"
            className={`sidebar-dropdown list-unstyled collapse ${
              orgDropdownOpen ? "show" : ""
              }`}
            data-bs-parent="#sidebar"
          >
            <li className="sidebar-item">
              <Link to="/view-organisation" className="sidebar-link text-dark">
                View Organizations
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/add-organisation" className="sidebar-link text-dark">
                Add Organization
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="#" className="sidebar-link text-dark">
          <span className="lni lni-exit"></span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
