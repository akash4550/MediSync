import validator from "validator";
import bcrypt from "bcrypt";
//import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appoinmentModel from "../models/appoinmentModel.js";
import userModel from "../models/userModel.js";

//api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !address ||
      !fees
    ) {
      res.json({ success: false, message: "Missing Details" });
    }

    //validating email format

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Enter valid email" });
    }

    //validating strong password
    if (password.length < 8) {
      res.json({ success: false, message: "Enter a strong password" });
    }

    //hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    // const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    // const imageUrl = imageUpload.secure_url

    const doctorData = {
      name,
      email,
      image: imageFile,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    //create new doctor model
    const newDoctor = new doctorModel(doctorData);
    //save data in database
    await newDoctor.save();

    return res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get all appoinments list
const appoinmentsAdmin = async (req, res) => {
  try {
    const appoinments = await appoinmentModel
      .find({})
      .populate({
        path: "userId",
        select: "-password", // exclude password if you want
      })
      .populate({
        path: "docId",
        select: "-password",
      }); // docData

    // Rename fields to match frontend expectations
    const formatted = appoinments.map((app) => ({
      ...app._doc,
      userdata: app.userId, // now contains all user info
      docData: app.docId,
    }));

    res.json({ success: true, appoinments: formatted });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for appoinment cancellation

const cancelAppoinment = async (req, res) => {
  try {
    const { appoinmentId } = req.body;

    const updated = await appoinmentModel.findByIdAndUpdate(appoinmentId, {
      cancelled: true,
    });

    if (!updated) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    return res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for appoinment confirmation

const confirmAppoinment = async (req, res) => {
  try {
    const { appoinmentId } = req.body;

    const updated = await appoinmentModel.findByIdAndUpdate(appoinmentId, {
      isComplete: true,
    });

    if (!updated) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    return res.json({ success: true, message: "Appointment confirmed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get dashboard data for admin panel
const adminDashBoard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appoinments = await appoinmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appoinments: appoinments.length,
      patients: users.length,
      latestAppoinments: appoinments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appoinmentsAdmin,
  adminDashBoard,
  cancelAppoinment,
  confirmAppoinment,
};
