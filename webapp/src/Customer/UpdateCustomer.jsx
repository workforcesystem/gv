import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import "../assets/AddCustomer.css";

function UpdateCustomer() {
    const { id } = useParams();
    
    const [customer, setCustomer] = useState({});
    const [loanTypes, setLoanTypes] = useState([]);
    const [loanProductTypes, setLoanProductTypes] = useState([]);
    const [organisations, setOrganisations] = useState([]);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const panRef = useRef();
    const loanAmountRef = useRef();
    const loanTypeRef = useRef();
    const loanProductTypeRef = useRef();
    const organisationNameRef = useRef();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/customer_applications/${id}`);
                setCustomer(response.data);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };
        fetchCustomer();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [loanTypesResponse, loanProductTypesResponse, organisationsResponse] = await Promise.all([
                    axios.get("http://localhost:8080/loanType"),
                    axios.get("http://localhost:8080/loanProductType"),
                    axios.get("http://localhost:8080/organisation")
                ]);
                setLoanTypes(loanTypesResponse.data);
                setLoanProductTypes(loanProductTypesResponse.data);
                setOrganisations(organisationsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (Object.keys(customer).length !== 0) {
            firstNameRef.current.value = customer.first_name;
            lastNameRef.current.value = customer.last_name;
            emailRef.current.value = customer.email;
            panRef.current.value = customer.pan;
            loanAmountRef.current.value = customer.loan_amount;
            loanTypeRef.current.value = customer.loan_type;
            loanProductTypeRef.current.value = customer.loan_product_type;
            organisationNameRef.current.value = customer.organisation_name;
        }
    }, [customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCustomerData = {
            id: id,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            pan: panRef.current.value,
            loanAmount: loanAmountRef.current.value,
            loanType: loanTypeRef.current.value,
            loanProductType: loanProductTypeRef.current.value,
            organisationName: organisationNameRef.current.value
        };

        try {
            const response = await axios.put(`http://localhost:8080/update_customer/${id}`, updatedCustomerData);
            console.log("Customer updated successfully:", response.data);
            // Optionally, you can add logic to handle the response here
        } catch (error) {
            console.error("Error updating customer data:", error);
        }
    };

    return (
        <div className="container mt-3">
            <div className="col-md-6">
                <div className="card border-0">
                    <div className="card-body">
                        <h5 className="card-title">Update Customer</h5>
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
                                <label htmlFor="loanType" className="form-label small-font">Loan Type</label>
                                <select className="form-select small-font" id="loanType" ref={loanTypeRef} required>
                                    <option value="">Select Loan Type</option>
                                    {loanTypes.map((loanType) => (
                                        <option key={loanType.id} value={loanType.loanType}>{loanType.loanType}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="loanProductType" className="form-label small-font">Loan Product Type</label>
                                <select className="form-select small-font" id="loanProductType" ref={loanProductTypeRef} required>
                                    <option value="">Select Loan Product Type</option>
                                    {loanProductTypes.map((loanProductType) => (
                                        <option key={loanProductType.id} value={loanProductType.loanProductType}>{loanProductType.loanProductType}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="organisationName" className="form-label small-font">Organisation Name</label>
                                <select className="form-select small-font" id="organisationName" ref={organisationNameRef} required>
                                    <option value="">Select Organisation Name</option>
                                    {organisations.map((organisation) => (
                                        <option key={organisation.id} value={organisation.organisation_name}>{organisation.organisation_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="loanAmount" className="form-label small-font">Loan Amount</label>
                                <input type="text" className="form-control small-font" id="loanAmount" ref={loanAmountRef} required />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary small-font">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCustomer;
