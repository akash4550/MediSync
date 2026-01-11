import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Exporting the context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appoinments, setAppoinments] = useState([]);
  const [dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvaibility = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-avability`,
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppoinments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/appoinments`,
        { headers: { aToken } }
      );
      if (data.success) {
        setAppoinments(data.appoinments);
        console.log(data.appoinments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getdashData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard`,
        { headers: { aToken } }
      );
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const cancelAppoinment = async (appoinmentId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/cancel-appoinment`,
      { appoinmentId },
      { headers: { aToken } }
    );

    if (data.success) {
      toast.success("Appointment cancelled");
      getAllAppoinments(); // refresh list
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const confirmAppoinment = async (appoinmentId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/confirm-appoinment`,
      { appoinmentId },
      { headers: { aToken } }
    );

    if (data.success) {
      toast.success("Appointment confirmed");
      getAllAppoinments(); // refresh list
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvaibility,
    appoinments,
    setAppoinments,
    getAllAppoinments,
    dashData,
    setDashData,
    getdashData,
    confirmAppoinment,
    cancelAppoinment
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
