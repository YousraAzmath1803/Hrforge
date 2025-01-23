

// import { useState } from 'react';
// import styles from './LeavePolicy.module.css';
// import Sidebar from '../components/Sidebar';

// export default function LeavePolicy() {
 
//   const [primaryLeaveTypeName, setprimaryLeaveTypeName] = useState('Select Primary Leave Type');
//   const [organizationId, setorganizationId] = useState('Option 1');
//   const [employerType, setemployerType] = useState('Option 1');
//   const [isPaid, setIsPaid] = useState(false);
//   const [available, setavailable] = useState('');
//   const [allowedLeaveTypeIds, setallowedLeaveTypeIds] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       primaryLeaveTypeName,
//       organizationId,
//       employerType,
//       isPaid,
//       available,
//       allowedLeaveTypeIds,
      
//     });
//   };

//   return (
//     <>
//     <Sidebar/>
//     <div className={styles.container}>
      
//        <div className={styles.maincontainer}>
//        <h1>Leave Policy</h1>

//       <div className={styles.main}>
//         <form onSubmit={handleSubmit} className={styles.leaveForm}>
         

        
//           <div className={styles.row}>
//                  <div className={styles.column}>
//             <label>primaryLeaveTypeName:</label>
//             <select 
//               className={styles.select}
//               value={primaryLeaveTypeName}
//               onChange={(e) => setprimaryLeaveTypeName(e.target.value)}
//             >
//               <option value="Option 1">Option 1</option>
//               <option value="Option 2">Option 2</option>
//             </select>
//             </div>
        

         
//            <div className={styles.column}>
//             <label>organizationId:</label>
//             <select
//              className={styles.select}
//               value={organizationId}
//               onChange={(e) => setorganizationId(e.target.value)}
//             >
//               <option value="Option 1">Option 1</option>
//               <option value="Option 2">Option 2</option>
//             </select>
//             </div>
//             </div>
         
//            <div className={styles.row}>
//            <div className={styles.column}>
//            <div className={styles.checkboxcontainer}>
//             <label>employerType:</label>
//             <input
//             className={styles.input}
//             type="text"
//             value={employerType}
//             onChange={(e) => setemployerType(e.target.value)}
//             placeholder="Days"
//             required
//             />
//             </div>
//             </div>
        
//           <div className={styles.column}>
          
//             <label>isPaid:</label>
//             <input
//              className={styles.checkbox}
//               type="checkbox"
//               checked={isPaid}
//               onChange={() => setIsPaid(!isPaid)}
//             />
       
           
           
//             </div>
//             </div>
//             <div className={styles.row}>
//             <div className={styles.column}>
         
//             <label>available:</label>
//             <input
//             className={styles.input}
//               type="text"
//               value={available}
//               onChange={(e) => setavailable(e.target.value)}
//               placeholder="Days"
//               required
//             />
//             </div>
//             <div className={styles.column}>
//             <label>allowedLeaveTypeIds:</label>
//              <input
//             className={styles.input}
//               type="text"
//               value={allowedLeaveTypeIds}
//               onChange={(e) => setallowedLeaveTypeIds(e.target.value)}
//               placeholder="Hours"
//               required
//             />
//              <input
//             className={styles.input}
//               type="text"
//               value={allowedLeaveTypeIds}
//               onChange={(e) => setallowedLeaveTypeIds(e.target.value)}
//               placeholder="Hours"
//               required
//             />
//            </div>
//           </div>
//           <button type="submit" className={styles.leavecombinationbutton}>
// +Add Leave Combination          </button>
//           </form>
//           </div>

//           <button type="submit" className={styles.submitBtn}>
//             Create Leave Policy
//           </button>
//           </div>
//     </div>
//     </>
//   );
// }
// import { useState } from 'react';
// import styles from './LeavePolicy.module.css';
// import Sidebar from '../components/Sidebar';
// import axios from 'axios'; // Import axios

// export default function LeavePolicy() {
//   const [employeeType, setEmployeeType] = useState('Option 1');
//   const [leaveType, setLeaveType] = useState('Option 1');
//   const [isPaid, setIsPaid] = useState(false);
//   const [availableLeaves, setAvailableLeaves] = useState('');
//   const [carryForwardLimit, setCarryForwardLimit] = useState('');

