import React,{ useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/admin/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge,  currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <h1 className="mb-3 text-lg font-medium">All Appointments</h1>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll border-gray-300">
        {/* Header row */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr] gap-1 py-3 px-6 border-b border-gray-300 font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* Appointment rows */}
        {appointments.slice().reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-2">
           
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={item.userdata.image ||  "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={item.userData.name}
              />
              <p>{item.userdata.name}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob) || "-" }  </p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <p>
              {currency} {item.amount}
            </p>

            {/* Actions */}
            {item.cancelled ? (
              <p className="text-red-500 font-semibold">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 font-semibold">Confirmed</p>
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
  );
};

export default DoctorAppointments;
