// import Sidebar from '../components/Sidebar';
// import Notification from '../components/Notification';
// import styles from '../styles/LeaveRequests.module.css';
// import { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import Navbar from '../components/Navbar';


// const initialRequests = [
//   { id: 1, employee: 'John Doe', type: 'Sick Leave', status: 'Pending', details: 'Feeling very sick.' },
//   { id: 2, employee: 'Jane Smith', type: 'Annual Leave', status: 'Pending', details: 'Family vacation.' },
//   { id: 3, employee: 'Emily Clark', type: 'Maternity Leave', status: 'Pending', details: 'Expecting baby in 3 months.' },
//   { id: 4, employee: 'Michael Brown', type: 'Paternity Leave', status: 'Pending', details: 'Newborn baby at home.' },
//   { id: 5, employee: 'Sarah Davis', type: 'Bereavement Leave', status: 'Pending', details: 'Loss in the family.' },
//   { id: 6, employee: 'David Wilson', type: 'Unpaid Leave', status: 'Pending', details: 'Personal reasons.' },
// ];

// const leaveTypes = [
//   'Sick Leave', 'Annual Leave', 'Maternity Leave', 'Paternity Leave', 'Bereavement Leave', 'Unpaid Leave'
// ];

// export default function LeaveRequests() {
//   const [requests, setRequests] = useState(initialRequests);
//   const [newRequest, setNewRequest] = useState({ employee: '', type: '', details: '' });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [notification, setNotification] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   const handleButtonClick = () => {
//     setShowForm(true);
//     setShowForm(!showForm);  
//   };
//   const handleApprove = (id) => {
//     setRequests(requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
//     setNotification('Leave request approved');
//   };

//   const handleReject = (id) => {
//     setRequests(requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
//     setNotification('Leave request rejected');
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleFilter = (event) => {
//     setFilterStatus(event.target.value);
//   };

//   const handleViewDetails = (id) => {
//     setSelectedRequest(requests.find(req => req.id === id));
//   };

//   const handleAddRequest = () => {
//     setRequests([...requests, { ...newRequest, id: requests.length + 1, status: 'Pending' }]);
//     setNewRequest({ employee: '', type: '', details: '' });
//     setNotification('New leave request added');
//   };

//   const filteredRequests = requests.filter(request => 
//     request.employee.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (filterStatus ? request.status === filterStatus : true)
//   );

//   return (
//     <>
//     <Navbar/>
   
//       <Sidebar />
//       <Notification message={notification} />
//       <div className={styles.container}>
//         <h1 className={styles.h1}>Leave Requests</h1>
//         <input 
//           type="text" 
//           placeholder="Search by employee" 
//           value={searchTerm}
//           onChange={handleSearch}
//           className={styles.search}
//         />
//         <input 
//           type="submit" 
//          value="Search"
//          className={styles.searchbutton}
         
//         />
         
//         <select value={filterStatus} onChange={handleFilter} className={styles.filter}>
//           <option value="">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//         <button className={styles.createnewleaverequest} onClick={handleButtonClick}>
//         +Create New Leave Request
//       </button>
//       {showForm && (
//       <div className={styles.addRequest}>
//           <h2>New Leave Request</h2>
//           <label htmlFor="name">Name:</label>
//           <input 
//             type="text" 
//             placeholder="Employee" 
//             value={newRequest.employee}
//             className={styles.input}
//             onChange={(e) => setNewRequest({ ...newRequest, employee: e.target.value })} 
//           />
//           <label htmlFor="leavetype">Leave Type:</label>
//           <select 
//             value={newRequest.type}
//             onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
//             className={styles.input}
//           >
//             <option value="">Select Leave Type</option>
//             {leaveTypes.map(type => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <label htmlFor="details">Details:</label>
//           <textarea 
//             placeholder="Details" 
//             value={newRequest.details}
//             className={styles.input}
//             onChange={(e) => setNewRequest({ ...newRequest, details: e.target.value })} 
//           />
//           <button className={styles.button} onClick={handleAddRequest}>Add Request</button>
//         </div>
//          )}
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRequests.map(request => (
//               <tr key={request.id}>
//                 <td>{request.employee}</td>
//                 <td>{request.type}</td>
//                 <td>{request.status}</td>
//                 <td>
//                   {request.status === 'Pending' && (
//                     <div className={styles.actionButtons}>
//                       <button className={styles.approve} onClick={() => handleApprove(request.id)}>Approve</button>
//                       <button className={styles.reject} onClick={() => handleReject(request.id)}>Reject</button>
//                     </div>
//                   )}
//                   <button className={styles.viewdetails} onClick={() => handleViewDetails(request.id)}>View Details</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
      
//         {selectedRequest && (
//           <div className={styles.details}>
//             <h2>Leave Request Details</h2>
//             <p><strong>Employee:</strong> {selectedRequest.employee}</p>
//             <p><strong>Type:</strong> {selectedRequest.type}</p>
//             <p><strong>Status:</strong> {selectedRequest.status}</p>
//             <p><strong>Details:</strong> {selectedRequest.details}</p>
//             <button className={styles.button} onClick={() => setSelectedRequest(null)}>Close</button>
//           </div>
//         )}
//       </div>
//       <style jsx>{`
//         .container {
//           display: flex;
//           height: 100vh;
//         }
//       `}</style>
   
//     </>
//   );
// }
import React from 'react';
import { useState } from 'react';
import styles from '../styles/LeaveRequests.module.css';
import Sidebar from '../components/Sidebar';

const leaverequests = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
    setShowForm(!showForm);  
  };
  return (
    <>
    <Sidebar/>
    <div className={styles.container}>
     
      <main className={styles.mainContent}>
        
          <h1>Leave Requests</h1>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search by employee" className={styles.searchInput} />
            <button className={styles.searchButton}>Search</button>
            <select className={styles.filterSelect}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <button className={styles.createButton} onClick={handleButtonClick}>+ Create New Leave Request</button>
          {showForm && (
      <div className={styles.addRequest}>
          <h2>New Leave Request</h2>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            placeholder="Employee" 
            
            className={styles.input}
            
          />
          <label htmlFor="leavetype">Leave Type:</label>
          <select 
            
            className={styles.input}
          >
            <option value="">Select Leave Type</option>
          
              
            
          </select>
          <label htmlFor="reason">Reason:</label>
          <textarea 
            placeholder="Reason" 
            
            className={styles.input}
             
          />
          <button className={styles.button} >Add Request</button>
        </div>
      )}
       

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.employee}</td>
                <td>{request.type}</td>
                <td className={styles[request.status.toLowerCase()]}>{request.status}</td>
                <td>
                  <button className={styles.approveButton}>Approve</button>
                  <button className={styles.rejectButton}>Reject</button>
                  <button className={styles.detailsButton}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
    </>
  );
};

export default leaverequests;

const leaveRequests = [
  { employee: 'John Doe', type: 'Sick Leave', status: 'Pending' },
  { employee: 'Jane Smith', type: 'Annual Leave', status: 'Pending' },
  { employee: 'Emily Clark', type: 'Maternity Leave', status: 'Pending' },
];
