import { useState } from 'react';
import styles from './LeaveEncashmentPolicy.module.css';
import Sidebar from '../components/Sidebar';

export default function LeaveEncashmentPolicy() {
  const [leavePolicy, setLeavePolicy] = useState('Option 1');
  const [employeeType, setEmployeeType] = useState('Option 1');
  const [encashmentData, setEncashmentData] = useState([
    { leaveType: 'Casual Leave', amount: 1000 },
    { leaveType: 'Sick Leave', amount: 2000 }
  ]);

  const handleEdit = (index) => {
    const newAmount = prompt('Enter new encashment amount:', encashmentData[index].amount);
    if (newAmount !== null) {
      const updatedData = [...encashmentData];
      updatedData[index].amount = parseInt(newAmount, 10);
      setEncashmentData(updatedData);
    }
  };

  return (
    <>
    <Sidebar/>
    <div className={styles.container}>
      {/* <aside className={styles.sidebar}>
        <h2>HR Forge</h2>
        <ul>
          <li>Dashboard</li>
          <li>Leave Requests</li>
          <li>Employees</li>
          <li>Manage Leave Types</li>
          <li>Leave Policy</li>
          <li>Approval Flow</li>
          <li>Leave Encashment Policy</li>
          <li>Login</li>
        </ul>
      </aside> */}

      <main className={styles.main}>
        <h1 className={styles.h1}>Leave Encashment Policy</h1>

       
          <label className={styles.label}>
            Leave Policy:
            </label>

            <select className={styles.select} value={leavePolicy} onChange={(e) => setLeavePolicy(e.target.value)}>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
            </select>
         

          <label className={styles.label}>
            Employee Type:
            </label>
            <select className={styles.select} value={employeeType} onChange={(e) => setEmployeeType(e.target.value)}>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
            </select>
          
        

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Encashment Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {encashmentData.map((item, index) => (
              <tr key={index}>
                <td>{item.leaveType}</td>
                <td>{item.amount}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
    </>
  );
}
