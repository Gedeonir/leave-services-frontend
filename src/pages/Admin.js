import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import { lazy, Suspense } from "react";
import { Link } from 'lucide-react';
import LeaveTypes from './LeaveTypes';
import Employee from './Employee';
import LeaveRequestManager from './LeaveRequestManager';
import axios from 'axios';


function DashboardLayout({ children }) {
  const navigate=useNavigate()
  const location = useLocation();
  const [section, setSection] = useState(() => {
    return localStorage.getItem('activeSection') || 'home';
  });
  const [userData, setUserData] = useState([]);


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
    localStorage.setItem('activeSection', section);
    fetchEmployees()
    verifyUser()
  }, [section]);

  useEffect(() => {
    if (employees.length && userData.loggedInUser) {
      const filteredEmployee = employees?.find(emp => emp.id === userData.loggedInUser);

      if (filteredEmployee) {
        if (filteredEmployee.role === "STAFF") {
          // 🚫 Not allowed — redirect or return
          console.log("Unauthorized role:", filteredEmployee.role);
          navigate("/signin"); // or any other page
        }
      }
    }
  }, [employees, userData]);


  return (
    <div className="bg-gray-50 min-h-screen max-h-screen overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-5">
          <div className="col-span-1 border-r">
            <aside class="py-4 block z-40 bg-lightGray min-h-screen max-h-screen group">

              <ul class="my-4 w-full list-none items-start">
                <li onClick={() => setSection('home')} className={`cursor-pointer w-full py-1 my-2 px-2 rounded-l-full ${section === 'home' ? 'bg-primary text-white' : 'text-primary '} flex justify-start hover:text-secondary duration-200 delay-100`}>
                  <span class="py-0.5 mx-2 text-lg">Home</span>
                </li>
                <li onClick={() => setSection('leaveType')} className={`cursor-pointer w-full py-1 my-2 px-2 rounded-l-full ${section === 'leaveType' ? 'bg-primary text-white' : 'text-primary '} flex justify-start hover:text-secondary duration-200 delay-100`}>
                  <span class="py-0.5 mx-2 text-lg">Manage Leave Types</span>
                </li>

                <li onClick={() => setSection('employee')} className={`cursor-pointer w-full py-1 my-2 px-2 rounded-l-full ${section === 'employee' ? 'bg-primary text-white' : 'text-primary '} flex justify-start hover:text-secondary duration-200 delay-100`}>
                  <span class="py-0.5 mx-2 text-lg">Manage Employees</span>
                </li>
              </ul>
            </aside>

          </div>
          <div className="col-span-4 px-6 py-4 overflow-y-auto max-h-screen border">
            <TopBar title={"Admin Dashboard"}  employees={employees} userData={userData}/>

            {section === 'home' && 
            <>
              <LeaveRequestManager approver={userData}/>
            </>
            }

            {section === 'leaveType' && <LeaveTypes />}
            {section === 'employee' && <Employee exclude={userData}/>}


          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default DashboardLayout;
