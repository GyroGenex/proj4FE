import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from './auth/AuthProvider';
import { Link } from "react-router-dom";

function MaterialMaster() {
    const { user, isAuthenticated } = useAuth();
    const [masterData, setMasterData] = useState([]);

    // Define the user roles that are allowed to access the form
    const allowedRoles = "mm"; // Adjust based on your roles

    // Check if the user's role is allowed to access the form

    const [formData, setFormData] = useState({
        material_description: '',
        buom: '',
        price: '',
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
        const token = localStorage.getItem('token');
        console.log(token);

        try {
            const response = await axios.post(
                'https://ytproj4be.onrender.com/api/v1/materialmaster/',
                {
                    material_description: formData.material_description,
                    buom: formData.buom,
                    price: formData.price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Handle the response here (e.g., show success message)
        } catch (error) {
            console.error('Creation error:', error);
            // Handle the error here (e.g., display an error message to the user)
        }


        setFormData({
            material_description: '',
            buom: '',
            price: '',
        });
        // Fetch updated user data to refresh the user table;
        axios.get("https://ytproj4be.onrender.com/api/v1/materialmaster/")
            .then(response => {
                setMasterData(response.data);
            })
            .catch(error => {
                console.error("Error fetching material data:", error);
            });
    };




    // Table data containing user information (example)
    useEffect(() => {
        axios.get("https://ytproj4be.onrender.com/api/v1/materialmaster/")
            .then(response => {
                setMasterData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    return (
        <div>
            {isAuthenticated() && allowedRoles === user.role && (
                <div id="material-div" className="mb-4">
                    {/* Display the form for authorized users */}
                    <h2>Add material master</h2>
                    <form id="login-form" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="id-input"
                                        name="material_description"
                                        placeholder=""
                                        value={formData.material_description}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Material Description</label>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-floating">
                                    <select
                                        className="form-select"
                                        id="buom-select"
                                        name="buom"
                                        value={formData.buom}
                                        onChange={handleInputChange}
                                    >
                                        <option value=""></option>
                                        <option value="KG">KG</option>
                                        <option value="L">L</option>
                                        <option value="NO">NO</option>
                                    </select>
                                    <label htmlFor="buom-select">BUOM</label>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        step="0.01"
                                        id="id-input"
                                        name="price"
                                        placeholder=""
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Price</label>
                                </div>
                            </div>


                            <div className="col-md-2 d-flex justify-content-end">
                                <button
                                    id="Submit-button"
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Create master data
                                </button>

                            </div>
                            {/* Add more columns for other form fields */}
                        </div>

                    </form>
                </div >
            )
            }
            <h2>Material Table</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Material ID</th>
                        <th>Material Description</th>
                        <th>buom</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {masterData.map((materialData) => (
                        <tr key={materialData.id}>
                            <td>{materialData.id}</td>
                            <td>{materialData.material_description}</td>
                            <td>{materialData.BUOM}</td>
                            <td>{materialData.price}</td>
                            <td>
                                <Link to={`/materialmaster/${materialData.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default MaterialMaster;
