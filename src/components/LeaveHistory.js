import React, { useEffect, useState } from "react";
import { History } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LeaveHistory(props) {
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
          setLeaves(data);
        } catch (err) {
          setError('Failed to fetch leave requests');
        }
      };

      getLeaves();
  
    }, 500);
  }, []);

  const filterLeaves=leaves.filter(item=>item.employee === props?.userData?.loggedInUser);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
        <History /> Leave History
      </h2>
      <ul className="mt-4 space-y-2 text-sm text-gray-700 list-none">
        {filterLeaves?.length <=0?<p>No data found</p>
        :
        filterLeaves?.map((item)=>(
          <li className="capitalize" key={item._id}>{item.status === 'PENDING'?<span>🕓</span> :item.status === 'APPROVED'?<span>✔️</span>:<span>❌</span>} {item?.leaveType?.name}: {item?.leaveType?.maximumDays} day(s) — {item?.status.toLowerCase()}</li>

        ))
        }
      </ul>
      <div className="mt-4 flex justify-end">
        <Link to={'/dashboard/leave-history'} className="text-sm text-primary font-semibold text-lg hover:text-secondary transition">View All</Link>
      </div>
    </motion.div>
  );
}

export default memo(LeaveHistory);