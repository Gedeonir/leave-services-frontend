import React, { useEffect, useState } from "react";
import { FilePlus } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import axios from "axios";

function ApplyForLeaveForm() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
    file: null,
    maximumDays:0
  });

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    // Fetch leave types
    axios.get(`${process.env.BACKEND_URL}/leaves/leaveTypes`)
      .then(res => setLeaveTypes(res.data))
      .catch(console.error);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "leaveType") {
      const selectedType = leaveTypes.find(type => type._id === value);
      if (selectedType) {
        setFormData(prev => ({
          ...prev,
          leaveType: value,
          maximumDays: selectedType.maximumDays,
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let documentUrl = "";

    // 1. Upload file if present
    if (formData.file) {
      const uploadData = new FormData();
      uploadData.append("file", formData.file);
      const uploadRes = await axios.post("http://localhost:8080/api/upload", uploadData);
      documentUrl = uploadRes.data.url;
    }

    // 2. Submit leave request
    const payload = {
      employee: sessionStorage.getItem("userId"),
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      documentUrl,
    };

    await axios.post(`${process.env.BACKEND_URL}/leaves/request/new`, payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    alert("Leave request submitted.");
  };

  function formatDate(date) {
    return new Date(date).toISOString().split("T")[0];
  }
  
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow mt-5"
    >
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
        <FilePlus /> Apply for Leave
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Leave Type</label>
          <select name="leaveType" onChange={handleChange} className="border p-2 rounded w-full" required>
            <option value="">Select a type</option>
            {leaveTypes.map(type => (
              <option key={type._id} value={type._id}>{type.name}- {type.maximumDays} Days</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <input type="date" min={new Date().toISOString().split("T")[0]} name="startDate" onChange={handleChange} className="border p-2 rounded w-full" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input type="date" 
          min={formData.startDate?new Date(formData.startDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]} 
          max={
            formData.startDate
              ? formatDate(addDays(new Date(formData.startDate), formData.maximumDays))
              : formatDate(addDays(new Date(), formData.maximumDays))
          }
          name="endDate" onChange={handleChange} className="border p-2 rounded w-full" required />
          
            <p className="text-red-500 text-sm mt-1">{dateError && dateError}</p>
        </div>
        

        <input
          type="text"
          name="reason"
          onChange={handleChange}
          placeholder="Reason"
          className="col-span-2 border p-2 rounded"
        />

        <div className="mt-4">
          <input type="file" name="file" onChange={handleChange} className="block w-full text-sm text-gray-700" />
          <p className="text-xs text-gray-500 mt-1">Upload medical certificate or other required files (PDF, JPG, PNG).</p>
        </div>

        <button className="col-span-2 bg-secondary text-white font-semibold py-2 rounded hover:bg-primary">
          Submit
        </button>
      </form>
    </motion.div>
  );
}

export default memo(ApplyForLeaveForm);