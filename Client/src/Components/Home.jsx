import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "./Home.css"
import axios from 'axios'


const Home = () => {
 const [users,setUsers]=useState([])

 useEffect(()=>{
  axios.get('http://localhost:3001')
  .then(result=>setUsers(result.data))
  .catch(err=>console.log(err))
 },[])

 
 const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        alert("User deleted successfully!");
        window.location.reload();
      })
      .catch(err => console.log(err));
  }
};


  return (
    <div className='container w-full'>
     
      <div className='relative min-w-170 min-h-100  rounded-lg bg-white shadow-2xl shadow-neutral-300 border-sky-100 border-2 p-4'>
      
      <div className='title relative'><h2 className='text-2xl font-semibold text-blue-900'>User Information</h2>
      <span className='title-line'></span>
      </div>
      <div className='mt-12'>
        <Link to="/createuser" className=' p-2 bg-black text-white shadow-md shadow-neutral-500 rounded-md hover:bg-green-400 transition duration-500'>Add Users +</Link>
      </div>
      <table className='w-full mt-7'>
        <thead>
          <tr className='bg-green-400 text-white'>
            <th>Fullname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        
          {
            users.map((users)=>{
           return <tr key={users.ID}>
              <td>{users.name}</td>
              <td>{users.mail}</td>
              <td>{users.phone}</td>
              <td>{users.age}</td>
              <td>
                <Link to={`/updateuser/${users._id}`} className='mr-2 py-2 px-6 bg-red-500 text-white rounded-md shadow-md shadow-neutral-300'>Update</Link>
                <button className='cursor-pointer py-2 px-6 bg-blue-500 text-white rounded-md shadow-md shadow-neutral-300' onClick={(e)=>handleDelete(users._id)}>Delete</button>
              </td>
            </tr>
            })
          }
        
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Home