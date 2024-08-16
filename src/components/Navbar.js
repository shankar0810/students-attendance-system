import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-orange-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-xl font-bold">
          <img src= "/ust-logo.png" alt="" className="h-8 inline-block mr-6" />
          UST Attendance System
        </Link>
        <div>
          <Link to="/" className="text-black mr-4 hover:underline">
            Dashboard
          </Link>
          <Link to="/add-student" className="text-black hover:underline">
            Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
