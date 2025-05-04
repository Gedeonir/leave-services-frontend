import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";


export const getEmployee = (id, employees) => {
  const filteredEmployee = employees?.find(emp => emp.id === id);
  return filteredEmployee;
}

const LeaveRequestManager = (props) => {
  const [leaves, setLeaves] = useState([]);
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


  const fetchLeaves = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/leaves/request/all`);
    const data = await res.json();
    setLeaves(data);
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);




  const [open, setOpen] = useState(false);
  const [leaveId, setLeaveId] = useState('');
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');


  const [openComments, setOpenComments] = useState(false);


  const updateStatus = async (id, status) => {
    setOpen(true);
    setLeaveId(id);
    setStatus(status)
  };

  const [commentStatus, setCommentStatus] = useState('');
  const [approver, setApprover] = useState('');
  const [viewComment, setViewComment] = useState();

  const openComment = async (status, approver, comment) => {
    setOpenComments(true);
    setCommentStatus(status);
    setApprover(approver);
    setViewComment(comment);
  }

  const handleUpdateStatus = async (id, status) => {
    await fetch(`${process.env.BACKEND_URL}/leaves/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, approverId: props?.approver?.loggedInUser, comments: comment }), // adjust this
    });

    fetchLeaves();
    setOpen(false);
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="py-6 relative"
    >
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>

      {/* Table */}
      <table className="w-full border-collapse bg-white rounded shadow text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Employee</th>
            <th className="p-2">Employee email</th>
            <th className="p-2">Leave Type</th>
            <th className="p-2">Dates</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-t">
              <td className="p-2">{getEmployee(leave.employee, employees).name}</td>
              <td className="p-2">{getEmployee(leave.employee, employees).email}</td>
              <td className="p-2">{leave.leaveType?.name}</td>
              <td className="p-2">{leave.startDate?.slice(0, 10)} → {leave.endDate?.slice(0, 10)}</td>
              <td className="p-2">{leave.status}</td>
              <td className="p-2 space-x-2">
                {leave.status === "PENDING" ? (
                  <>
                    <button onClick={() => updateStatus(leave._id, "APPROVED")} className="text-green-600 hover:underline">Approve</button>
                    <button onClick={() => updateStatus(leave._id, "REJECTED")} className="text-red-600 hover:underline">Reject</button>
                  </>
                ) : (
                  <button onClick={() => openComment(leave.status, leave.approver, leave.comments)} className="text-primary hover:underline flex justify-center items-center gap-2"><MessageCircle size={15} /> Comment</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open &&
        <div className="bg-white w-full p-20 absolute top-0 min-h-full flex items-center justify-center bg-opacity-80">
          <form onSubmit={(e) => e.preventDefault()} className="sm:w-full lg:w-2/4 bg-white rounded-lg shadow-lg p-6">
            <label className="text-darkGray font-semibold text-md mb-3">Add comment <span className="text-error">*</span></label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required className="w-full px-4 py-2 border-2 border-gray-300 rounded-md text-sm text-primary focus:ring-2 focus:ring-primary outline-none" placeholder="Add comment"></textarea>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleUpdateStatus(leaveId, status)} className={`text-white hover:underline ${status === 'APPROVED' ? 'bg-success' : 'bg-error'}  rounded-lg shadow-lg p-2 w-full`}>{status === 'APPROVED' ? 'Approve' : 'Reject'}</button>
              <button onClick={() => setOpen(false)} className="text-secondary hover:underline border-2 border-secondary rounded-lg shadow-lg p-2 w-full">Cancel</button>
            </div>
          </form>
        </div>
      }

      {openComments &&
        <div onClick={() => setOpenComments(false)} className="bg-white w-full p-20 absolute top-0 min-h-full flex items-center justify-center bg-opacity-80">
          <div className="sm:w-full lg:w-2/4 bg-white rounded-lg shadow-lg p-6">
            <label className="text-darkGray font-semibold text-sm mb-3">{approver === props?.approver?.loggedInUser ? 'You' : getEmployee(approver, employees)?.name} {commentStatus.toLowerCase()} this leave request with remarks</label>
            <div className="bg-lightGray rounded-r-xl rounded-bl-xl text-primary p-2 mt-2">
              <p className="text-sm italic">{viewComment ? viewComment : 'No comment'}</p>
            </div>
          </div>
        </div>
      }
    </motion.div>
  );
};

export default LeaveRequestManager;
