import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider'; // Import the useAuth hook

function NavigationToolbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav id="navbar-nav" className="navbar navbar-dark bg-primary">
            <div id="navbar-div" className="container-fluid">
                <Link id="navbar-tms-link" className="navbar-brand" to="/">
                    Home
                </Link>

                {isAuthenticated() ? (
                    <div className="navbar-brand d-flex align-items-center">
                        <span className="me-2">Welcome, {user.id}</span> {/* Adjust property based on user object */}
                        <Link
                            id="navbar-logout-button"
                            type="button"
                            className="navbar-brand"
                            onClick={logout}
                            to="/login"
                        >
                            Logout
                        </Link>
                    </div>
                ) : (
                    <Link className="navbar-brand" to="/login">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default NavigationToolbar;
