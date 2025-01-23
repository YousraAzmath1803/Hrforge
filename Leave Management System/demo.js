import styles from '../styles/Demo.module.css';
import React from 'react';
import { Pie,Bar } from 'react-chartjs-2';
import Sidebar from '../components/Sidebar';

import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale,  Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement,BarElement, CategoryScale, LinearScale,  Tooltip, Legend);
  

export default function demo() {


  
  
 
  
 
    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Dataset',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    const bardata = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  





  return (
    <>
    <Sidebar/>
    <div className={styles.container}>
     
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <p>Welcome back, John</p>
         
        </header>

        {/* Stats Overview */}
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Pending Requests</h3>
            <p className={styles.statValue}>5</p>
            <div className={styles.statChart} style={{ backgroundColor: '#3b82f6' }} />
          </div>
          <div className={styles.statCard}>
            <h3>Approved Requests</h3>
            <p className={styles.statValue}>7</p>
            <div className={styles.statChart} style={{ backgroundColor: '#f87171' }} />
          </div>
          <div className={styles.statCard}>
            <h3>Rejected Requests</h3>
            <p className={styles.statValue}>8</p>
            <div className={styles.statChart} style={{ backgroundColor: '#4ade80' }} />
          </div>
          <div className={styles.statCard}>
            <h3>Total Requests</h3>
            <p className={styles.statValue}>20</p>
            <div className={styles.statChart} style={{ backgroundColor: '#FFFF00' }} />
          </div>
        </section>
       <div className={styles.charts}>
        <div style={{ width: '350px', height: '350px' }}>
      <h2>Pie Chart Example</h2>
      <Pie data={data}  />
    </div>
    <div style={{ width: '600px', height: '400px' }} >
      <h2>Bar Chart Example</h2>
      <Bar data={bardata} options={options} />
    </div>
    </div>

      
      </main>
    </div>
    </>
 );
};


  



// import React from 'react';
// import styles from '../styles/Demo.module.css';

// const demo= () => {
//   return (
//     <div className={styles.dashboardContainer}>
//       <nav className={styles.sidebar}>
//         <div className={styles.brand}>
//           <h2>Brand Name</h2>
//         </div>
//         <ul className={styles.menu}>
//           <li>Dashboard</li>
//           <li>Customers</li>
//           <li>Messages</li>
//           <li>Help</li>
//           <li>Settings</li>
//           <li>Password</li>
//           <li>Sign Out</li>
//         </ul>
//       </nav>

//       <main className={styles.mainContent}>
//         <header className={styles.header}>
//           <input type="text" placeholder="Search here..." className={styles.searchBar} />
//         </header>

//         <section className={styles.statsSection}>
//           <div className={styles.statsBox}>
//             <h3 className={styles.h3}>1,504</h3>
//             <p>Daily Views</p>
//           </div>
//           <div className={styles.statsBox}>
//             <h3 className={styles.h3}>80</h3>
//             <p>Sales</p>
//           </div>
//           <div className={styles.statsBox}>
//             <h3 className={styles.h3}>284</h3>
//             <p>Comments</p>
//           </div>
//           <div className={styles.statsBox}>
//             <h3 className={styles.h3}>$7,842</h3>
//             <p>Earnings</p>
//           </div>
//         </section>

//         <section className={styles.chartsSection}>
//           <div className={styles.chartBox}>
//             <h4>Platform Distribution</h4>
//             <div className={styles.pieChart}></div>
//           </div>
//           <div className={styles.chartBox}>
//             <h4>Earnings Over Time</h4>
//             <div className={styles.barChart}></div>
//           </div>
//         </section>

//         <section className={styles.ordersSection}>
//           <h3>Recent Orders</h3>
//           <button className={styles.viewAllButton}>View All</button>
//         </section>

//         <section className={styles.customersSection}>
//           <h3>Recent Customers</h3>
//           <button className={styles.viewAllButton}>View All</button>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default demo;
// 'use client'
// import React from 'react';
// import dynamic from 'next/dynamic';
// import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
// import styles from '../styles/Demo.module.css';

// const dataPie = [
//   { name: 'Sick Leave', value: 400 },
//   { name: 'Annual Leave', value: 300 },
//   { name: 'Maternity Leave', value: 300 },
//   { name: 'Paternity Leave', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const dataBar = [
//   { name: 'January', LeaveRequests: 40, Approvals: 30 },
//   { name: 'February', LeaveRequests: 30, Approvals: 20 },
//   { name: 'March', LeaveRequests: 20, Approvals: 15 },
//   { name: 'April', LeaveRequests: 27, Approvals: 22 },
// ];

// const demo = () => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Colorful Charts</h1>
      
//       <div className={styles.chartContainer}>
//         {/* Pie Chart */}
//         <div className={styles.pieChart}>
//           <h2 className={styles.h2}>Leave Type Distribution</h2>
//           <PieChart width={400} height={400}>
//             <Pie
//               data={dataPie}
//               cx={200}
//               cy={200}
//               innerRadius={60}
//               outerRadius={120}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {dataPie.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         {/* Bar Chart */}
//         <div className={styles.barChart}>
//           <h2 className={styles.h2}>Leave Requests vs Approvals</h2>
//           <BarChart
//             width={500}
//             height={300}
//             data={dataBar}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="LeaveRequests" fill="#8884d8" />
//             <Bar dataKey="Approvals" fill="#82ca9d" />
//           </BarChart>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default demo;
// 'use client'
// import dynamic from 'next/dynamic';
// import styles from '../styles/Demo.module.css';

// // Dynamically import Recharts components with no SSR
// const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
// const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
// const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
// const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });

// const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
// const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
// const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
// const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
// const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
// const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });

// const dataPie = [
//   { name: 'Sick Leave', value: 400 },
//   { name: 'Annual Leave', value: 300 },
//   { name: 'Maternity Leave', value: 300 },
//   { name: 'Paternity Leave', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const dataBar = [
//   { name: 'January', LeaveRequests: 40, Approvals: 30 },
//   { name: 'February', LeaveRequests: 30, Approvals: 20 },
//   { name: 'March', LeaveRequests: 20, Approvals: 15 },
//   { name: 'April', LeaveRequests: 27, Approvals: 22 },
// ];

// const demo= () => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Colorful Charts</h1>
      
//       <div className={styles.chartContainer}>
//         {/* Pie Chart */}
//         <div className={styles.pieChart}>
//           <h2>Leave Type Distribution</h2>
//           <PieChart width={400} height={400}>
//             <Pie
//               data={dataPie}
//               cx={200}
//               cy={200}
//               innerRadius={60}
//               outerRadius={120}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {dataPie.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         {/* Bar Chart */}
//         <div className={styles.barChart}>
//           <h2>Leave Requests vs Approvals</h2>
//           <BarChart
//             width={500}
//             height={300}
//             data={dataBar}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="LeaveRequests" fill="#8884d8" />
//             <Bar dataKey="Approvals" fill="#82ca9d" />
//           </BarChart>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default demo;