//   // Handle Leave Combination submission
//   const handleAddLeaveCombination = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/leavecombinations/create', {
//         primaryLeaveTypeId: leaveType, // Assuming leaveType corresponds to a valid ID
//         allowedLeaveTypeIds: [leaveType], // Adjust accordingly if you have multiple leave types
//         isAllowed: isPaid
//       });
//       console.log('Leave Combination created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave combination:', error);
//     }
//   };

//   // Handle Leave Policy submission
//   const handleSubmitPolicy = async (e) => {
//     e.preventDefault();
//     const policyData = {
//       employeeType,
//       leaveType,
//       isPaid,
//       availableLeaves,
//       carryForwardLimit
//     };

//     try {
//       const response = await axios.post('http://localhost:8080/api/policies', policyData);
//       console.log('Leave Policy created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave policy:', error);
//     }
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className={styles.container}>
//         <div className={styles.maincontainer}>
//           <h1>Leave Policy</h1>

//           <div className={styles.main}>
//             <form onSubmit={handleSubmitPolicy} className={styles.leaveForm}>
//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>primaryLeaveTypeName:</label>
//                   <select
//                     className={styles.select}
//                     value={employeeType}
//                     onChange={(e) => setEmployeeType(e.target.value)}
//                   >
//                     <option value="Option 1">Option 1</option>
//                     <option value="Option 2">Option 2</option>
//                   </select>
//                 </div>

//                 <div className={styles.column}>
//                   <label>organizationId:</label>
//                   <select
//                     className={styles.select}
//                     value={leaveType}
//                     onChange={(e) => setLeaveType(e.target.value)}
//                   >
//                     <option value="Option 1">Option 1</option>
//                     <option value="Option 2">Option 2</option>
//                   </select>
//                 </div>
//               </div>

//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <div className={styles.checkboxcontainer}>
//                     <label>employerType:</label>
//                     <input
//                       className={styles.checkbox}
//                       type="checkbox"
//                       checked={isPaid}
//                       onChange={() => setIsPaid(!isPaid)}
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.column}>
//                   <div className={styles.availableleavescontainer}>
//                     <label>Available Leaves:</label>
//                     <input
//                       className={styles.input}
//                       type="number"
//                       value={availableLeaves}
//                       onChange={(e) => setAvailableLeaves(e.target.value)}
//                       placeholder="Days"
//                       required
//                     />
//                     <input
//                       className={styles.input}
//                       type="number"
//                       value={availableLeaves}
//                       onChange={(e) => setAvailableLeaves(e.target.value)}
//                       placeholder="Hours"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.carryforwardlimitcontainer}>
//                 <label>Carry Forward Limit:</label>
//                 <input
//                   className={styles.input}
//                   type="number"
//                   value={carryForwardLimit}
//                   onChange={(e) => setCarryForwardLimit(e.target.value)}
//                   placeholder="Days"
//                   required
//                 />
//                 <input
//                   className={styles.input}
//                   type="number"
//                   value={carryForwardLimit}
//                   onChange={(e) => setCarryForwardLimit(e.target.value)}
//                   placeholder="Hours"
//                   required
//                 />
//               </div>

//               <button
//                 type="button"
//                 className={styles.leavecombinationbutton}
//                 onClick={handleAddLeaveCombination}
//               >
//                 +Add Leave Combination
//               </button>

//               <button type="submit" className={styles.submitBtn}>
//                 Create Leave Policy
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// import { useState } from 'react';
// import styles from './LeavePolicy.module.css';
// import Sidebar from '../components/Sidebar';
// import axios from 'axios'; // Import axios

// export default function LeavePolicy() {
//   // State variables to manage form input values
//   const [primaryLeaveTypeName, setPrimaryLeaveTypeName] = useState('Option 1');
//   const [organizationId, setOrganizationId] = useState('Option 1');
//   const [employerType, setEmployerType] = useState('Option 1');
//   const [isPaid, setIsPaid] = useState(false);
//   const [available, setAvailable] = useState('');
//   const [allowedLeaveTypeIds, setAllowedLeaveTypeIds] = useState('');

//   // Handle Leave Combination submission
//   const handleAddLeaveCombination = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Assuming primaryLeaveTypeName and allowedLeaveTypeIds are mapped to valid IDs
//       const leaveCombinationData = {
//         primaryLeaveTypeId: primaryLeaveTypeName, // Assuming this holds the ID
//         allowedLeaveTypeIds: [allowedLeaveTypeIds], // Convert to an array if multiple IDs
//         isAllowed: isPaid
//       };

