import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './auth/AuthProvider';
import { Link } from "react-router-dom";

function UserDetails() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const { user, isAuthenticated } = useAuth();
    const allowedRoles = "master";
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/users/${id}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
    }, [id]);

    if (!userData) {
        return (
            <div className="d-flex flex-column align-items-center">
                <div>Loading user details...</div>
                <Link to="/users" className="btn btn-primary mt-3">
                    Back to Users
                </Link>
            </div>);
    }

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/users/${id}`);

            // Redirect to the user list page after deleting
            navigate("/users");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    return (
        <div>
            <h2>User Details</h2>
            <p>ID: {userData.id}</p>
            <p>First Name: {userData.first_name}</p>
            <p>Last Name: {userData.last_name}</p>
            <p>Email: {userData.email}</p>
            <p>Role: {userData.role}</p>
            {isAuthenticated() && allowedRoles.includes(user.role) && (
                <button className="btn btn-danger mt-3" onClick={handleDeleteUser}>
                    Delete User
                </button>
            )}

            <Link to="/users" className="btn btn-primary mt-3">
                Back to Users
            </Link>
        </div>
    );
}

export default UserDetails;
