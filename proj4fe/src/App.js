import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationToolbar from './components/NavigationToolbar';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import MaterialMaster from './components/MaterialMaster';
import MaterialDetails from './components/MaterialDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inventory from './components/Inventory';



function App() {
  return (
    <div className="App">
      < NavigationToolbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/materialmaster" element={<MaterialMaster />} />
        <Route path="/materialmaster/:id" element={<MaterialDetails />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </div>
  );
}

export default App;
