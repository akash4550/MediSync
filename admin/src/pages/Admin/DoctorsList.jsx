import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/admin/assets";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvaibility } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="max-h-[90vh] overflow-y-auto p-4">
      <h1 className="text-xl font-semibold mb-4">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              className="border border-indigo-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition duration-300"
              key={item._id || index}
            >
              {/* ✅ FIX: Corrected image rendering logic */}
              <img
                className="w-full h-36 object-contain bg-indigo-50 rounded-md mb-3"
                src={item.image || assets.doctor_icon}
                alt={item.name || "Doctor"}
                onError={(e) => (e.target.src = assets.doctor_icon)} // fallback if image fails
              />

              <div>
                <p className="text-neutral-800 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-600 text-sm mb-2">
                  {item.speciality}
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvaibility(item._id)}
                    className="accent-indigo-600 cursor-pointer"
                  />
                  <label>Available</label>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
