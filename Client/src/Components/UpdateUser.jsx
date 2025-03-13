import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./CreateUser.css";

const CreateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        console.log(result);
        setName(result.data.name);
        setMail(result.data.mail);
        setPhone(result.data.phone);
        setAge(result.data.age);
      })
      .catch(err => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateUser/${id}`, { name, mail, phone, age })
      .then((result) => {
        console.log(result);
        alert("User updated successfully!");
        navigate("/");  
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container'>
      <div className='min-w-120 min-h-100 rounded-lg shadow-2xl p-4 border-2 border-green-200 bg-white'>
        <h2 className='p-3 text-2xl font-bold text-green-400'>Update User Information</h2>
        <form onSubmit={Update} className='p-3'>
          <div className="form-field">
            <input type="text" placeholder='Update fullname' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-field">
            <input type="email" placeholder='Update email' value={mail} onChange={(e) => setMail(e.target.value)} />
          </div>
          <div className="form-field">
            <input type="tel" placeholder='Update phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-field">
            <input type="text" placeholder='Update age' value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="form-field button flex justify-between">
            <Link className='p-2 bg-red-500 text-white w-25 cursor-pointer text-center rounded-md shadow-md shadow-neutral-400' to="/">Back</Link>
            <button type="submit" className='p-2 bg-green-500 text-white w-25 cursor-pointer rounded-md shadow-md shadow-neutral-400'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
