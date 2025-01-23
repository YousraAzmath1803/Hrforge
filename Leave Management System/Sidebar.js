import styles from './Sidebar.module.css';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      {/* <h2>Admin Dashboard</h2> */}
      <ul>
        <li><Link href="/">Dashboard</Link></li>
        <li><Link href="/leaverequests">Leave Requests</Link></li>
        <li><Link href="/Employee">Employee</Link></li>
        <li><Link href="/LeaveType"> Leave Type</Link></li>
        <li><Link href="/OrganizationLeavePolicyDTO">OrganizationLeavePolicyDTO</Link></li>
        <li><Link href="/approvalflow">Approval Flow</Link></li>
        <li><Link href="/leaveencashmentpolicy">Leave Encashment Policy</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/demo">Demo</Link></li>
        
        <li><Link href="/charts">Charts</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;
