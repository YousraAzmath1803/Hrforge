import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <Navbar/>
        <title>Leave Management Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <Dashboard />
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
        }
          
      `}</style>
    </div>
  );
}