//       const response = await axios.post('http://localhost:8080/api/leavecombinations/create', leaveCombinationData);
//       console.log('Leave Combination created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave combination:', error);
//     }
//   };

//   // Handle Leave Policy submission
//   const handleCreateLeavePolicy = async (e) => {
//     e.preventDefault();
    
//     const policyData = {
//       primaryLeaveTypeName,
//       organizationId,
//       employerType,
//       isPaid,
//       availableLeaves: available, // Adjust as per your DTO field names
//       allowedLeaveTypeIds: [allowedLeaveTypeIds]
//     };

//     try {
//       const response = await axios.post('http://localhost:8080/api/policies', policyData);
//       console.log('Leave Policy created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave policy:', error);
//     }
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className={styles.container}>
//         <div className={styles.maincontainer}>
//           <h1>Leave Policy</h1>

//           <div className={styles.main}>
//             <form onSubmit={handleCreateLeavePolicy} className={styles.leaveForm}>
//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Primary Leave Type:</label>
//                   <select
//                     className={styles.select}
//                     value={primaryLeaveTypeName}
//                     onChange={(e) => setPrimaryLeaveTypeName(e.target.value)}
//                   >
//                     <option value="Option 1">Option 1</option>
//                     <option value="Option 2">Option 2</option>
//                   </select>
//                 </div>

//                 <div className={styles.column}>
//                   <label>Organization ID:</label>
//                   <select
//                     className={styles.select}
//                     value={organizationId}
//                     onChange={(e) => setOrganizationId(e.target.value)}
//                   >
//                     <option value="Option 1"> 1</option>
//                     <option value="Option 2">2</option>
//                   </select>
//                 </div>
//               </div>

//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Employer Type:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={employerType}
//                     onChange={(e) => setEmployerType(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className={styles.column}>
//                   <label>Is Paid:</label>
//                   <input
//                     className={styles.checkbox}
//                     type="checkbox"
//                     checked={isPaid}
//                     onChange={() => setIsPaid(!isPaid)}
//                   />
//                 </div>
//               </div>

//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Available Days:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={available}
//                     onChange={(e) => setAvailable(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className={styles.column}>
//                   <label>Allowed Leave Type IDs:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={allowedLeaveTypeIds}
//                     onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className={styles.leavecombinationbutton}
//                 onClick={handleAddLeaveCombination}
//               >
//                 +Add Leave Combination
//               </button>

//               <button type="submit" className={styles.submitBtn}>
//                 Create Leave Policy
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// import { useState } from 'react';
// import styles from './LeavePolicy.module.css';
// import Sidebar from '../components/Sidebar';
// import axios from 'axios'; // Import axios

// export default function LeavePolicy() {
//   // State variables to manage form input values
//   const [primaryLeaveTypeName, setPrimaryLeaveTypeName] = useState('1'); // Assuming it holds the ID now
//   const [organizationId, setOrganizationId] = useState('1'); // Assuming it's an ID
//   const [employerType, setEmployerType] = useState('Full-Time');
//   const [isPaid, setIsPaid] = useState(false);
//   const [available, setAvailable] = useState('');
//   const [allowedLeaveTypeIds, setAllowedLeaveTypeIds] = useState('');

//   // Handle Leave Combination submission
//   const handleAddLeaveCombination = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Convert allowedLeaveTypeIds to a list of numbers (assuming comma-separated input)
//       const allowedLeaveIdsArray = allowedLeaveTypeIds.split(',').map(id => parseInt(id.trim()));

//       const leaveCombinationData = {
//         primaryLeaveTypeId: parseInt(primaryLeaveTypeName), // Convert to number
//         allowedLeaveTypeIds: allowedLeaveIdsArray,
//         isAllowed: isPaid
//       };

//       const response = await axios.post('http://localhost:8080/api/leavecombinations/create', null, {
//         params: leaveCombinationData
//       });
//       console.log('Leave Combination created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave combination:', error);
//     }
//   };

//   // Handle Leave Policy submission
//   const handleCreateLeavePolicy = async (e) => {
//     e.preventDefault();
    
