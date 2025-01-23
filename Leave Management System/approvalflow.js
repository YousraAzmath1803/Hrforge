
// import React from 'react'
// import { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import styles from './ApprovalFlow.module.css';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import Navbar from '../components/Navbar';

// const approvalflow = () => {
//   return (
    
//     <>
//     <Navbar/>
//     <div className={styles.container}>
//    <Sidebar />
//         <h1 className={styles.h1}>Approval Flow</h1>
//         <div className={styles.row}>
//         <div className={styles.Name}>
//           <label htmlFor="name" className={styles.label}>
//             Name:
//           </label>
//           <input type="text" id="name" name="name" className={styles.input} />
//         </div>
//         <div className={styles.EmployeeType}>
//           <label htmlFor="options" className={styles.label}>
//             Employee Type:
//           </label>
//           <select id="options" name="options" className={styles.select}>
//             <option value="option1">Option 1</option>
//             <option value="option2">Option 2</option>
//             <option value="option3">Option 3</option>
//           </select>
//         </div>
//         </div>
//         <div className={styles.searchbox}>
//         <input
//           type="text"
//             className={styles.search}
//           placeholder="Search..." />
        
//         <input 
//           type="submit" 
//          value="Search"
//          className={styles.searchbutton}
         
//         />
//           </div>
//           <div className={styles.avatar1}>
//              <Avatar alt="Remy sharp" src="/static/images/avatar/1.jpg" />
//           <Typography variant="h6">satish</Typography>
//         </div>
//         <div className={styles.ApprovalDuration1}>
//           <label htmlFor="name" className={styles.label}>
//             Approval Duration:
//           </label>
//           <input type="text" id="name" name="name" className={styles.input} />
//           <input type="text" id="name" name="name" className={styles.input} />
//         </div>
//         <div className={styles.avatar2}>
//           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//           <Typography variant="h6">prakash</Typography>
//         </div>
//         <div className={styles.ApprovalDuration2}>
//           <label htmlFor="name" className={styles.label}>
//             Approval Duration:
//           </label>
//           <input type="text" id="name" name="name" className={styles.input} />
//           <input type="text" id="name" name="name" className={styles.input} />
//         </div>
//         <button className={styles.button}>
//           Create Approval Flow
//         </button>
//       </div>
//       </>
//   )
// }

// export default approvalflow
import React from 'react';
import styles from './ApprovalFlow.module.css';
import Sidebar from '../components/Sidebar';

const ApprovalFlow = () => {
  return (
    <>
    <Sidebar/>
    <div className={styles.container}>
      {/* <div className={styles.sidebar}>
        <h2 className={styles.title}>HR Forge</h2>
        <ul className={styles.menu}>
          <li>Dashboard</li>
          <li>Leave Requests</li>
          <li>Employees</li>
          <li>Manage Leave Types</li>
          <li>Leave Policy</li>
          <li>Approval Flow</li>
          <li>Leave Encashment Policy</li>
          <li>Login</li>
        </ul>
      </div> */}

      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Approval Flow</h1>

        {/* <div className={styles.searchContainer}> */}
        <label>Employee Name:</label>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
          />
          <label>Employee Type:</label>
          <select className={styles.select}>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search by employee" className={styles.searchInput} />
            <button className={styles.searchButton}>Search</button>
          </div>
        {/* </div> */}

        <div className={styles.userContainer}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>R</div>
            <p className={styles.name}>Satish</p>
            <div className={styles.duration}>
              <label>Approval Duration:</label>
              <input type="text" className={styles.inputSmall} />
            </div>
          </div>

          <div className={styles.userCard}>
            <div className={styles.avatar}>R</div>
            <p className={styles.name}>Prakash</p>
            <div className={styles.duration}>
              <label>Approval Duration:</label>
              <input type="text" className={styles.inputSmall} />
            </div>
          </div>
        </div>

        <button className={styles.createButton}>Create Approval Flow</button>
      </div>
    </div>
    </>
  );
};

export default ApprovalFlow;
