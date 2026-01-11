import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appoinment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  //days of week
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  useEffect(() => {
    if (!doctors || doctors.length === 0) return; // wait for doctors to load

  const doc = doctors.find((d) => d._id === docId);
  console.log(docId)
  if (!doc) {
    console.log("Doc info not found for ID:", docId);
    return;
  }

  setDocInfo(doc);
  }, [doctors, docId]);

  useEffect(() => {
    if (!docInfo) return;
    setDocSlots([]); // Reset slots

    let today = new Date();
    let newSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);  // Set end time to 9 PM

      if (today.getDate() === currentDate.getDate()) {
        // For today, set the start time based on current time
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10)); // Ensures at least 10 AM
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);  // Start next available slot
      } else {
        // For other days, start at 10 AM
        currentDate.setHours(10, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Log the generated time and date for each slot
        

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment by 30 minutes for the next slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Log each day's slots
      

      newSlots.push(timeSlots);
    }


    setDocSlots(newSlots); // Set the new slots for the week
  }, [docInfo]);

  //function to book an appoinment
  const bookAppoinment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0 || !slotTime) {
    toast.error("Please select a valid date and time slot");
    return;
  }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

     const slotDate = `${day}-${month}-${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appoinment',
        { docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appoinments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    docInfo && (
      <div className="md:mx-20">
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img src={docInfo.image} alt="" className="bg-blue-400 w-full sm:max-w-72 rounded-lg" />
          </div>

          {/* doctor info display */}
          <div className="flex-1 border border-gray-400 p-8 py-7 rounded-lg bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-300'
                  }`}
                  key={index}
                  onClick={() => setSlotIndex(index)}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

            
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 && docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    slotTime === item.time ? 'bg-blue-500 text-white' : 'border border-gray-300'
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
            
            {/* button to book an appoinment */}
          <button onClick={bookAppoinment} className="bg-blue-500 cursor-pointer text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book an Appointment
          </button>
        </div>

        {/*listing related doctors*/}
        <div>
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appoinment;