//     const policyData = {
//       primaryLeaveTypeName,
//       organizationId: parseInt(organizationId), // Assuming it's a number
//       employerType,
//       isPaid,
//       availableLeaves: parseInt(available), // Assuming available leaves is a number
//       allowedLeaveTypeIds: allowedLeaveTypeIds.split(',').map(id => parseInt(id.trim())) // Convert to list of numbers
//     };

//     try {
//       const response = await axios.post('http://localhost:8080/api/policies', policyData);
//       console.log('Leave Policy created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave policy:', error);
//     }
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className={styles.container}>
//         <div className={styles.maincontainer}>
//           <h1>Leave Policy</h1>

//           <div className={styles.main}>
//             <form onSubmit={handleCreateLeavePolicy} className={styles.leaveForm}>
//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Primary Leave Type:</label>
//                   <select
//                     className={styles.select}
//                     value={primaryLeaveTypeName}
//                     onChange={(e) => setPrimaryLeaveTypeName(e.target.value)}
//                   >
//                     <option value="1">Option 1</option>
//                     <option value="2">Option 2</option>
//                   </select>
//                 </div>

//                 <div className={styles.column}>
//                   <label>Organization ID:</label>
//                   <select
//                     className={styles.select}
//                     value={organizationId}
//                     onChange={(e) => setOrganizationId(e.target.value)}
//                   >
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                   </select>
//                 </div>
//               </div>

//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Employer Type:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={employerType}
//                     onChange={(e) => setEmployerType(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className={styles.column}>
//                   <label>Is Paid:</label>
//                   <input
//                     className={styles.checkbox}
//                     type="checkbox"
//                     checked={isPaid}
//                     onChange={() => setIsPaid(!isPaid)}
//                   />
//                 </div>
//               </div>

//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Available Days:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={available}
//                     onChange={(e) => setAvailable(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className={styles.column}>
//                   <label>Allowed Leave Type IDs:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={allowedLeaveTypeIds}
//                     onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//                     placeholder="Enter comma-separated IDs"
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className={styles.leavecombinationbutton}
//                 onClick={handleAddLeaveCombination}
//               >
//                 +Add Leave Combination
//               </button>

//               <button type="submit" className={styles.submitBtn}>
//                 Create Leave Policy
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// import { useState, useEffect } from 'react';
// import styles from './organizationleavepolicydto.module.css';
// import Sidebar from '../components/Sidebar';
// import axios from 'axios';

// export default function OrganizationLeavePolicyDTO() {
//   // State variables to manage form input values
//   const [leaveTypes, setLeaveTypes] = useState([]); // Store fetched leave types
//   const [primaryLeaveTypeId, setPrimaryLeaveTypeId] = useState(''); // Store selected primary leave type ID
//   const [organizationId, setOrganizationId] = useState('1'); // Assuming it's an ID
//   const [employerType, setEmployerType] = useState('Full-Time');
//   const [isPaid, setIsPaid] = useState(false);
//   const [available, setAvailable] = useState('');
//   const [allowedLeaveTypeIds, setAllowedLeaveTypeIds] = useState('');

//   // Fetch available leave types from the backend on component mount
//   useEffect(() => {
//     const fetchLeaveTypes = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/leavetypes'); // Fetch leave types from backend
//         setLeaveTypes(response.data); // Set leave types in state
//       } catch (error) {
//         console.error('Error fetching leave types:', error);
//       }
//     };

//     fetchLeaveTypes();
//   }, []);

//   // Handle Leave Combination submission
//   const handleAddLeaveCombination = async (e) => {
//     e.preventDefault();
    
//     try {
//       const allowedLeaveIdsArray = allowedLeaveTypeIds.split(',').map(id => parseInt(id.trim()));

//       const leaveCombinationData = {
//         primaryLeaveTypeId: parseInt(primaryLeaveTypeId), // Use ID of the selected leave type
//         allowedLeaveTypeIds: allowedLeaveIdsArray,
//         isAllowed: isPaid
//       };

//       const response = await axios.post('http://localhost:8080/api/leavecombinations/create', null, {
//         params: leaveCombinationData
//       });
//       console.log('Leave Combination created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave combination:', error);
//     }
//   };

//   // Handle Leave Policy submission
//   const handleCreateLeavePolicy = async (e) => {
//     e.preventDefault();
    
