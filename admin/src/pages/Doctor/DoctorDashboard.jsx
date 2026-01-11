import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/admin/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (!dToken) {
      console.log("Not have token");
      console.log(dToken);
      return;
    }
    getDashData();
  }, [dToken]);

  if (!dashData) return null;

  console.log(dashData);

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        {/* Earnings */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {currency} {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img
            className="w-14"
            src={assets.appointments_icon}
            alt="Appointments"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-10 border border-gray-300 rounded-lg">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-300 rounded-t">
          <img src={assets.list_icon} alt="Latest Bookings" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
            >
              {console.log(item)}
              <img
                className="rounded-full w-10 bg-gray-200"
                src={item.userdata?.image || assets.user_icon}
                alt={item.userdata?.name || "User"}
              />
          
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">
                  {item.userdata.name}
                </p>
                <p className="text-gray-600">
                  {item.slotDate} | {item.slotTime}
                </p>
              </div>

              {item.cancelled ? (
                <p className="text-red-500 font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-semibold">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
