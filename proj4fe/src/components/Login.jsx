import React, { useState, } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
// import DispatchContext from "../DispatchContext"
// import ErrorManager from "./Utilities/ErrorManager"

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(formData);

        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/users/login',
                {
                    id: formData.id,
                    password: formData.password
                }
            );

            const token = response.data.token; // Assuming the token is returned as "token"
            // You can handle the token here (e.g., store it in local storage, state, or a context)
            localStorage.setItem('token', token); // Save the token to localStorage
            console.log('JWT Token:', token);
            login(token);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error, e.g., display an error message to the user
        }
    };

    return (
        <div
            id="login-div"
            className="position-absolute top-50 start-50 translate-middle"
            style={{ width: "50vh" }}
        >
            <form id="login-form" onSubmit={handleFormSubmit}>
                <h1 id="login-header" className="h3 mb-3 fw-normal">
                    Login
                </h1>
                <div id="id-div" className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="id-input"
                        name="id"
                        placeholder="id"
                        value={formData.id}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="id-input">ID</label>
                </div>
                <div id="password-div" className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="password-input"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password-input">Password</label>
                </div>
                <button
                    id="login-button"
                    className="btn btn-primary w-100 py-2"
                    type="submit"
                >
                    Sign in
                </button>
            </form>
        </div>
    );
}

export default Login;