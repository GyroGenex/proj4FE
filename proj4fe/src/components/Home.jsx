import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationToolbar from "./NavigationToolbar";
import axios from "axios";

const Home = () => {
    const [user, setUser] = useState(null);


    return (
        <div className="home-container">
            <br />
            <h1>Welcome to the Home Page!</h1>
            <nav className="nav flex-column">
                <Link className="nav-link" to="/users">Users</Link>
                <Link className="nav-link" to="/materialmaster">Material Details</Link>
                <Link className="nav-link" to="/inventory">System Inventory</Link>
            </nav>
        </div>
    );
};

export default Home;
