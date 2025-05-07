import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getEmployee } from './LeaveRequestManager';
import AdjustLeaveBalanceForm from './AddBalances';
import { FaSync } from 'react-icons/fa';


const Employees = (props) => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatarUrl: '',
        department: '',
        role: 'STAFF',
        password: '',
    });
    const [editId, setEditId] = useState(null);

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


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [response, setResponse] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse(false);

        const url = editId
            ? `${process.env.Auth_URL}/employees/${editId}`
            : `${process.env.Auth_URL}/register`;

        const method = editId ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        setResponse(true);


    };

    const handleEdit = (emp) => {
        setFormData(emp);
        setEditId(emp.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${process.env.Auth_URL}/employees/${id}`, { method: 'DELETE' }).catch((err) => console.log(err));
        fetchEmployees();
    };

    const [balances, setBalances] = useState([]);
    const [errorBalance, setErrorBalance] = useState(null);

    const fetchBalances = async (id) => {
        setErrorBalance(null);
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/balance/${id}`); // Update this to match your route prefix
            if (!res.ok) throw new Error("Failed to fetch balances");

            const data = await res.json();
            setBalances(data);
        } catch (err) {
            setErrorBalance(err.message);
            setBalances([]);
        }
    };

    const [balanceEmp, setBalanceEmp] = useState('');
    const [openBalanceModal, setOpenBalanceModal] = useState(false);

    const handleOpenBalance = (emp) => {
        setBalanceEmp(emp.id);
        setOpenBalanceModal(true);
        fetchBalances(emp.id)
    }

    const [section, setSection] = useState('view');
    const [message, setMessage] = useState('')

    const accrueLeave = async () => {
        setMessage("")
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/balance/accrue`, { 
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
                }
                
            });
            const data = await res.json();
            setMessage(data.message);
        } catch(error) {
            console.log(error);
            setMessage("Accrual failed.");
        }
    };







    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 mx-auto bg-white rounded shadow relative">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                <input type='text' name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" required />
                <input type='email' name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" required />
                <input type='text' name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="Avatar URL" className="p-2 border rounded" required />
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                >
                    <option value="">Select Department</option>
                    <option value="Finance">Finance</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                </select>
                <select name="role" value={formData.role} onChange={handleChange} className="p-2 border rounded" required>
                    <option value="STAFF">Staff</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button className="col-span-2 bg-secondary text-white p-2 rounded w-full lg:w-1/5 ">
                    {editId ? 'Update' : 'Create'} Employee
                </button>
            </form>

            {response && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                    <h3 className="font-semibold">Success! Email has been sent to your inbox/spam folder</h3>
                </div>
            )}

            <div className='flex justify-between items-center'>
                <div className="mb-4 text-sm text-gray-700">{message && message}</div>

                <button onClick={accrueLeave} className="flex items-center gap-2 bg-transparent text-primary hover:underline px-4 py-2 rounded">
                    <FaSync />Accrue All
                </button>
            </div>

            <table className="w-full table-auto text-left text-darkGray">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Department</th><th>Role</th><th>Actions</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
                            <td className='capitalize'>{emp.role}</td>
                            {emp.id === props?.exclude?.loggedInUser ?
                                <td>
                                </td>
                                :
                                <td>
                                    <button onClick={() => handleEdit(emp)} className="text-primary mr-2">Edit</button>
                                    <button onClick={() => handleDelete(emp.id)} className="text-error">Delete</button>
                                </td>

                            }

                            <td>
                                <button onClick={() => handleOpenBalance(emp)} className="bg-secondary text-white p-1 rounded-lg "> view Balance</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {openBalanceModal &&

                <div className="bg-white w-full p-20 absolute top-0 min-h-full flex items-center justify-center bg-opacity-80">
                    <div className='bg-lightGray rounded-lg shadow-lg lg:w-3/5 w-4/5 p-6'>
                        {section === 'view' &&
                            <div>
                                <div className="flex items-center gap-4">
                                    <UserCircle size={20} className="w-6 h-6 text-darkGray" />
                                    <div className='w-full grid grid-cols-1 mb-4'>
                                        <span className="text-sm text-darkGray font-semibold">{getEmployee(balanceEmp, employees)?.name}</span>
                                        <span className="text-xs text-darkGray">{getEmployee(balanceEmp, employees)?.email}</span>
                                    </div>
                                </div>

                                <span className='text-darkGray text-sm'>Leaves Balances</span>

                                <div className=' bg-white p-2 rounded-lg mb-3'>
                                    {balances.length <= 0 ?
                                        <p>No records found!</p>
                                        :
                                        balances.map((item) => (
                                            <p key={item._id} className="text-darkGray"><span className='font-semibold text-primary'>{item?.leaveType?.name}:</span>{item.balance}</p>
                                        ))
                                    }
                                </div>

                                <div className='flex gap-4'>
                                    <button onClick={() => setSection('add')} className="bg-secondary text-white p-1 rounded-lg w-full"> Add new balance</button>
                                    <button onClick={() => setOpenBalanceModal(false)} className=" border-2 border-secondary text-secondary p-1 rounded-lg w-full"> Cancel</button>
                                </div>
                            </div>
                        }


                        {section === 'add' &&
                            <AdjustLeaveBalanceForm getBalances={fetchBalances} close={setSection} emp={balanceEmp} />
                        }
                    </div>

                </div>
            }
        </motion.div>
    );
};

export default Employees;
