import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";

function ViewCustomers({ users }) {
  const [filter, setFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    if (filter === "all") {
      return true;
    } else if (filter === "sanctioned") {
      return user.status !== "rejected" && user.status !== null;
    } else if (filter === "rejected") {
      return user.status === "rejected";
    } else if (filter === "filelogin") {
      return user.status === null || user.status === "File Login";
    }
    return false;
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-9">
          <div className="card border-0" style={{ boxShadow: 'none', marginLeft: '10px' }}>
            <div className="card-body">
              <h5 className="card-title">Customer Applications</h5>
              <table className="table" style={{ margin: '0 auto' }}>
                <thead>
                  <tr>
                    <th className='table-content-heading'>Action</th>
                    <th className='table-content-heading'>Id</th>
                    <th className='table-content-heading'>First Name</th>
                    <th className='table-content-heading'>Last Name</th>
                    <th className='table-content-heading'>PAN</th>
                    <th className='table-content-heading'>Loan Amount</th>
                    <th className='table-content-heading'>Loan Type</th>
                    <th className='table-content-heading'>Loan Product Type</th>
                    <th className='table-content-heading'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={`/update-customer/${user.id}`} className="btn btn-primary table-content" style={{ margin: '0' }}>
                          <span className="bi bi-pencil-fill"></span>
                        </Link>
                      </td>
                      <td className='table-content'>{user.id}</td>
                      <td className='table-content'>{user.first_name}</td>
                      <td className='table-content'>{user.last_name}</td>
                      <td className='table-content'>{user.pan}</td>
                      <td className='table-content'>{user.loan_amount}</td>
                      <td className='table-content'>{user.loan_type}</td>
                      <td className='table-content'>{user.loan_product_type}</td>
                      <td>
                        {user.status === 'rejected' ? (
                          <span className="badge bg-danger">{user.status}</span>
                        ) : user.status === null ? (
                          <span className="badge bg-warning">file login</span>
                        ) : (
                          <span className="badge bg-success">{user.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0" style={{ boxShadow: 'none', marginLeft: '10px' }}>
            <div className="card-body">
              <div className="d-flex justify-content-end mb-3">
                <select
                  className="form-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="sanctioned">Sanctioned</option>
                  <option value="rejected">Rejected</option>
                  <option value="filelogin">File Login</option>
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
    const fetchCustomerApplications = async () => {
      try {
        const res = await axios.get("http://localhost:8080/customer_applications");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomerApplications(); // call the fetch function
  }, []); // empty dependency array ensures that the effect runs only once after the component mounts

  return <ViewCustomers users={users} />;
}

export default Users;
