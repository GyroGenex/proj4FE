import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from './auth/AuthProvider';
import { Link } from "react-router-dom";

function Inventory() {
    const { user, isAuthenticated } = useAuth();
    const [inventoryData, setinventoryData] = useState([]);

    const token = localStorage.getItem('token');

    // Define the user roles that are allowed to access the form
    const allowedRoles = "ic"; // Adjust based on your roles

    // Check if the user's role is allowed to access the form

    const [formData, setFormData] = useState({
        material_Id: '',
        expiry_date: "",
        quantity_unrestricted: "",
        quantity_blocked: "",
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

        console.log(token);

        try {
            const response = await axios.post(
                'https://ytproj4be.onrender.com/api/v1/inventory/',
                {
                    materialId: parseInt(formData.material_Id),
                    expiryDate: formData.expiry_date,
                    qtyUnrestricted: formData.quantity_unrestricted,
                    qtyBlocked: formData.quantity_blocked,
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



        // Fetch updated user data to refresh the user table;
        axios.get("https://ytproj4be.onrender.com/api/v1/inventory/")
            .then(response => {
                setinventoryData(response.data);
            })
            .catch(error => {
                console.error("Error fetching material data:", error);
            });
    };




    // Table data containing user information (example)
    useEffect(() => {
        axios.get("https://ytproj4be.onrender.com/api/v1/inventory/")
            .then(response => {
                setinventoryData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const blockInventory = async (inventory) => {
        console.log(token);
        console.log(inventory);
        try {
            const response = await axios.patch(
                'https://ytproj4be.onrender.com/api/v1/inventory/block',
                {
                    data: {
                        materialId: parseInt(inventory.material_Id),
                        batchNumber: inventory.batch_number,
                    }
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },


            );

            // Handle the response here (e.g., show a success message)
        } catch (error) {
            console.error('Block error:', error);
            // Handle the error here (e.g., display an error message to the user)
        }
        axios.get("https://ytproj4be.onrender.com/api/v1/inventory/")
            .then(response => {
                setinventoryData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    };

    const unblockInventory = async (inventory) => {
        console.log(token);
        console.log(inventory);
        try {
            const response = await axios.patch(
                'http://localhost:8000/api/v1/inventory/unblock', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

                data: {
                    materialId: inventory.material_Id,
                    batchNumber: parseInt(inventory.batch_number),
                },
            }
            );

            // Handle the response here (e.g., show a success message)
        } catch (error) {
            console.error('Unblock error:', error);
            // Handle the error here (e.g., display an error message to the user)
        }
        axios.get("http://localhost:8000/api/v1/inventory/")
            .then(response => {
                setinventoryData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    };

    const deleteInventory = async (inventory) => {
        console.log(token);
        console.log(inventory);
        try {
            const response = await axios.delete(
                'http://localhost:8000/api/v1/inventory/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

                data: {
                    materialId: inventory.material_Id,
                    batchNumber: parseInt(inventory.batch_number),
                },
            }
            );

            // Handle the response here (e.g., show a success message)
        } catch (error) {
            console.error('Deletion error:', error);
            // Handle the error here (e.g., display an error message to the user)
        }
        axios.get("http://localhost:8000/api/v1/inventory/")
            .then(response => {
                setinventoryData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    };

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
                                        name="material_Id"
                                        placeholder=""
                                        value={formData.material_Id}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Material ID</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="id-input"
                                        name="expiry_date"
                                        placeholder=""
                                        value={formData.expiry_date}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Expiry Date</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        step="0.001"
                                        id="id-input"
                                        name="quantity_unrestricted"
                                        placeholder=""
                                        value={formData.quantity_unrestricted}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Quantity Unrestricted</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        step="0.001"
                                        id="id-input"
                                        name="quantity_blocked"
                                        placeholder=""
                                        value={formData.quantity_blocked}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="id-input">Quantity Blocked</label>
                                </div>
                            </div>


                            <div className="col-md-2 d-flex justify-content-end">
                                <button
                                    id="Submit-button"
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Create inventory
                                </button>

                            </div>
                            {/* Add more columns for other form fields */}
                        </div>

                    </form>
                </div >
            )
            }

            <div>
                <h2>Inventory Table</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Material ID</th>
                            <th>Batch Number</th>
                            <th>Expiry Date</th>
                            <th>Quantity Unrestricted</th>
                            <th>Quantity Blocked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.map((inventory, index) => (
                            <tr key={index}>
                                <td>{inventory.material_Id}</td>
                                <td>{inventory.batch_number}</td>
                                <td>{formatDate(inventory.expiry_date)}</td> {/* Format the expiry date as needed */}
                                <td>{inventory.quantity_unrestricted}</td>
                                <td>{inventory.quantity_blocked}</td>
                                {isAuthenticated() && allowedRoles === user.role && (
                                    <td>
                                        <button className="btn btn-primary" onClick={() => blockInventory(inventory)}>Block</button>
                                        <button className="btn btn-success" onClick={() => unblockInventory(inventory)}>Unblock</button>
                                        <button className="btn btn-danger" onClick={() => deleteInventory(inventory)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Inventory;
