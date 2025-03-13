import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateUser.css";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const navigate=useNavigate();
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    
    if (!name.trim()){
       newErrors.name = "Full name is required";
    }
    if (!mail.trim()) {
      newErrors.mail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(mail)) {
      newErrors.mail = "Enter a valid email";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(phone)) {
      newErrors.phone = "Phone number should be 10 digits";
    }
    else if(phone.length>10){
      newErrors.phone="Phone number should exist 10 digits";
    }
    if (!age.trim()){
      newErrors.age = "Age is required";
   }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const Submit =async (e) => {
    e.preventDefault();
    if (validateForm()) {
     await axios
        .post("http://localhost:3001/createuser", {name, mail, phone ,age})
        .then((result) => {
          console.log(result);
          alert("User added successfully!");
          setName("");
          setMail("");
          setPhone("");
          setAge("");
          setErrors({});
        })
        navigate('/')
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <div className="min-w-120 min-h-100 rounded-lg shadow-2xl p-4 border-2 border-green-200 bg-white">
        <h2 className="p-3 text-2xl font-bold text-green-400">Add User Information</h2>
        <form className="p-3" onSubmit={Submit}>
         
          <div className="form-field">
            <input type="text" id="fullname" placeholder="Enter fullname" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="form-field">
            <input type="email" id="mail" placeholder="Enter email" value={mail} onChange={(e) => setMail(e.target.value)} />
            {errors.mail && <p className="text-red-500">{errors.mail}</p>}
          </div>
          <div className="form-field">
            <input type="tel" id="phone" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div className="form-field">
            <input type="text" id="age" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>
          <div className="form-field button flex justify-between">
            <Link className="p-2 bg-red-500 text-white w-25 cursor-pointer shadow-lg shadow-neutral-300 text-center rounded-md" to="/">
              Back
            </Link>
            <button type="submit" className="p-2 bg-green-500 shadow-lg shadow-neutral-300 text-white w-25  cursor-pointer rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
