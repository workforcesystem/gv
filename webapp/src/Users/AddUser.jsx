import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../assets/AddCustomer.css"; // Import CSS file for styling

function AddUser(props) {
    const [organisations, setOrganisations] = useState([]);
    const [roles, setRoles] = useState([]);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const companyIDRef = useRef();
    const roleRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
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
        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://localhost:8080/roles");
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        fetchRoles();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            companyID: companyIDRef.current.value,
            role: roleRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            organisationId: organisationIdRef.current.value
        };
        try {
            const response = await axios.post("http://localhost:8080/add_user", userData);
            console.log("User added successfully:", response.data);
            // Optionally, you can add logic to handle the response here
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div className="container mt-3">
            <div className="col-md-6">
                <div className="card border-0">
                    <div className="card-body">
                        <h5 className="card-title">Add User</h5>
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
                                <label htmlFor="companyID" className="form-label small-font">Company ID</label>
                                <input type="text" className="form-control small-font" id="companyID" ref={companyIDRef} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="role" className="form-label small-font">Role</label>
                                <select className="form-select small-font" id="role" ref={roleRef} required>
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.roles}>{role.roles}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="username" className="form-label small-font">Username</label>
                                <input type="text" className="form-control small-font" id="username" ref={usernameRef} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label small-font">Password</label>
                                <input type="password" className="form-control small-font" id="password" ref={passwordRef} required />
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

export default AddUser;
