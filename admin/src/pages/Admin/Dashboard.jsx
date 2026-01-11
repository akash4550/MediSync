import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Dashboard = () => {
  const { aToken, getdashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getdashData();
    }
  }, [aToken, getdashData]);

  return (
    <div className="w-full max-w-6xl ">
      <p className="mb-3 text-lg font-medium mx-8">Dashboard</p>
      
      {/* Dashboard Overview */}
      <div className="bg-white border rounded text-sm p-5 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500 text-white p-4 rounded shadow">
            <p className="font-semibold">Total Doctors</p>
            <p className="text-2xl">{dashData?.doctors}</p>
          </div>

          <div className="bg-blue-600 text-white p-4 rounded shadow">
            <p className="font-semibold">Total Appointments</p>
            <p className="text-2xl">{dashData?.appoinments}</p>
          </div>

          <div className="bg-cyan-600 text-white p-4 rounded shadow">
            <p className="font-semibold">Total Patients</p>
            <p className="text-2xl">{dashData?.patients}</p>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="mt-5">
          <p className="font-semibold">Latest Appointments</p>
          <div className="overflow-x-auto bg-white rounded mt-3 shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Patient</th>
                  <th className="py-2 px-4 border">Doctor</th>
                  <th className="py-2 px-4 border">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {dashData?.latestAppoinments?.map((appointment, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{appointment.userdata?.name || 'N/A'}</td>
                    <td className="py-2 px-4 border">{appointment.docData?.name || 'N/A'}</td>
                    <td className="py-2 px-4 border">{appointment.slotDate}, {appointment.slotTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
