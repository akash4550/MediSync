import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const RelatedDoctors = ({ speciality }) => {
  const { doctors } = useContext(AppContext);
  const { docId } = useParams(); // Get the doctor ID from the URL
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality && docId) {
      const filteredDoctors = doctors.filter(
        (doc) => doc.speciality === speciality && String(doc._id) !== String(docId)
      );
      setRelDoc(filteredDoctors);
    }
  }, [doctors, speciality, docId]); // Depend on docId to update list when it changes

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full md:mx-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item) => (
          <div
            key={item._id}
           onClick={() => navigate(`/appoinment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
          >
            <img className="bg-blue-50 object-cover w-full md:h-56" src={item.image} alt="doctor" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition-all cursor-pointer"
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
