import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import Login from "../Pages/Login.jsx"
import Signup from "../Pages/Signup.jsx"
import Home from "../Pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login /> } />
        {/* <Route path='/catalog' element={<Catalog />} /> */}
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;