import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Components/Home'
import CreateUser from './Components/CreateUser'
import UpdateUser from './Components/UpdateUser'
import "./App.css"
const App = () => {
  return (
    <div className='crud-container'>
      <div className='content'>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/createuser' element={<CreateUser/>}></Route>
        <Route path='/updateuser/:id' element={<UpdateUser/>}></Route>
      </Routes>
    </Router>
    </div>
    </div>
  )
}

export default App