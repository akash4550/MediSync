import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppoinments = () => {
  const {
    aToken,
    appoinments,
    getAllAppoinments,
    cancelAppoinment,
    confirmAppoinment,
  } = useContext(AdminContext);
  const { calulateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    getAllAppoinments().catch((error) =>
      console.error("Error fetching appointments:", error)
    );
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
        {/* Header row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Data rows */}
        {appoinments.map((item, index) => (
          <div
            key={item._id || index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-100"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
             
              <img
                className="w-8 h-8 rounded-full object-cover border"
                src={
                  item.userdata?.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="patient"
              />
              
              <div>
                <p className="font-medium">{item.userdata?.name || "Unknown"}</p>
                <p className="text-xs text-gray-500">{item.userdata?.email}</p>
              </div>
            </div>

            <p className="max-sm:hidden">
              {item.age || calulateAge?.(item.userdata?.dob) || "-"}
            </p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <p>{item.name || "—"}</p>
            <p>₹{item.amount || item.fees}</p>

            {/* Actions */}
            <div className="flex flex-col gap-1 text-center">
              {!item.cancelled && !item.isComplete && !item.isCompleted && (
                <>
                  <button
                    onClick={() => confirmAppoinment(item._id)}
                    className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs hover:bg-green-200"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this appointment?"
                        )
                      ) {
                        cancelAppoinment(item._id);
                      }
                    }}
                    className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200"
                  >
                    Cancel
                  </button>
                </>
              )}
              {(item.cancelled || item.isCancelled) && (
                <span className="text-sm text-red-500 font-semibold text-center">
                  Appointment Cancelled
                </span>
              )}
              {(item.isComplete || item.isCompleted) && (
                <span className="text-sm text-green-600 font-semibold text-center">
                  Appointment Confirmed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppoinments;
