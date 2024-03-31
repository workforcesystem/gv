import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewUsers({ users }) {
  const [filter, setFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return user.status !== "disable";
    } else if (filter === "disable") {
      return user.status === "disable";
    }
    return false;
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-9"> {/* Adjust the column width */}
          <div className="card border-0" style={{ boxShadow: 'none', marginLeft: '10px' }}>
            <div className="card-body">
              <h5 className="card-title">Users List</h5>
              <table className="table" style={{ margin: '0 auto' }}>
                <thead>
                  <tr>
                    <th className='table-content-heading'>Action</th>
                    <th className='table-content-heading'>Id</th>
                    <th className='table-content-heading'>First Name</th>
                    <th className='table-content-heading'>Last Name</th>
                    <th className='table-content-heading'>Email Address</th>
                    <th className='table-content-heading'>Role</th>
                    <th className='table-content-heading'>Status</th>
                    <th className='table-content-heading'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td><input type="checkbox" className="form-check-input" style={{ margin: '0' }} /></td>
                      <td className='table-content'>{user.id}</td>
                      <td className='table-content'>{user.first_name}</td>
                      <td className='table-content'>{user.last_name}</td>
                      <td className='table-content'>{user.email}</td>
                      <td className='table-content'>{user.role}</td>
                      <td>
                        {user.status === 'disable' ? (
                          <span className="badge bg-primary">{user.status}</span>
                        ) : user.status === null ? (
                          <span className="badge bg-success">active</span>
                        ): (
                          <span className="badge bg-success">{user.status}</span>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-primary table-content" style={{ margin: '0' }}>
                          <span className="bi bi-pencil-fill"></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-3"> {/* Adjust the column width */}
          <div className="card border-0" style={{ boxShadow: 'none', marginLeft: '10px' }}>
            <div className="card-body">
              <div className="d-flex justify-content-end mb-3">
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="disable">Disabled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/data");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllUsers(); // call the fetch function
  }, []); // empty dependency array ensures that the effect runs only once after the component mounts

  return <ViewUsers users={users} />;
}

export default Users;
