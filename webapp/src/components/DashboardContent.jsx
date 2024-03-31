import React from 'react'

function DashboardContent() {
    const tableData = [
        {
          customerName: 'Viraj Gotarne',
          applicationNumber: 'AZOPJ6202E',
          applicationId: '01',
          loanAmount: '2000000',
          status: 'pending'
        },
        {
          customerName: 'Anthony Gonzalvez',
          applicationNumber: 'ZOPJS62302E',
          applicationId: '02',
          loanAmount: '360000',
          status: 'under approval'
  
        }
      ];
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0" style={{ boxShadow: 'none', marginLeft: '10px' }}>
              <div className="card-body">
                <h5 style={{fontSize:"0.8rem", fontWeight: "600"}}>Recent Applications</h5>
                <table className="table" style={{ margin: '0 auto' }}>
                  <thead>
                    <tr>
                      <th className='table-content-heading'>Action</th>
                      <th className='table-content-heading'>Customer Name</th>
                      <th className='table-content-heading'>Application Number</th>
                      <th className='table-content-heading'>Loan Amount</th>
                      <th className='table-content-heading'>Status</th>
                      <th className='table-content-heading'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map over the tableData array to generate table rows dynamically */}
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td><input type="checkbox" className="form-check-input" style={{ margin: '0' }} /></td>
                        <td>
                          <div>
                            <p className='table-content'>{row.customerName}</p>
                            <p className='table-content'>{row.applicationNumber}</p>
                          </div>
                        </td>
                        <td className='table-content'>{row.applicationId}</td>
                        <td className='table-content'>{row.loanAmount}</td>
                        <td>
                                                    {row.status === 'pending' ? (
                                                        <span className="badge bg-primary">{row.status}</span>
                                                    ) : (
                                                        <span className="badge bg-success">{row.status}</span>
                                                    )}
                        </td>
                        <td><button className="btn btn-primary table-content" style={{ margin: '0' }}>
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

          {/* New card for "Organisations Approval Pending" */}
          <div className="col-md-4">
            <div className="card border-0" style={{ boxShadow: 'none', marginLeft: '0px' }}>
              <div className="card-body">
                <h5 style={{fontSize:"0.8rem", fontWeight: "600"}}>Organisations Approval Pending</h5>
                {/* Add content for Organisations Approval Pending card here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardContent
