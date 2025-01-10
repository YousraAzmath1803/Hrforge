// 'use client';
// import { Table, Button } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const EmployeeTable = () => {
  
//   const dataSource = [
//     {
//       key: '1',
//       name: '.Net Developer4 D',
//       empNo: '67',
//       empType: 'Permanent',
//       empGrade: 'A++',
//       department: '.Net',
//       designation: '.Net Developer',
//       email: 'sd45@gmail.com',
//     },
  
//   ];

//   const columns = [
//     {
//       title: 'Full Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Emp. No',
//       dataIndex: 'empNo',
//       key: 'empNo',
//       sorter: (a, b) => a.empNo - b.empNo,
//     },
//     {
//       title: 'Employee Type',
//       dataIndex: 'empType',
//       key: 'empType',
//     },
//     {
//       title: 'Department',
//       dataIndex: 'department',
//       key: 'department',
//     },
//     {
//       title: 'Designation',
//       dataIndex: 'designation',
//       key: 'designation',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: () => (
//         <span>
//           <Button>Edit</Button>
//           <Button danger>Delete</Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div style={{ marginBottom: '20px', textAlign: 'left' }}>
    
//         <h3>All Employees</h3>
//       </div>
//       <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />
//     </>
//   );
// };

// export default EmployeeTable;



// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Table, Button, Spin } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const EmployeeTable = () => {
//   // State to store employee data
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch employees data from the API
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/employees');
//         // Map API data to match the table structure
//         const employees = response.data.map((employee) => ({
//           key: employee.id,
//           name: employee.name,
//           empNo: employee.employeeId,
//           empType: employee.employmentType,
//           department: employee.department,
//           designation: employee.jobTitle,
//         }));
//         setDataSource(employees); // Set data source for the table
//         setLoading(false); // Stop loading once data is fetched
//       } catch (error) {
//         console.error('Error fetching employee data:', error);
//         setLoading(false); // Stop loading in case of error
//       }
//     };

//     fetchEmployees();
//   }, []); // Empty dependency array to run only on mount

//   // Table columns definition
//   const columns = [
//     {
//       title: 'Full Name',
//       dataIndex: 'name',
//       key: 'name',
//       sorter: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       title: 'Employee ID',
//       dataIndex: 'empNo',
//       key: 'empNo',
//       sorter: (a, b) => a.empNo.localeCompare(b.empNo), // Sorting by employee number
//     },
//     {
//       title: 'Employee Type',
//       dataIndex: 'empType',
//       key: 'empType',
//     },
//     {
//       title: 'Department',
//       dataIndex: 'department',
//       key: 'department',
//     },
//     {
//       title: 'Designation',
//       dataIndex: 'designation',
//       key: 'designation',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <span>
//           <Button>Edit</Button>
//           <Button danger>Delete</Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div style={{ marginBottom: '20px', textAlign: 'left' }}>
//         <h3>All Employees</h3>
//       </div>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
//       )}
//     </>
//   );
// };

// export default EmployeeTable;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
// import axios from 'axios';
// import moment from 'moment';

// const { Option } = Select;

// const EmployeeTable = () => {
//   // State to store employee data
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingEmployee, setEditingEmployee] = useState(null); // State for the employee being edited
//   const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

//   // Fetch employees data from the API
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/employees');
//         const employees = response.data.map((employee) => ({
//           key: employee.id,
//           ...employee,
//         }));
//         setDataSource(employees); 
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching employee data:', error);
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // Show the edit modal with prepopulated data
//   const showEditModal = (employee) => {
//     setEditingEmployee({
//       ...employee,
//       dateOfBirth: moment(employee.dateOfBirth),
//       dateOfJoining: moment(employee.dateOfJoining),
//     });
//     setIsModalVisible(true);
//   };

//   // Handle the form submission for editing employee details
//   const handleUpdateEmployee = async (values) => {
//     try {
//       const updatedEmployee = {
//         ...values,
//         id: editingEmployee.id,
//         dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
//         dateOfJoining: values.dateOfJoining.format('YYYY-MM-DD'),
//       };

//       await axios.put(`http://localhost:8080/api/employees/${editingEmployee.id}`, updatedEmployee);

//       message.success('Employee updated successfully!');
//       // Update the employee list with the new data
//       setDataSource((prevDataSource) =>
//         prevDataSource.map((emp) =>
//           emp.id === editingEmployee.id ? { ...emp, ...updatedEmployee } : emp
//         )
//       );
//       setIsModalVisible(false);
//       setEditingEmployee(null);
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       message.error('Failed to update employee.');
//     }
//   };

