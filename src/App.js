import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./actions/userActions";

import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  // Adding gender

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeGenderFilter = (e) => {
    setGenderFilter(e.target.id);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
    setCurrentPage(1);
  };

  // Display spinner while loading...
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  // Display error if app fail to fectch data
  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    // gender = user.gender.toLowerCase(); bug
    const gender = genderFilter;
    return (
      (name.includes(searchTermLower) || username.includes(searchTermLower)) &&
      (genderFilter === "all" || genderFilter === gender)
    );
  });

  
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Changed it case
  const RenderTableHeader = () => {
    return (
      <thead className="thead-light">
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th className="email">Email</th>
          <th className="phone">Phone</th>
          <th className="website">Website</th>
        </tr>
      </thead>
    );
  };

  const RenderTableBody = () => {
    return (
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            <td className="font-weight-bold">{user.name}</td>
            <td>{user.username}</td>
            <td className="email">{user.email}</td>
            <td className="phone">{user.phone}</td>
            <td className="website">{user.website}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  const RenderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <div
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button
              className="btn btn-dark"
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </div>
        ))}
      </ul>
    );
  };
  return (
    <>
      <Navbar
        handleChangeSearchTerm={handleChangeSearchTerm}
        handleChangeGenderFilter={handleChangeGenderFilter}
        searchTerm={searchTerm}
        handleClearFilters={handleClearFilters}
      />
      {currentUsers.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="alert alert-info">{`${searchTerm} Not Found`}</div>
        </div>
      ) : (
        <div className="App container">
          <table className="table table-striped table-bordered mt-4 table-hover">
            <RenderTableHeader />
            <RenderTableBody />
          </table>
          <RenderPagination />
        </div>
      )}
    </>
  );
}

export default App;
