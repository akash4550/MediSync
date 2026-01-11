import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appoinmentModel.js";
import userModel from "../models/userModel.js"

// Change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    if (!docData) return res.json({ success: false, message: "Doctor not found" });

    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get list of all doctors (for user or admin)
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) return res.json({ success: false, message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid Credentials" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get doctor appointments
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    // ✅ Populate user data (name, image, dob)
    const appointments = await appointmentModel
      .find({ docId })
      .populate("userId", "name image dob");

    // ✅ Format response with `userData`
    const formattedAppointments = appointments.map((app) => ({
      ...app._doc,
      userData: app.userId,
    }));

    res.json({ success: true, appointments: formattedAppointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.docId.toString() !== docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
    res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.docId.toString() !== docId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Doctor dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    let patientsSet = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted) earnings += item.amount;
      patientsSet.add(item.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientsSet.size,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    console.log("Update request body:", req.body); 
    const { docId, fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
