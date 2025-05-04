import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AdjustLeaveBalanceForm = (props) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveTypeId: '',
    amount: ''
  });


  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/balance/adjust`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employeeId: formData.employeeId,
          leaveTypeId: formData.leaveTypeId,
          amount: parseFloat(formData.amount)
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await res.json();
      setResponse(data);
      props.getBalances();
    } catch (err) {
      setError(err.message);
    }
  };


  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/leaves/leaveTypes`)
      .then(res => setLeaveTypes(res.data))
      .catch(console.error);
  }, []);

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
    fetchEmployees();
  }, [employees]);

  const filteredEmployee=employees.filter((item)=>item.id === props?.emp);
  



  return (
    <div className="mx-auto">
      <div className='flex justify-start gap-2 items-center mb-4'>
        <div className='bg-transparent' onClick={() => props.close('view')}>
          <FaArrowLeft className="text-sm" />
        </div>
        <div className=''>
          <h2 className="text-sm font-bold">Adjust Leave Balance</h2>
        </div>

      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee ID Input */}
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee
          </label>
          <select name="employeeId" onChange={handleChange} className="border p-2 rounded w-full" required>
            <option value="">Select an employee</option>
            {filteredEmployee.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        {/* Leave Type ID Input */}
        <div>
          <label htmlFor="leaveTypeId" className="block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select name="leaveTypeId" onChange={handleChange} className="border p-2 rounded w-full" required>
            <option value="">Select a type</option>
            {leaveTypes.map(type => (
              <option key={type._id} value={type._id}>{type.name}</option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700" required>
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Response Message */}
      {response && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          <h3 className="font-semibold">Success!</h3>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <h3 className="font-semibold">Error:</h3>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default AdjustLeaveBalanceForm;
