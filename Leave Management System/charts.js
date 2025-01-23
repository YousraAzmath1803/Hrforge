// import React from 'react';

// const PieChart = () => {
//   // Data for the pie chart (example percentages)
//   const data = [
//     { name: 'Sick Leave', value: 30, color: '#FF6384' },
//     { name: 'Annual Leave', value: 40, color: '#36A2EB' },
//     { name: 'Maternity Leave', value: 20, color: '#FFCE56' },
//     { name: 'Paternity Leave', value: 10, color: '#4BC0C0' }
//   ];

//   const total = data.reduce((acc, item) => acc + item.value, 0);

//   // Function to calculate SVG path
//   const getCoordinatesForPercent = (percent) => {
//     const x = Math.cos(2 * Math.PI * percent);
//     const y = Math.sin(2 * Math.PI * percent);
//     return [x, y];
//   };

//   let cumulativePercent = 0;

//   return (
//     <div>
//       <h2>Pie Chart - Leave Type Distribution</h2>
//       <svg width="200" height="200" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
//         {data.map((slice, index) => {
//           const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
//           cumulativePercent += slice.value / total;
//           const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

//           const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

//           const pathData = [
//             `M ${startX} ${startY}`, // Move
//             `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
//             'L 0 0' // Line to center
//           ].join(' ');

//           return <path key={index} d={pathData} fill={slice.color} />;
//         })}
//       </svg>
//     </div>
//   );
// };

// export default PieChart;
// import React, { useEffect, useRef } from 'react';

// const BarChart = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const ctx = canvasRef.current.getContext('2d');

//     const data = [
//       { name: 'January', value: 40 },
//       { name: 'February', value: 30 },
//       { name: 'March', value: 20 },
//       { name: 'April', value: 27 }
//     ];

//     const barWidth = 40;
//     const gap = 20;
//     const chartHeight = 200;
//     const maxBarHeight = Math.max(...data.map(item => item.value));
    
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     ctx.fillStyle = '#333';
//     ctx.font = '14px Arial';

//     data.forEach((item, index) => {
//       const x = index * (barWidth + gap);
//       const barHeight = (item.value / maxBarHeight) * chartHeight;
//       const y = chartHeight - barHeight;
//       ctx.fillStyle = '#36A2EB';
//       ctx.fillRect(x, y, barWidth, barHeight);

//       // Labels
//       ctx.fillStyle = '#333';
//       ctx.fillText(item.name, x + 5, chartHeight + 20);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Bar Chart - Leave Requests</h2>
//       <canvas ref={canvasRef} width={400} height={250} />
//     </div>
//   );
// };

// export default BarChart;
import React, { useEffect, useRef } from 'react';

// PieChart Component (SVG-based)
const PieChart = () => {
  const data = [
    { name: 'Sick Leave', value: 30, color: '#FF6384' },
    { name: 'Annual Leave', value: 40, color: '#36A2EB' },
    { name: 'Maternity Leave', value: 20, color: '#FFCE56' },
    { name: 'Paternity Leave', value: 10, color: '#4BC0C0' }
  ];

  const total = data.reduce((acc, item) => acc + item.value, 0);

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  let cumulativePercent = 0;

  return (
    <div>
      <h2>Pie Chart - Leave Type Distribution</h2>
      <svg width="200" height="200" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
        {data.map((slice, index) => {
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += slice.value / total;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
          const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;
          const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'L 0 0'
          ].join(' ');

          return <path key={index} d={pathData} fill={slice.color} />;
        })}
      </svg>
    </div>
  );
};

// BarChart Component (Canvas-based)
const BarChart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const data = [
      { name: 'January', value: 40 },
      { name: 'February', value: 30 },
      { name: 'March', value: 20 },
      { name: 'April', value: 27 }
    ];

    const barWidth = 40;
    const gap = 20;
    const chartHeight = 200;
    const maxBarHeight = Math.max(...data.map(item => item.value));

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';

    data.forEach((item, index) => {
      const x = index * (barWidth + gap);
      const barHeight = (item.value / maxBarHeight) * chartHeight;
      const y = chartHeight - barHeight;
      ctx.fillStyle = '#36A2EB';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Labels
      ctx.fillStyle = '#333';
      ctx.fillText(item.name, x + 5, chartHeight + 20);
    });
  }, []);

  return (
    <div>
      <h2>Bar Chart - Monthly Data</h2>
      <canvas ref={canvasRef} width={400} height={250} />
    </div>
  );
};

// CombinedCharts Component
const charts = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <PieChart />
      <BarChart />
    </div>
  );
};

export default charts;
