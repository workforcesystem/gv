import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <>
      <header
        className="p-3 mb-3"
        style={{
          backgroundColor: "#f2f6fb",
          // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlink:href="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 link-body-emphasis">
                 Good Morning, Sir!
                </Link>
              </li>
            </ul>
            <div className="text-end">
              <ul
                className="nav col-12 col-lg-auto me-lg-auto mb-2  mb-md-0"
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* <li>
                  <a href="#" className="nav-link px-2 link-body-emphasis">
                    Home
                  </a>
                </li> */}
                <li>
                  <a href="#" className="nav-link px-2 link-body-emphasis justify-content-center">
                    <i className="bi bi-bell">
                    {/* <span className="badge bg-danger">4</span> */}
                    </i>
                  </a>
                </li>
              </ul>
            </div>



            <div className="dropdown text-end">

              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu text-small border-0 bg-primary"  style={{ boxShadow: 'none', borderRadius: '20px'}}>
                {/* <li>
                  <a className="dropdown-item text-white" href="#">
                    New project...
                  </a>
                </li> */}
                <li>
                  <Link to="/view-customer"  className="dropdown-item text-white">
                  Check Customer Applications
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item text-white" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item text-white" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