//   // Table columns definition
//   const columns = [
//     {
//       title: 'Full Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Emp. No',
//       dataIndex: 'employeeId',
//       key: 'employeeId',
//       sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
//     },
//     {
//       title: 'Employee Type',
//       dataIndex: 'employmentType',
//       key: 'employmentType',
//     },
//     {
//       title: 'Department',
//       dataIndex: 'department',
//       key: 'department',
//     },
//     {
//       title: 'Designation',
//       dataIndex: 'jobTitle',
//       key: 'jobTitle',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <span>
//           <Button onClick={() => showEditModal(record)}>Edit</Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div style={{ marginBottom: '20px', textAlign: 'left' }}>
//         <h3>All Employees</h3>
//       </div>
//       <Table dataSource={dataSource} columns={columns} loading={loading} pagination={{ pageSize: 10 }} />

//       {/* Edit Employee Modal */}
//       <Modal
//         title="Edit Employee"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         {editingEmployee && (
//           <Form
//             initialValues={editingEmployee}
//             onFinish={handleUpdateEmployee}
//             layout="vertical"
//           >
//             <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}>
//               <DatePicker format="YYYY-MM-DD" />
//             </Form.Item>
//             <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
//               <Select>
//                 <Option value="male">Male</Option>
//                 <Option value="female">Female</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="address" label="Address" rules={[{ required: true }]}>
//               <Input.TextArea />
//             </Form.Item>
//             <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="employeeId" label="Employee ID" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="jobTitle" label="Job Title" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item name="department" label="Department" rules={[{ required: true }]}>
//               <Select>
//                 <Option value="HR">HR</Option>
//                 <Option value="IT">IT</Option>
//                 <Option value="Sales">Sales</Option>
//                 <Option value="Administration">Administration</Option>
//                 <Option value="Tech Support">Tech Support</Option>
//                 <Option value="Operations">Operations</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="dateOfJoining" label="Date of Joining" rules={[{ required: true }]}>
//               <DatePicker format="YYYY-MM-DD" />
//             </Form.Item>
//             <Form.Item name="employmentType" label="Employment Type" rules={[{ required: true }]}>
//               <Select>
//                 <Option value="Full Time">Full Time</Option>
//                 <Option value="Part Time">Part Time</Option>
//                 <Option value="Contract">Contract</Option>
//                 <Option value="Freelancing">Freelancing</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="skills" label="Skills" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Update Employee
//               </Button>
//             </Form.Item>
//           </Form>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default EmployeeTable;

