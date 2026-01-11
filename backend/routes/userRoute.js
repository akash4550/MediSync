import express from 'express';
//import controller functions
import { registerUser,loginUser,getUserAppointments, bookAppoinment, getProfile, listAppoinments, cancelAppoinment,confirmAppoinment,paymentRazorpay, verifyRazorPay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';


const userRouter = express.Router();

// userRouter.use((req, res, next) => {
//   console.log("User router hit:", req.method, req.url);
//   next();
// });

// Route to register a user
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser,getProfile)

//userRouter.post('/update-profile',authUser, updateProfile)

//routes for appoinment handling
userRouter.post('/book-appoinment',authUser,bookAppoinment)
userRouter.post("/appointments", authUser, getUserAppointments);

userRouter.get('/appoinments',authUser,listAppoinments)
userRouter.post('/cancel-appoinment',authUser,cancelAppoinment)
userRouter.post('/confirm-appoinment', authUser, confirmAppoinment);  

//routes for payment handling
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorPay',authUser,verifyRazorPay)


export default userRouter;
