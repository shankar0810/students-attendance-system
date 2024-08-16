import React, { useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/students";

function Dashboard({ students, setStudents }) {
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [setStudents]);

  const handleCheckin = async (rollNumber) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNumber === rollNumber) {
        return {
          ...student,
          checkinTime: new Date().toLocaleTimeString(),
          checkinDate: new Date().toLocaleDateString(),
        };
      }
      return student;
    });

    try {
      const studentToUpdate = updatedStudents.find(
        (student) => student.rollNumber === rollNumber
      );
      await axios.put(`${API_URL}/${studentToUpdate.id}`, studentToUpdate);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error updating checkin time:", error);
    }
  };

  const handleCheckout = async (rollNumber) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNumber === rollNumber) {
        return {
          ...student,
          checkoutTime: new Date().toLocaleTimeString(),
          checkoutDate: new Date().toLocaleDateString(),
        };
      }
      return student;
    });

    try {
      const studentToUpdate = updatedStudents.find(
        (student) => student.rollNumber === rollNumber
      );
      await axios.put(`${API_URL}/${studentToUpdate.id}`, studentToUpdate);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error updating checkout time:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Roll Number</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Email</th>
            <th className="border border-gray-200 px-4 py-2">Phone Number</th>
            <th className="border border-gray-200 px-4 py-2">Check-in Time</th>
            <th className="border border-gray-200 px-4 py-2">Check-in Date</th>
            <th className="border border-gray-200 px-4 py-2">Check-out Time</th>
            <th className="border border-gray-200 px-4 py-2">Check-out Date</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td className="border border-gray-200 px-4 py-2">
                {student.rollNumber}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {student.name}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {student.email}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {student.phoneNumber}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {student.checkinTime || "Not checked in"}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {student.checkinDate || "N/A"}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {student.checkoutTime || "Not checked out"}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {student.checkoutDate || "N/A"}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {!student.checkinTime ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleCheckin(student.rollNumber)}
                  >
                    Check In
                  </button>
                ) : !student.checkoutTime ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleCheckout(student.rollNumber)}
                  >
                    Check Out
                  </button>
                ) : (
                  "Checked out"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
