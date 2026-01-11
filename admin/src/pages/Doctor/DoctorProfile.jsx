import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/profile/update`,
        {
          docId: profileData._id,
          address: profileData.address,
          fees: profileData.fees,
          available: profileData.available,
        },
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  if (!profileData) return null;

  return (
    <div className="m-5 flex flex-col gap-4">
      <img
        className="bg-primary w-full sm:max-w-64 rounded-lg"
        src={
          profileData.image ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt={profileData.name || "Doctor"}
      />

      <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
        <p className="text-3xl font-medium text-gray-700">{profileData.name}</p>
        <div className="flex items-center gap-2 mt-1 text-gray-600">
          <p>
            {profileData.degree} - {profileData.speciality}
          </p>
          <button className="py-0.5 px-2 border text-xs rounded-full">
            {profileData.experience}
          </button>
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-neutral-800">About:</p>
          <p className="text-sm text-gray-600 max-w-[700px] mt-1">
            {profileData.about}
          </p>
        </div>

        <p className="text-gray-600 font-medium mt-4">
          Appointment fee:{" "}
          <span className="text-gray-800">
            {currency}{" "}
            {isEdit ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
              />
            ) : (
              profileData.fees
            )}
          </span>
        </p>

        <div className="flex gap-2 py-2">
          <p>Address: </p>
          <p className="text-sm">
            {isEdit ? (
              <input
                type="text"
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
            ) : (
              profileData.address.line1
            )}
            <br />
            {isEdit ? (
              <input
                type="text"
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            ) : (
              profileData.address.line2
            )}
          </p>
        </div>

        <div className="flex items-center gap-1 pt-2">
          <input
            type="checkbox"
            checked={profileData.available}
            onChange={() =>
              isEdit &&
              setProfileData((prev) => ({
                ...prev,
                available: !prev.available,
              }))
            }
          />
          <label>Available</label>
        </div>

        <button
          onClick={isEdit ? updateProfile : () => setIsEdit(true)}
          className="px-4 py-1 border border-primary bg-blue-500 text-white text-sm rounded-full mt-5 cursor-pointer hover:bg-primary transition-all"
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
