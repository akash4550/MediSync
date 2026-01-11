import express from "express";
//import controllers functions
import {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

//create router
const doctorRouter = express.Router();

// Public
doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);

// Protected routes (require dToken)
doctorRouter.post("/change-availability", authDoctor, changeAvailability);
doctorRouter.post("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/appointment/complete", authDoctor, appointmentComplete);
doctorRouter.post("/appointment/cancel", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.post("/profile", authDoctor, doctorProfile);
doctorRouter.post("/profile/update", authDoctor, updateDoctorProfile);

export default doctorRouter;
