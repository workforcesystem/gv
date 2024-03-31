import React from 'react';
import '../assets/dashboard.css';
import DashboardContent from './DashboardContent';

function Dashboard() {

    // Array of objects containing information for each row of the table


  return (
    <>
     <div className="container mt-4" style={{ borderRadius: '20px', paddingLeft: '0' }}>
  <div className="row">
    <div className="col-md-2">
      <div className="card h-100 border-0" style={{boxShadow: 'none', marginLeft: '20px' }}>
        <div className="card-body">
          <h5 className="card-text">Loans Disbursed</h5>
          <p className="card-title">0</p>
        </div>
      </div>
    </div>
    <div className="col-md-2">
      <div className="card h-100 border-0" style={{boxShadow: 'none' }}>
        <div className="card-body">
          <h5 className="card-text">Users Onboard</h5>
          <p className="card-title">3</p>
        </div>
      </div>
    </div>
    <div className="col-md-2">
      <div className="card h-100 border-0" style={{boxShadow: 'none' }}>
        <div className="card-body">
          <h5 className="card-text">Loan Applications</h5>
          <p className="card-title">6</p>
        </div>
      </div>
    </div>
    <div className="col-md-2">
      <div className="card h-100 border-0" style={{boxShadow: 'none' }}>
        <div className="card-body">
          <h5 className="card-text">Loans Rejected</h5>
          <p className="card-title">0</p>
        </div>
      </div>
    </div>
    <div className="col-md-2">
      <div className="card h-100 border-0" style={{boxShadow: 'none' }}>
        <div className="card-body">
          <h5 className="card-text">Sub Users</h5>
          <p className="card-title">0</p>
        </div>
      </div>
    </div>
    <div className="col-md-2">
      <div className="card h-100 border-0" style={{boxShadow: 'none' }}>
        <div className="card-body">
          <h5 className="card-text">Organisations</h5>
          <p className="card-title">1</p>
        </div>
      </div>
    </div>
  </div>
</div>




       {/* Table */}
       <DashboardContent />
    </>
  )
}

export default Dashboard
