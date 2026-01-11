import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // ✅ Fetch all appointments for doctor

  const getAppointments = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/appointments`,
        {},
        { headers: { dtoken: dToken } }
      );
      if (data.success) setAppointments(data.appointments);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Complete appointment
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/appointment/complete`,
        { appointmentId }, // no docId
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);

        // Update local state immediately
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId ? { ...item, isCompleted: true } : item
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/appointment/cancel`,
        { appointmentId }, // no docId
        { headers: { dtoken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);

        // Update local state immediately
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId ? { ...item, cancelled: true } : item
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Get dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dtoken: dToken },
      });

      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Get doctor profile data
  const getProfileData = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/profile`,
        {},
        { headers: { dtoken: dToken } }
      );
      if (data.success) setProfileData(data.profileData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProfile = async () => {
    try {
      const updateData = {
        docId: profileData._id, // ✅ include doctor ID
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dtoken: dToken } } // must match backend header
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

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    updateProfile,
    calculateAge,
    completeAppointment,
    cancelAppointment,
    setProfileData,
    dashData,
    getDashData,
    profileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
