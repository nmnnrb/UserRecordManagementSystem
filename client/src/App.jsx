import { ToastContainer } from "react-toastify"
import Login from "./pages/Login"
import {Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import CreateUser from "./pages/CreateUser"
import UpdateUser from "./pages/UpdateUser"



function App() {


  return (
   <div className="h-screen w-screen">
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/create' element={<CreateUser/>} />
      <Route path='/edit/:id' element={<UpdateUser/>} />
      </Routes>
   </div>
  )
}

export default App
