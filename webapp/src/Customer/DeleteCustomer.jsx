import React from "react";

function DeleteCustomer(props) {
  return (
    <div>
      <form onSubmit={""}>
        <div
          className="card m-5 mx-auto"
          style={{
            width: "30rem",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div className="card-title text-center">
            {" "}
            <h5 htmlFor="customerName" className="form-label">
              Enter Customer Name to Delete:
            </h5>
            <hr />
          </div>
          <div className="card-body">
            <div className="mb-1">
              <input
                type="text"
                className="form-control"
                id="customerName"
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeleteCustomer;
