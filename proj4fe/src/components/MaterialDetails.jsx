import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from './auth/AuthProvider';
import { Link } from "react-router-dom";

function MaterialDetails() {
    const { id } = useParams();
    const [materialData, setMaterialData] = useState(null);
    const { user, isAuthenticated } = useAuth();
    const allowedRoles = "mm";
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/materialmaster/${id}`)
            .then(response => {
                setMaterialData(response.data);
            })
            .catch(error => {
                console.error("Error fetching material details:", error);
            });
    }, [id]);

    if (!materialData) {
        return (
            <div className="d-flex flex-column align-items-center">
                <div>Loading material details...</div>
                <Link to="/materialmaster" className="btn btn-primary mt-3">
                    Back to Material Master
                </Link>
            </div>);
    }

    const handleDeleteMaterial = async () => {
        const token = localStorage.getItem('token');
        console.log(token);
        try {
            await axios.delete(`http://localhost:8000/api/v1/materialmaster/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // After successful deletion, you can navigate to a different page or update the UI as needed.
            // For example, using a router like React Router:
            navigate("/materialmaster");
        } catch (error) {
            console.error("Error deleting material:", error);
        }
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div>
            <h2>Material Details</h2>
            <p>ID: {materialData.id}</p>
            <p>Description: {materialData.material_description}</p>
            <p>BUOM: {materialData.BUOM}</p>
            <p>Price per unit: {materialData.price}</p>

            {materialData.inventories.length > 0 && (
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Batch Number</th>
                                <th>Expiry Date</th>
                                <th>Quantity Unrestricted</th>
                                <th>Total Cost Unrestricted</th>
                                <th>Quantity Blocked</th>
                                <th>Total Cost Blocked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materialData.inventories.map((inventory, index) => (
                                <tr key={index}>
                                    <td>{inventory.batch_number}</td>
                                    <td>{formatDate(inventory.expiry_date)}</td>
                                    <td>{inventory.quantity_unrestricted}</td>
                                    <td>{inventory.total_cost_unrestricted}</td>
                                    <td>{inventory.quantity_blocked}</td>
                                    <td>{inventory.total_cost_blocked}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {isAuthenticated() && allowedRoles.includes(user.role) && (
                <button className="btn btn-danger mt-3" onClick={handleDeleteMaterial}>
                    Delete Material Data
                </button>
            )}


            <Link to="/materialmaster" className="btn btn-primary mt-3">
                Back to Material Master
            </Link>
        </div>
    );
}

export default MaterialDetails;