'use client';
import { useState, useEffect } from 'react';
import {Table, Button, Modal, Input, Select , Form, DatePicker, Row, Col, message} from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { confirm } = Modal;

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch employees from the API
  useEffect(() => {
    axios.get('http://localhost:9095/api/employees')
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error('Error fetching employees', error));
  }, []);

  // Handle the edit button click
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee); // Update the state with selected employee
    setIsModalVisible(true); // Show the modal
  };


  const handleSave = () => {
    axios.put(`http://localhost:9095/api/employees/${selectedEmployee.id}`, selectedEmployee)
      .then((response) => {
        // Update the employee in the state with the new data from response
        const updatedEmployee = response.data;
  
        // Find the index of the employee to update in the employees array
        const updatedEmployees = employees.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        );
  
        // Update the employees state with the modified array
        setEmployees(updatedEmployees);
        message.success('Employee updated successfully!');
  
        // Close the modal
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };
  
   // Handle the delete button click with confirmation
   const showDeleteConfirm = (employeeId) => {
    confirm({
      title: 'Are you sure you want to delete this employee?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDeleteClick(employeeId);
      },
      onCancel() {
        console.log('Delete canceled');
      },
    });
  };

  // Handle the delete button click
  const handleDeleteClick = (employeeId) => {
    axios.delete(`http://localhost:9095/api/employees/${employeeId}`)
      .then(() => {
        // Remove the deleted employee from the state
        setEmployees(employees.filter(employee => employee.id !== employeeId));
        message.success('Employee deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
        message.error('Failed to delete employee.');
      });
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value, name) => {
    setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
  };
  const handleDateChange = (date, dateString, field) => {
    setSelectedEmployee((prev) => ({ ...prev, [field]: dateString }));
  };
  
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Emp. No',
      dataIndex: 'employeeId',
      key: 'employeeId',
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
{
  title: 'Designation',
  dataIndex: 'jobTitle',
  key: 'jobTitle',
},
    {
      title: 'Action',
      key: 'action',
      render: (_, employee) => (
        <>
        <Button onClick={() => handleEditClick(employee)} style={{ marginRight: '10px' }}>Edit</Button>
        <Button danger onClick={() => showDeleteConfirm(employee.id)}>
        Delete
      </Button>
      </>
      ),
    },
  ];

  return (
    <>
      <h3>All Employees</h3>
      <Table dataSource={employees} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      {selectedEmployee && (
        <Modal
          title="Edit Employee"
          visible={isModalVisible}
          onOk={handleSave}
          onCancel={() => setIsModalVisible(false)}
          okText="Save"
        >
         <Form layout="vertical">
         <Row gutter={16}>
         <Col span={12}>
         <Form.Item label="Name" required>
          <Input
            name="name"
            value={selectedEmployee.name}
            onChange={handleInputChange}
            placeholder="Name"
            style={{ marginBottom: '10px' }}
          />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Date of birth" required>
          <Input
            name="dateOfBirth"
            value={selectedEmployee.dateOfBirth}
            onChange={handleInputChange}
            placeholder="Date of Birth (YYYY-MM-DD)"
            style={{ marginBottom: '10px' }}
          />
        

         {/* <DatePicker
            value={selectedEmployee.dateOfBirth ? moment(selectedEmployee.dateOfBirth) : null}
            onChange={(date, dateString) => handleDateChange(date, dateString, 'dateOfBirth')}
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
          /> */}
          </Form.Item>
          </Col>
          </Row>


          <Row gutter={16}>

          <Col span={12}>
          <Form.Item label="Gender" required>
          <Select
            value={selectedEmployee.gender}
            onChange={(value) => handleSelectChange(value, 'gender')}
            placeholder="Gender"
            style={{ marginBottom: '10px', width: '100%' }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          </Form.Item>
          </Col>

          <Col span={12}>
          <Form.Item label="Phone" required>
          <Input
            name="phone"
            value={selectedEmployee.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            style={{ marginBottom: '10px' }}
          />
          </Form.Item>
          </Col>
          </Row>

            <Form.Item label="Address" required>
          <Input.TextArea
            name="address"
            value={selectedEmployee.address}
            onChange={handleInputChange}
            placeholder="Complete Address"
            style={{ marginBottom: '10px' }}
          />
          </Form.Item>

          <Row gutter={16}>

          <Col span={12}>
          <Form.Item label="Email" required>
          <Input
            name="email"
            value={selectedEmployee.email}
            onChange={handleInputChange}
            placeholder="Email"
            style={{ marginBottom: '10px' }}
          />
          </Form.Item>
          </Col>

          <Col span={12}>
          <Form.Item label="Employee ID" required>
          <Input
            name="employeeId"
            value={selectedEmployee.employeeId}
            onChange={handleInputChange}
            placeholder="Employee ID"
            style={{ marginBottom: '10px' }}
          />
          </Form.Item>
          </Col>
          </Row>


          <Row gutter={16}>

          <Col span={12}>
          <Form.Item label="Job Title" required>
          <Input
            name="jobTitle"
            value={selectedEmployee.jobTitle}
            onChange={handleInputChange}
            placeholder="Job Title"
            style={{ marginBottom: '10px' }}
          />
          </Form.Item>
          </Col>

          <Col span={12}>
          <Form.Item label="Department" required>
          <Select
            value={selectedEmployee.department}
            onChange={(value) => handleSelectChange(value, 'department')}
            placeholder="Department"
            style={{ marginBottom: '10px', width: '100%' }}
          >
            <Option value="IT">IT</Option>
            <Option value="HR">HR</Option>
            <Option value="Sales">Sales</Option>
            <Option value="Administration">Administration</Option>
            <Option value="Tech Support">Tech Support</Option>
            <Option value="Operations">Operations</Option>
          </Select>
          </Form.Item>
          </Col>
          </Row>

          <Row gutter={16}>

          <Col span={12}>
          <Form.Item label="Date of Joining" required>
          <Input
            name="dateOfJoining"
            value={selectedEmployee.dateOfJoining}
            onChange={handleInputChange}
            placeholder="Date of Joining (YYYY-MM-DD)"
            style={{ marginBottom: '10px' }}
          />
          </Form.Item>
          </Col>

          <Col span={12}>
          <Form.Item label="Employement Type" required>
          <Select
            value={selectedEmployee.employmentType}
            onChange={(value) => handleSelectChange(value, 'employmentType')}
            placeholder="Employment Type"
            style={{ marginBottom: '10px', width: '100%' }}
          >
            <Option value="Full Time">Full Time</Option>
            <Option value="Part Time">Part Time</Option>
            <Option value="Contract">Contract</Option>
            <Option value="Freelancing">Freelancing</Option>
          </Select>
          </Form.Item>
          </Col>
          </Row>

          <Form.Item label="Skills" required>
          <Input
            name="skills"
            value={selectedEmployee.skills}
            onChange={handleInputChange}
            placeholder="Skills (comma-separated)"
            style={{ marginBottom: '10px' }}
          />
          </Form.Item>

</Form> 
        </Modal>
      )}
    </>
  );
};

export default EmployeeTable;
