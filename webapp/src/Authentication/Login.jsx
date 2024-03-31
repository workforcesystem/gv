import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Removed unnecessary import

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };

        axios.defaults.withCredentials = true;
        try {
            const response = await axios.post('http://localhost:8080/login', userData);
            console.log('Login successful:', response.data);
            // Optionally, you can add logic to handle the response here
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {
        axios.get("http://localhost:5173").then((response) => {
            console.log(response);
        });
    }, []); // Added missing closing parenthesis and semicolon

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        ref={usernameRef}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        ref={passwordRef}
                                        required
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
