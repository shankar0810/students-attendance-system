import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [students, setStudents] = useState([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard students={students} setStudents={setStudents} />} />
        <Route path="/add-student" element={<AddStudent setStudents={setStudents} />} />
      </Routes>
    </>
  );
}

export default App;
