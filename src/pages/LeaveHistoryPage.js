import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaBackward, FaArrowLeft } from "react-icons/fa";
import Topbar from "../components/TopBar";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getEmployee } from "./LeaveRequestManager";

const statusIcons = {
  APPROVED: <FaCheckCircle className="text-green-500" />,
  REJECTED: <FaTimesCircle className="text-red-500" />,
  PENDING: <FaClock className="text-yellow-500" />,
};

export default function LeaveHistoryPage() {
  const [leaveHistory, setLeaveHistory] = useState([]);

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaveRequests = async () => {
    const response = await axios.get(`${process.env.BACKEND_URL}/leaves/request/all`);
    return response.data;
  };

  useEffect(() => {
    setTimeout(() => {
      const getLeaves = async () => {
        try {
          const data = await fetchLeaveRequests();
          setLeaveHistory(data);
        } catch (err) {
          console.log(err)
          setError('Failed to fetch leave requests');
        }
      };

      getLeaves();

    }, 500);
  }, []);
  const [userData, setUserData] = useState([]);


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

  useEffect(() => {
    verifyUser();
    fetchEmployees()
  }, [])




  return (
    <div className="bg-lightGray min-h-screen px-4 md:px-8 py-6">
      <Topbar title={"Employee Dashboard"}/>
      <div className="flex justify-start gap-4 items-center py-6">
        <div>
          <Link to={'/dashboard'}><FaArrowLeft className="text-primary text-sm" /></Link>
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">Leave History</h2>
        </div>
      </div>

      <div className="space-y-4">
        {leaveHistory.map((leave) => (
          <div
            key={leave._id}
            className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-3xl">{statusIcons[leave.status]}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{leave?.leaveType?.name}</h3>
                <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
                  {leave.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <FaCalendarAlt className="text-gray-400" />
                {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 mt-2 italic">"{leave.reason}"</p>
              {leave?.status !== 'PENDING' &&
                <>
                  <hr></hr>
                  <label className="text-gray-700 italic text-sm mb-3">{leave?.approver === userData?.loggedInUser ? 'You' : getEmployee(leave?.approver, employees)?.name} {leave.status.toLowerCase()} this leave request with remarks: <br /> {leave?.comments}</label>
                </>
              }
            </div>
          </div>
        ))}

        {leaveHistory.length === 0 && (
          <p className="text-center text-gray-500 mt-8 animate-pulse">Loading leave history...</p>
        )}
      </div>
    </div>
  );
}
