import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEmployee } from "./LeaveRequestManager";

export default function TeamLeaveCalendar() {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [departments, setDepartments] = useState([
    "Finance",
    "Human Resources",
    "Engineering",
    "Marketing",
    "Sales"
  ]);
  const [selectedDept, setSelectedDept] = useState("All");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/leaves/request/all`);
        const data = await res.json();


        // Extract unique departments
        setLeaves(data);
        setFilteredLeaves(data);
      } catch (err) {
        console.error("Failed to fetch leave requests", err);
      }
    };

    fetchLeaves();
  }, [selectedDept]);

  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${process.env.Auth_URL}/employees`,
        {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
          }
        }
      );
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const filterLeaves = () => {
      if (selectedDept === "All") {
        setFilteredLeaves(
          leaves.filter(
            (req) =>
              getEmployee(req.employee, employees) &&
              req.status === "APPROVED" &&
              new Date(req.endDate) >= new Date()
          )
        );
      } else {
        setFilteredLeaves(
          leaves.filter(
            (req) =>
              getEmployee(req.employee, employees)?.department === selectedDept &&
              req.status === "APPROVED" &&
              new Date(req.endDate) >= new Date()
          )
        );
      }
    };

    fetchEmployees().then(() => {
      filterLeaves();
    });
  }, [selectedDept, leaves]);


  console.log(filteredLeaves);





  return (
    <div className="w-full mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-darkGray ">Team Leave Calendar</h1>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Department:</label>
        <select
          className="border rounded p-2"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="All">All</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Leave List */}
      <div className="grid gap-4">
        {filteredLeaves.length <= 0 && <p>No record found</p>}
        {filteredLeaves.map((leave) => (
          getEmployee(leave.employee, employees) &&
          <div
            key={leave._id}
            className="p-4 bg-white rounded-xl shadow border flex items-center"
          >
            <img
              src={getEmployee(leave.employee, employees).avatarUrl || "/default-avatar.png"}
              alt={getEmployee(leave.employee, employees).name || "Unknown"}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg text-darkGray">
                {getEmployee(leave.employee, employees)?.name || "Unknown"}
              </h2>
              <p className="text-sm text-gray-600">
                Department: {getEmployee(leave.employee, employees)?.department || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Leave Type: {leave.leaveType?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(leave.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} — To:{" "}
                {new Date(leave.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Google Calendar sync placeholder */}
      <div className="mt-6 text-sm text-blue-500 underline cursor-pointer">
        <span>Sync with Google Calendar (Coming soon)</span>
      </div>
    </div>
  );
}