//     const policyData = {
//       primaryLeaveTypeId: parseInt(primaryLeaveTypeId), // Use ID of the selected leave type
//       organizationId: parseInt(organizationId), // Assuming it's a number
//       employerType,
//       isPaid,
//       availableLeaves: parseInt(available), // Assuming available leaves is a number
//       allowedLeaveTypeIds: allowedLeaveTypeIds.split(',').map(id => parseInt(id.trim())) // Convert to list of numbers
//     };

//     try {
//       const response = await axios.post('http://localhost:8080/api/policies', policyData);
//       console.log('Leave Policy created:', response.data);
//     } catch (error) {
//       console.error('Error creating leave policy:', error);
//     }
//   };

//   return (
//     <>
//       <Sidebar />
//       <div className={styles.container}>
//         <div className={styles.maincontainer}>
//           <h1>Leave Policy</h1>

//           <div className={styles.main}>
//             <form onSubmit={handleCreateLeavePolicy} className={styles.leaveForm}>
//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Primary Leave Type:</label>
//                   <select
//                     className={styles.select}
//                     value={primaryLeaveTypeId}
//                     onChange={(e) => setPrimaryLeaveTypeId(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Leave Type</option>
//                     {/* Map over fetched leave types */}
//                     {leaveTypes.map((leaveType) => (
//                       <option key={leaveType.id} value={leaveType.id}>
//                         {leaveType.name} {/* Assuming leaveType object has 'name' */}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className={styles.column}>
//                   <label>Organization ID:</label>
//                   <select
//                     className={styles.select}
//                     value={organizationId}
//                     onChange={(e) => setOrganizationId(e.target.value)}
//                   >
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                   </select>
//                 </div>
//               </div>

//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Employer Type:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={employerType}
//                     onChange={(e) => setEmployerType(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className={styles.column}>
//                   <label>Is Paid:</label>
//                   <input
//                     className={styles.checkbox}
//                     type="checkbox"
//                     checked={isPaid}
//                     onChange={() => setIsPaid(!isPaid)}
//                   />
//                 </div>
//               </div>

//               <div className={styles.row}>
//                 <div className={styles.column}>
//                   <label>Available Days:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={available}
//                     onChange={(e) => setAvailable(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className={styles.column}>
//                   <label>Allowed Leave Type IDs:</label>
//                   <input
//                     className={styles.input}
//                     type="text"
//                     value={allowedLeaveTypeIds}
//                     onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//                     placeholder="Enter comma-separated IDs"
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className={styles.leavecombinationbutton}
//                 onClick={handleAddLeaveCombination}
//               >
//                 +Add Leave Combination
//               </button>

//               <button type="submit" className={styles.submitBtn}>
//                 Create Leave Policy
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl
// } from '@mui/material';
// import axios from 'axios';

