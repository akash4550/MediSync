import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import appoimnetImg from "../assets/appoimnet.jpg";

const MyAppoinment = () => {
  //use context hook
  const { backendUrl, token } = useContext(AppContext);
  //state to store appoinments in an array
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  //function to get users appoinments
  const getUserAppointments = async () => {
    try {
      //check for authrized users
      const { data } = await axios.get(`${backendUrl}/api/user/appoinments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //if user is authorized
      if (data.success) {
        setAppointments(data.appoinments.reverse());
      }
      //if user is not authorized then show error
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong while fetching appointments."
      );
    }
  };

  // intialize payment and set razor pay
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appoiment payment",
      description: "Apppoinment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorPay",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appoinments");
          }
        } catch (error) {
          console.error(error);
          toast.error(
            error.message || "Something went wrong while fetching appointments."
          );
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  //to handle payment by razorpay
  const appoimentRazorpay = async (appoinmentId) => {
    //payment authorizztaion
    try {
      const { data } = await axios.post(
        backendUrl + `/api/user/payment-razorpay`,
        { appoinmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //if authorized then intilize payment
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message || "Failed to create Razorpay order.");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // Function to combine date and time and return a valid Date object
  const formatDateTime = (slotDate, slotTime) => {
    if (!slotDate || !slotTime) return "Invalid date/time";

    // Extract day, month, and year from slotDate
    const [day, month, year] = slotDate.split("-");

    // Combine the slotDate with slotTime to form a full string (e.g., "2025-04-25 10:00 AM")
    const fullDateString = `${year}-${month}-${day} ${slotTime}`;

    // Create a Date object from the full date string
    const formattedDate = new Date(fullDateString);

    return formattedDate.toLocaleString("en-US", {
      weekday: "long", // Day of the week (e.g., Monday)
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const cancelAppoinment = async (appoinmentId) => {
    try {
      const response = await axios.post(
        backendUrl + `/api/user/cancel-appoinment`,
        { appoinmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Appointment cancelled successfully.");
        // Update appointments state to mark this appointment as cancelled
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appoinmentId ? { ...item, cancelled: true } : item
          )
        );
      } else {
        toast.error("Failed to cancel appointment.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong while cancelling appointment."
      );
    }
  };

  return (
    <div className="mx-20">
      {/* heading */}
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {/* only show top 3 appoinments */}
        {appointments.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            {/* appoinment data */}
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={appoimnetImg}
                alt={item.name}
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.speciality}</p>

              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">
                {item.docData?.address?.line1 || "No address provided"}
              </p>
              <p className="text-xs">
                {item.docData?.address?.line2 || "No address provided"}
              </p>

              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {/* Format and display date/time */}
                {/* if slot has already booked by someone */}
                {item.slotDate && item.slotTime ? (
                  <>{formatDateTime(item.slotDate, item.slotTime)}</>
                ) : (
                  <span>No date available</span>
                )}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-end">
              {item.cancelled && !item.isCompleted && (
                <span className="text-red-600 font-bold text-lg">
                  Appointment Cancelled
                </span>
              )}

              {/* If appointment is completed */}
              {item.isCompleted && (
                <span className="text-green-600 font-bold text-lg">
                  Completed
                </span>
              )}

              {/* If appointment is neither cancelled nor completed */}
              {!item.cancelled && !item.isCompleted && (
                <>
                  <button
                    onClick={() => appoimentRazorpay(item._id)}
                    className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                  <button
                    onClick={() => cancelAppoinment(item._id)}
                    className="text-sm text-stone-500 sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppoinment;
