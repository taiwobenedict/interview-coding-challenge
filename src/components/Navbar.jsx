import React from 'react'

function Navbar({
  handleChangeSearchTerm,
  handleChangeGenderFilter,
  handleClearFilters,
  searchTerm,
}) {

  const style = {
    transition: "0.4s"
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#home">
          LightOnHeights
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarScroll"
          style={{ style }}
        >
          <ul
            className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ maxHeight: "100px" }}
          >
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#home"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#home"
                    id="all"
                    onClick={handleChangeGenderFilter}
                  >
                    All
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#home"
                    id="male"
                    onClick={handleChangeGenderFilter}
                  >
                    Male
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#home"
                    id="female"
                    onClick={handleChangeGenderFilter}
                  >
                    Female
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control mr-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
            <button
              className="btn btn-outline-light"
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar