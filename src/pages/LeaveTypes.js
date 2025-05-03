import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveName, setLeaveName] = useState('');
  const [max, setMax] = useState(0);
  const [editId, setEditId] = useState(null);

  const fetchLeaveTypes = useCallback(async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/leaves/leaveTypes`);
    const data = await res.json();
    setLeaveTypes(data);
  }, []);

  useEffect(() => {
    fetchLeaveTypes();
  }, [fetchLeaveTypes]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!leaveName.trim()) return;

    if (editId) {

      await fetch(`${process.env.BACKEND_URL}/leaves/leaveTypes/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leaveName, maximumDays: max }),
      });
      setEditId(null);
    } else {
      await fetch(`${process.env.BACKEND_URL}/leaves/addLeaveType`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leaveName, maximumDays: max }),
      }).catch((err) => console.log(err));
    }

    setLeaveName('');
    setMax(0);
    fetchLeaveTypes();
  }, [leaveName,max, editId, fetchLeaveTypes]);

  const handleEdit = (item) => {
    setLeaveName(item.name);
    setMax(item.maximumDays);
    setEditId(item._id);
  };
  

  const handleDelete = async (id) => {
    await fetch(`${process.env.BACKEND_URL}/leaves/leaveTypes/${id}`, {
      method: 'DELETE',
    });
    fetchLeaveTypes();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow mt-5"
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Leave type"
          className="col-span-2 border p-2 rounded"
          value={leaveName}
          onChange={(e) => setLeaveName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Maximum days"
          className="col-span-2 border p-2 rounded"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <button className="col-span-2 bg-secondary text-white font-semibold py-2 rounded hover:bg-primary">
          {editId ? 'Update' : 'Add'} Leave Type
        </button>
      </form>

      <ul className="divide-y">
        {leaveTypes.map((item) => (
          <li key={item._id} className="flex justify-between items-center py-2">
            <span>{item.name}-({item.maximumDays} Days Maximum)</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default LeaveTypes;
