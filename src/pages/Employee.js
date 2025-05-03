import React, { useEffect, useState } from 'react';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editId
            ? `${process.env.Auth_URL}/employees/${editId}`
            : `${process.env.Auth_URL}/register`;

        const method = editId ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });


    };

    const handleEdit = (emp) => {
        setFormData(emp);
        setEditId(emp.id);
    };

    const handleDelete = async (id) => {
        console.log(id);
        await fetch(`${process.env.Auth_URL}/employees/${id}`, { method: 'DELETE' }).catch((err) => console.log(err));
        fetchEmployees();
    };
    

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white rounded shadow">
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
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="p-2 border rounded" />
                <button className="col-span-2 bg-blue-500 text-white p-2 rounded">
                    {editId ? 'Update' : 'Create'} Employee
                </button>
            </form>

            <table className="w-full table-auto text-left text-darkGray">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Department</th><th>Role</th><th>Actions</th>
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
                                    <button onClick={() => handleEdit(emp)} className="text-blue-600 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(emp.id)} className="text-red-600">Delete</button>
                                </td>
                            
                            }
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