// const OrganizationLeavePolicyDTO= () => {
//   const [primaryLeaveTypeName, setPrimaryLeaveTypeName] = useState('');
//   const [organizationId, setOrganizationId] = useState('');
//   const [employerType, setEmployerType] = useState('');
//   const [isPaid, setIsPaid] = useState(false);
//   const [available, setAvailable] = useState('');
//   const [allowedLeaveTypeIds, setAllowedLeaveTypeIds] = useState([]);
//   const [isAllowed, setIsAllowed] = useState(false); // For LeaveCombination API

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const policyData = {
//       primaryLeaveTypeName,
//       organizationId: parseInt(organizationId), // Converting to number
//       employerType,
//       isPaid,
//       available: parseInt(available), // Converting to number
//       allowedLeaveTypeIds
//     };

//     try {
//       // First, call the Leave Combination API
//       const leaveCombinationResponse = await axios.post('http://localhost:8080/api/leavecombinations/create', {
//         primaryLeaveTypeId: parseInt(organizationId), // Assuming this maps to the leave type ID
//         allowedLeaveTypeIds: allowedLeaveTypeIds,
//         isAllowed: isAllowed
//       });

//       console.log('Leave combination created successfully:', leaveCombinationResponse.data);

//       // Now, call the Organization Leave Policy API
//       const policyResponse = await axios.post('http://localhost:8080/api/policies', policyData);
//       console.log('Policy created successfully:', policyResponse.data);
      
//     } catch (error) {
//       console.error('Error creating leave combination or policy:', error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create Organization Leave Policy
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Primary Leave Type Name"
//             value={primaryLeaveTypeName}
//             onChange={(e) => setPrimaryLeaveTypeName(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />

//           <TextField
//             label="Organization ID"
//             value={organizationId}
//             onChange={(e) => setOrganizationId(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           />

//           <TextField
//             label="Employer Type"
//             value={employerType}
//             onChange={(e) => setEmployerType(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />

//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={isPaid}
//                 onChange={(e) => setIsPaid(e.target.checked)}
//               />
//             }
//             label="Is Paid Leave?"
//           />

//           <TextField
//             label="Available"
//             value={available}
//             onChange={(e) => setAvailable(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           />

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Allowed Leave Type IDs</InputLabel>
//             {/* <TextField
//              multiple
//             label="Allowed Leave Type IDs"
//             value={allowedLeaveTypeIds}
//             onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//             // value={organizationId}
//             // onChange={(e) => setOrganizationId(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           /> */}
//             <Select
//               multiple
//               value={allowedLeaveTypeIds}
//               onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//              >
//               <MenuItem value={1}>Leave Type 1</MenuItem>
//               <MenuItem value={2}>Leave Type 2</MenuItem>
//               <MenuItem value={3}>Leave Type 3</MenuItem>
//             </Select> 
//             {/* <Select
//               multiple
//               value={allowedLeaveTypeIds}
//               onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//             > */}
//               {/* <MenuItem value={1}>Leave Type 1</MenuItem>
//               <MenuItem value={2}>Leave Type 2</MenuItem>
//               <MenuItem value={3}>Leave Type 3</MenuItem>
//             </Select> */} 
//              {/* <TextField
//             label="Allowed Leave Type IDs"
//             value={allowedLeaveTypeIds}
//             onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           /> */}
//           </FormControl>

//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={isAllowed}
//                 onChange={(e) => setIsAllowed(e.target.checked)}
//               />
//             }
//             label="Is Allowed Combination?"
//           />

//           <Box sx={{ mt: 3 }}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Create Policy
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default OrganizationLeavePolicyDTO;
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import axios from 'axios';

// const CreateOrganizationLeavePolicy = () => {
//   const [primaryLeaveTypeName, setprimaryLeaveTypeName] = useState('');
//   const [organizationId, setorganizationId] = useState('');
//   const [employerType, setemployerType] = useState('');
//   const [isPaid, setisPaid] = useState(false);
//   const [available, setavailable] = useState('');
//   const [allowedLeaveTypeIds, setallowedLeaveTypeIds] = useState([]);
//   const [leaveTypes, setLeaveTypes] = useState([]); // State for fetched leave types

//   // Fetch leave type IDs on component mount
//   useEffect(() => {
//     const fetchLeaveTypes = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/leavetypes/ids');
//         setLeaveTypes(response.data);
//       } catch (error) {
//         console.error('Error fetching leave types:', error);
//       }
//     };
//     fetchLeaveTypes();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const policyData = {
//       primaryLeaveTypeName,
//       organizationId: parseInt(organizationId),
//       employerType,
//       isPaid,
//       available: parseInt(available),
//       allowedLeaveTypeIds,
//     };
//     console.log("Submitting policy data:", policyData);
//     try {
//       const response = await axios.post(' http://localhost:8080/api/policies', policyData);
//       console.log('Policy created successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating policy:', error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create Organization Leave Policy
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Primary Leave Type Name"
//             value={primaryLeaveTypeName}
//             onChange={(e) => setprimaryLeaveTypeName(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />

//           <TextField
//             label="Organization ID"
//             value={organizationId}
//             onChange={(e) => setorganizationId(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           />

//           <TextField
//             label="Employer Type"
//             value={employerType}
//             onChange={(e) => setemployerType(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />

//           <FormControlLabel
//             control={<Checkbox checked={isPaid} onChange={(e) => setisPaid(e.target.checked)} />}
//             label="Is Paid Leave?"
//           />

//           <TextField
//             label="Available"
//             value={available}
//             onChange={(e) => setavailable(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           />

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Allowed Leave Type IDs</InputLabel>
//             <Select
//               multiple
//               value={allowedLeaveTypeIds}
//               onChange={(e) => setallowedLeaveTypeIds(e.target.value)}
//             >
//               {leaveTypes.map((id) => (
//                 <MenuItem key={id} value={id}>
//                   {id}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Box sx={{ mt: 3 }}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Create Policy
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default CreateOrganizationLeavePolicy;
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import axios from 'axios';
// const CreateOrganizationLeavePolicy = () => {
//   const [primaryLeaveTypeName, setPrimaryLeaveTypeName] = useState('');
//   const [organizationId, setOrganizationId] = useState('');
//   const [employerType, setEmployerType] = useState('');
//   const [isPaid, setIsPaid] = useState(false);
//   const [available, setAvailable] = useState('');
//   const [allowedLeaveTypeIds, setAllowedLeaveTypeIds] = useState([]);
//   const [leaveTypes, setLeaveTypes] = useState([]); // State for fetched leave types
//   // Fetch leave type IDs on component mount
//   useEffect(() => {
//     const fetchLeaveTypes = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/leavetypes/ids');
//         setLeaveTypes(response.data);
//       } catch (error) {
//         console.error('Error fetching leave types:', error);
//       }
//     };
//     fetchLeaveTypes();
//   }, []);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const policyData = {
//       primaryLeaveTypeName,
//       organizationId: parseInt(organizationId),
//       employerType,
//       isPaid,
//       available: parseInt(available),
//       allowedLeaveTypeIds,
//     };
//     console.log("Submitting policy data:", policyData);
//     try {
//       const response = await axios.post('http://localhost:8080/api/policies', policyData);
//       console.log('Policy created successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating policy:', error);
//     }
//   };
//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create Organization Leave Policy
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Primary Leave Type Name"
//             value={primaryLeaveTypeName}
//             onChange={(e) => setPrimaryLeaveTypeName(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Organization ID"
//             value={organizationId}
//             onChange={(e) => setOrganizationId(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           />
//           <TextField
//             label="Employer Type"
//             value={employerType}
//             onChange={(e) => setEmployerType(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <FormControlLabel
//             control={<Checkbox checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />}
//             label="Is Paid Leave?"
//           />
//           <TextField
//             label="Available"
//             value={available}
//             onChange={(e) => setAvailable(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             type="number"
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Allowed Leave Type IDs</InputLabel>
//             <Select
//               multiple
//               value={allowedLeaveTypeIds}
//               onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
//             >
//               {leaveTypes.map((id) => (
//                 <MenuItem key={id} value={id}>
//                   {id}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Box sx={{ mt: 3 }}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Create Policy
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Container>
//   );
// };
// export default CreateOrganizationLeavePolicy;
"use client";
import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';
const CreateOrganizationLeavePolicy = () => {
  const [primaryLeaveTypeName, setPrimaryLeaveTypeName] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [employerType, setEmployerType] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [available, setAvailable] = useState('');
  const [allowedLeaveTypeIds, setAllowedLeaveTypeIds] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]); // State for fetched leave types
  const [error, setError] = useState(null); // State for error handling
  // Fetch leave type IDs on component mount
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/leavetypes/ids');
        setLeaveTypes(response.data);
      } catch (error) {
        console.error('Error fetching leave types:', error);
      }
    };
    fetchLeaveTypes();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const policyData = {
      primaryLeaveTypeName,
      organizationId: parseInt(organizationId),
      employerType,
      isPaid,
      available: parseInt(available),
      allowedLeaveTypeIds,
    };
    console.log("Submitting policy data:", policyData);
    try {
      const response = await axios.post('http://localhost:8080/api/policies', policyData);
      console.log('Policy created successfully:', response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error creating policy:', error);
      setError('Failed to create policy. Please check your input and try again.'); // Set error message
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Organization Leave Policy
        </Typography>
        {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Primary Leave Type Name"
            value={primaryLeaveTypeName}
            onChange={(e) => setPrimaryLeaveTypeName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Organization ID"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="number"
          />
          <TextField
            label="Employer Type"
            value={employerType}
            onChange={(e) => setEmployerType(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={<Checkbox checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />}
            label="Is Paid Leave?"
          />
          <TextField
            label="Available"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="number"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Allowed Leave Type IDs</InputLabel>
            <Select
              multiple
              value={allowedLeaveTypeIds}
              onChange={(e) => setAllowedLeaveTypeIds(e.target.value)}
            >
              {leaveTypes.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Policy
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
export default CreateOrganizationLeavePolicy;