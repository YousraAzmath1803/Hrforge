// import Sidebar from '../components/Sidebar';
// import Notification from '../components/Notification';
// import styles from '../styles/Dashboard.module.css';
// import { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import Navbar from '../components/Navbar';


// const initialRequests = [
//   { id: 1, employee: 'John Doe', type: 'Sick Leave', status: 'Approved' },
//   { id: 2, employee: 'Jane Smith', type: 'Annual Leave', status: 'Pending' },
//   { id: 3, employee: 'Emily Clark', type: 'Maternity Leave', status: 'Approved' },
//   { id: 4, employee: 'Michael Brown', type: 'Paternity Leave', status: 'Rejected' },
//   { id: 5, employee: 'Sarah Davis', type: 'Bereavement Leave', status: 'Approved' },
//   { id: 6, employee: 'David Wilson', type: 'Unpaid Leave', status: 'Pending' },
// ];

// const leaveTypes = [
//   'Sick Leave', 'Annual Leave', 'Maternity Leave', 'Paternity Leave', 'Bereavement Leave', 'Unpaid Leave'
// ];

// const Dashboard = () => {
//   const [requests] = useState(initialRequests);

//   // Generate statistics
//   const getLeaveStats = () => {
//     const stats = leaveTypes.reduce((acc, type) => {
//       acc[type] = requests.filter(req => req.type === type).length;
//       return acc;
//     }, {});
//     return stats;
//   };

//   const leaveStats = getLeaveStats();
//   const chartData = {
//     labels: Object.keys(leaveStats),
//     datasets: [{
//       label: 'Number of Leave Requests',
//       data: Object.values(leaveStats),
//       backgroundColor: '#2ecc71',
//       borderColor: '#27ae60',
//       borderWidth: 1,
//     }],
//   };

//   return (
//     <>
//        <Navbar/>
//     {/* <div className="container">
//   */}
//       <Notification message="Dashboard loaded" />
//       {/* <div className={styles.container}> */}
//         <h1 className={styles.heading}>Dashboard</h1>
//         <div className={styles.stats}>
        
//           <div className={styles.statItem}>
//             <h3>Total Requests</h3>
//             <p>{requests.length}</p>
//           </div>
         
//           <div className={styles.statItem}>
         
//             <h3>Pending Requests</h3>
//             <p>{requests.filter(req => req.status === 'Pending').length}</p>
//           </div>
//           <div className={styles.statItem}>
//             <h3>Approved Requests</h3>
//             <p>{requests.filter(req => req.status === 'Approved').length}</p>
//           </div>
//           <div className={styles.statItem}>
//             <h3>Rejected Requests</h3>
//             <p>{requests.filter(req => req.status === 'Rejected').length}</p>
//           </div>
//         </div>
//         <div className={styles.chart}>
//           <h2>Leave Request Statistics</h2>
//           <Bar data={chartData} />
//         </div>
//       {/* </div> */}
//       <style jsx>{`
//         .container {
//           display: flex;
//           height: 100vh;
        
//         }
//       `}</style>
//     {/* </div> */}
//     </>
//   );
// };

// export default Dashboard;import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Circle</div>
        <ul className={styles.menu}>
          <li>Dashboard</li>
          <li>Customers</li>
          <li>Activities</li>
          <li>Reports</li>
          <li>Settings</li>
          <li>Log out</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <p>Welcome back, John</p>
          <div className={styles.profile}>
            <span>John Smith</span>
            <img src="/profile.jpg" alt="John Smith" className={styles.avatar} />
          </div>
        </header>

        {/* Stats Overview */}
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Revenue</h3>
            <p className={styles.statValue}>$2400.50</p>
            <div className={styles.statChart} style={{ backgroundColor: '#3b82f6' }} />
          </div>
          <div className={styles.statCard}>
            <h3>Expenses</h3>
            <p className={styles.statValue}>$1850.20</p>
            <div className={styles.statChart} style={{ backgroundColor: '#f87171' }} />
          </div>
          <div className={styles.statCard}>
            <h3>Sales</h3>
            <p className={styles.statValue}>5678</p>
            <div className={styles.statChart} style={{ backgroundColor: '#4ade80' }} />
          </div>
        </section>

        {/* Recent Messages */}
        <section className={styles.messages}>
          <h2>Recent messages</h2>
          <ul>
            <li>
              <span>Brooklyn Simmons</span>
              <p>How can I return a package?</p>
              <span className={styles.status}>Answered</span>
              <span className={styles.time}>12:48</span>
            </li>
            <li>
              <span>Jacob Jones</span>
              <p>Questions about the product</p>
              <span className={styles.statusPending}>Pending</span>
              <span className={styles.time}>10:04</span>
            </li>
            <li>
              <span>Jenny Wilson</span>
              <p>Discount code</p>
              <span className={styles.statusPending}>Pending</span>
              <span className={styles.time}>Yesterday</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

