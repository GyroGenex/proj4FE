import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from './auth/AuthProvider';
import { Link } from "react-router-dom";

function Users() {
    const { user, isAuthenticated } = useAuth();
    const [usersData, setUsersData] = useState([]);

    // Define the user roles that are allowed to access the form
    const allowedRoles = "master"; // Adjust based on your roles

    // Check if the user's role is allowed to access the form
    // const canAccessForm = allowedRoles.includes(user.role);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: '',
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
                'https://ytproj4be.onrender.com/api/v1/users/',
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                }
            );
        } catch (error) {
            console.error('Creation error:', error);
            // Handle login error, e.g., display an error message to the user
        }

        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: '',
        });
        // Fetch updated user data to refresh the user table
        axios.get("https://ytproj4be.onrender.com/api/v1/users/")
            .then(response => {
                setUsersData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    };




    // Table data containing user information (example)
    useEffect(() => {
        axios.get("https://ytproj4be.onrender.com/api/v1/users/")
            .then(response => {
                setUsersData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <div>
            {/* {isAuthenticated() && allowedRoles === user.role && ( */}
            {true && (
                <div id="login-div" className="mb-4">
                    {/* Display the form for authorized users */}
                    <h2>Add users</h2>
                    <form id="login-form" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="id-input"
                                        name="first_name"
                                        placeholder="First Name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">First Name</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="id-input"
                                        name="last_name"
                                        placeholder="Last Name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Last Name</label>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="id-input"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Email Address</label>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="id-input"
                                        name="password"
                                        placeholder="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Password</label>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-floating">
                                    <select
                                        className="form-select"
                                        id="role-select"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="master">Master</option>
                                        <option value="mm">MM</option>
                                        <option value="ic">IC</option>
                                    </select>
                                    <label htmlFor="role-select">Role</label>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-end">
                                <button
                                    id="Submit-button"
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Create user
                                </button>

                            </div>
                            {/* Add more columns for other form fields */}
                        </div>

                    </form>
                    {/* Add your form elements here */}
                </div >
            )
            }

            <h2>User Table</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((userData) => (
                        <tr key={userData.id}>
                            <td>{userData.id}</td>
                            <td>{userData.email}</td>
                            <td>{userData.role}</td>
                            <td>
                                <Link to={`/users/${userData.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default Users;
