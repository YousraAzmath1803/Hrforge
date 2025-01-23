import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsResponse, employeesResponse] = await Promise.all([
          fetch('/api/leave-requests'),
          fetch('/api/employees')
        ]);

        const requestsData = await requestsResponse.json();
        const employeesData = await employeesResponse.json();

        setRequests(requestsData);
        setEmployees(employeesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterRequests = () => {
      const filtered = requests.filter(req => {
        const requestDate = new Date(req.date);
        const isInDateRange =
          (!startDate || requestDate >= new Date(startDate)) &&
          (!endDate || requestDate <= new Date(endDate));

        return isInDateRange &&
               (req.employee.toLowerCase().includes(searchTerm.toLowerCase()) || 
                req.type.toLowerCase().includes(searchTerm.toLowerCase()));
      });
      setFilteredRequests(filtered);
    };

    filterRequests();
  }, [requests, startDate, endDate, searchTerm]);

  const leaveTypes = [
    'Sick Leave', 'Annual Leave', 'Maternity Leave', 'Paternity Leave', 'Bereavement Leave', 'Unpaid Leave'
  ];

  const getLeaveStats = () => {
    const stats = leaveTypes.reduce((acc, type) => {
      acc[type] = filteredRequests.filter(req => req.type === type).length;
      return acc;
    }, {});
    return stats;
  };

  const leaveStats = getLeaveStats();
  const leaveStatsChartData = {
    labels: Object.keys(leaveStats),
    datasets: [{
      label: 'Number of Leave Requests by Type',
      data: Object.values(leaveStats),
      backgroundColor: '#2ecc71',
      borderColor: '#27ae60',
      borderWidth: 1,
    }],
  };

  const getLeaveTrends = () => {
    const data = filteredRequests.reduce((acc, req) => {
      const date = req.date;
      if (!acc[date]) acc[date] = 0;
      acc[date] += 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(data),
      datasets: [{
        label: 'Leave Requests Over Time',
        data: Object.values(data),
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
      }],
    };
  };

  const leaveTrendsChartData = getLeaveTrends();

  // Helper function to generate CSV data
  const generateCSV = (data, headers) => {
    const csvRows = [];
    csvRows.push(headers.join(','));
    data.forEach(row => {
      csvRows.push(headers.map(header => row[header]).join(','));
    });
    return csvRows.join('\n');
  };

  const downloadCSV = (data, filename) => {
    const csvData = generateCSV(data, Object.keys(data[0]));
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
  };

  return (
    <>
    <div className={styles.container}>
      
    </div><div className={styles.dashboard}>
        <h1 className={styles.dashboardHeader}>Welcome to the Leave Management System</h1>

        {/* <div className={styles.filters}>
      <div className={styles.dateRange}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search by employee or type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div> */}

        <div className={styles.stats}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Pending Requests</h3>
            <p className={styles.cardValue}>{filteredRequests.filter(req => req.status === 'Pending').length}</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Approved Requests</h3>
            <p className={styles.cardValue}>{filteredRequests.filter(req => req.status === 'Approved').length}</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Rejected Requests</h3>
            <p className={styles.cardValue}>{filteredRequests.filter(req => req.status === 'Rejected').length}</p>
          </div>
        </div>

        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Leave Request Statistics by Type</h2>
          <Bar data={leaveStatsChartData} />
        </div>
        <div className={styles.trends}>
          <h2 className={styles.trendsTitle}>Leave Trends Over Time</h2>
          <Line data={leaveTrendsChartData} />
        </div>

        <div className={styles.recentRequests}>
          <h2 className={styles.recentRequestsTitle}>Recent Leave Requests</h2>
          <ul className={styles.ulList}>
            {filteredRequests.slice(0, 5).map(req => (
              <li key={req.id} className={styles.listItem}>
                {req.employee} - {req.type} - {req.status} - {new Date(req.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.employeeSummary}>
          <h2 className={styles.employeeSummaryTitle}>Employee Leave Balances</h2>
          <ul className={styles.ulList}>
            {employees.map(emp => (
              <li key={emp.name} className={styles.listItem}>
                {emp.name} - Leave Balance: {emp.leaveBalance} days
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.export}>
          <button onClick={() => downloadCSV(filteredRequests, 'leave_requests.csv')} className={styles.exportButton}>
            Export Leave Requests
          </button>
          <button onClick={() => downloadCSV(employees, 'employees.csv')} className={styles.exportButton}>
            Export Employee Data
          </button>
        </div>
      </div></>
  );
};

export default Dashboard;
