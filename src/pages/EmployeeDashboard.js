import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
const Topbar = lazy(() => import("../components/TopBar"));
const LeaveBalanceCard = lazy(() => import("../components/LeaveBalanceCard"));
const ApplyForLeaveForm = lazy(() => import("../components/ApplyForLeaveForm"));
const LeaveHistory = lazy(() => import("../components/LeaveHistory"));
const UploadDocument = lazy(() => import("../components/UploadDocument"));
const ColleaguesOnLeave = lazy(() => import("../components/ColleguesOnLeave"));
const HolidayCalendar = lazy(() => import("../components/HolidayCalendar"));
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function EmployeeDashboard(props) {
  const colleagues = [
    { name: "Amina Yusuf", until: "May 5", img: "https://res.cloudinary.com/gedeoncloud/image/upload/v1741614594/ecomerce/image_4_d3n1j3.png" },
    { name: "Daniel Mwangi", until: "May 4", img: "https://res.cloudinary.com/gedeoncloud/image/upload/v1741614593/ecomerce/image_2_tnu1hi.png" },
  ];

  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [succes, setSuccess] = useState(false)
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    const res = await fetch(`${process.env.Auth_URL}/employees`,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
        }
      }
    );
    const data = await res.json();
    setEmployees(data);
  };

  const verifyUser = async () => {
    try {
      const getProfile = await axios.get(`${process.env.BACKEND_URL}/employees/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
          }
        });
      const { data } = getProfile;
      setUserData(data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verifyUser();
    fetchEmployees();

  }, [])

  useEffect(() => {
    if (employees.length && userData.loggedInUser) {
      const filteredEmployee = employees.find(emp => emp.id === userData.loggedInUser);

      if (filteredEmployee) {
        if (filteredEmployee.role !== "STAFF") {
          // 🚫 Not allowed — redirect or return
          console.log("Unauthorized role:", filteredEmployee.role);
          navigate("/signin"); // or any other page
        }
      }
    }
  }, [employees, userData.loggedInUser]);








  return (
    <div className="bg-gray-50 min-h-screen px-6 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Topbar title={"Employee Dashboard"} employees={employees} userData={userData}/>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <LeaveBalanceCard userData={userData}/>
            <ApplyForLeaveForm />
            <ColleaguesOnLeave colleagues={colleagues} />
          </div>
          <div className="col-span-1">
            <LeaveHistory userData={userData} />
            <HolidayCalendar />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
