import React, { useContext, useState } from "react";
import { assets } from "../../assets/admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";


const AddDoctor = () => {
  const inputStyle = "border rounded px-3 py-2";
  const containerStyle = "flex flex-col md:flex-row gap-6";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const {backendUrl , aToken} = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData()
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append("speciality", speciality);
      formData.append('fees',fees)
      formData.append('about',about)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
      formData.append("date", Date.now());

      //console.log  formdata
      formData.forEach((value,key) =>{
        console.log(`${key} : ${value}`)
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers : {aToken}})
      
      if(data.success){
        toast.success(data.message)
        setName('')
        setEmail('')
        setPassword('')
        setDegree('')
        setSpeciality('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setExperience('')
        setFees('')
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll scrollbar-hide">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 bg-gray-100 rounded-full"
              src={assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            name="doctorImage"
            className="hidden"
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col gap-6 text-gray-600">
          {/* Name & Email */}
          <div className={containerStyle}>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="name">Doctor Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
                className={inputStyle}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="email">Doctor Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className={inputStyle}
              />
            </div>
          </div>

          {/*Password & Experience */}
          <div className={containerStyle}>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="password">Doctor Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                className={inputStyle}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="experience">Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                id="experience"
                name="experience"
                required
                className="border rounded px-3 py-2"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}`}>{`${i + 1} year${
                    i + 1 > 1 ? "s" : ""
                  }`}</option>
                ))}
              </select>
            </div>
          </div>

          {/*  Fees & Speciality */}
          <div className={containerStyle}>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="fees">Fees</label>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                type="number"
                id="fees"
                name="fees"
                placeholder="Fees"
                required
                className={inputStyle}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="speciality">Speciality</label>
              <select
                 value={speciality}
                 onChange={(e) => setSpeciality(e.target.value)}
                id="speciality"
                name="speciality"
                required
                className="border rounded px-3 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
          </div>

          {/* Education & Address Line 1 */}
          <div className={containerStyle}>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="education">Degree</label>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                type="text"
                id="education"
                name="education"
                placeholder="degree"
                required
                className={inputStyle}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="address1">Address</label>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                type="text"
                id="address1"
                name="address1"
                placeholder="Address 1"
                required
                className={inputStyle}
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                type="text"
                id="address2"
                name="address2"
                placeholder="Address 2"
                required
                className={inputStyle}
              />
            </div>
          </div>

          {/* About Doctor */}
          <div className="flex flex-col gap-1">
            <label htmlFor="about">About Doctor</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              id="about"
              name="about"
              placeholder="About Doctor"
              rows={5}
              required
              className={inputStyle}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 px-6 py-2 w-36 cursor-pointer rounded-lg bg-[#5f6FFF] text-white hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
