import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../assets/AddCustomer.css"; // Import CSS file for styling

function AddCustomer(props) {
    const [organisations, setOrganisations] = useState([]);
    const [loanProductTypes, setLoanProductTypes] = useState([]);
    const [loanType, setLoanType] = useState([]);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const panRef = useRef();
    const loanAmountRef = useRef();
    const loanTypeRef = useRef();
    const loanProductTypeRef = useRef();
    const organisationIdRef = useRef();

    useEffect(() => {
        const fetchOrganisations = async () => {
            try {
                const response = await axios.get("http://localhost:8080/organisation");
                setOrganisations(response.data);
            } catch (error) {
                console.error("Error fetching organisations:", error);
            }
        };
        fetchOrganisations();
    }, []);

    useEffect(() => {
        const fetchLoanProductTypes = async () => {
            try {
                const response = await axios.get("http://localhost:8080/loanProductType");
                setLoanProductTypes(response.data);
            } catch (error) {
                console.error("Error fetching loan product types:", error);
            }
        };
        fetchLoanProductTypes();
    }, []);

    useEffect(() => {
        const fetchLoanType = async () => {
            try {
                const response = await axios.get("http://localhost:8080/loanType");
                setLoanType(response.data);
            } catch (error) {
                console.error("Error fetching loan types:", error);
            }
        };
        fetchLoanType();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customerData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            pan: panRef.current.value,
            loanAmount: loanAmountRef.current.value,
            loanType: loanTypeRef.current.value,
            loanProductType: loanProductTypeRef.current.value,
            organisationId: organisationIdRef.current.value
        };
        try {
            const response = await axios.post("http://localhost:8080/add_customer", customerData);
            console.log("Submitted successfully:", response.data);
            // Optionally, you can add logic to handle the response here
        } catch (error) {
            console.error("Error submitting customer data:", error);
        }
    };

    return (
        <div className="container mt-3">
            <div className="col-md-6">
                <div className="card border-0">
                    <div className="card-body">
                        <h5 className="card-title">Add Customer</h5>
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label small-font">First Name</label>
                                <input type="text" className="form-control small-font" id="firstName" ref={firstNameRef} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label small-font">Last Name</label>
                                <input type="text" className="form-control small-font" id="lastName" ref={lastNameRef} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label small-font">Email</label>
                                <input type="email" className="form-control small-font" id="email" ref={emailRef} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="pan" className="form-label small-font">PAN Number</label>
                                <input type="text" className="form-control small-font" id="pan" ref={panRef} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="loanProductType" className="form-label small-font">Loan Product Type</label>
                                <select className="form-select small-font" id="loanProductType" ref={loanProductTypeRef} required>
                                    <option value="">Select Loan Product Type</option>
                                    {loanProductTypes.map((lpt) => (
                                        <option key={lpt.id} value={lpt.id}>{lpt.loanProductType}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="loanType" className="form-label small-font">Loan Type</label>
                                <select className="form-select small-font" id="loanType" ref={loanTypeRef} required>
                                    <option value="">Select Loan Type</option>
                                    {loanType.map((lpt) => (
                                        <option key={lpt.id} value={lpt.id}>{lpt.loanType}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="organisationId" className="form-label small-font">Organisation</label>
                                <select className="form-select small-font" id="organisationId" ref={organisationIdRef} required>
                                    <option value="">Select Organisation</option>
                                    {organisations.map((org) => (
                                        <option key={org.id} value={org.organisation_name}>{org.organisation_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="loanAmount" className="form-label small-font">Loan Amount</label>
                                <input type="text" className="form-control small-font" id="loanAmount" ref={loanAmountRef} required />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary small-font">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCustomer;
