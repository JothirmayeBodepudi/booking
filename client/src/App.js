import React from "react";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom';
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/home/Home";
import GardenView from "./components/Booking/Gerdenview";
import LakeView from "./components/Booking/LakeView";
import OceanView from "./components/Booking/OceanView";
import ForgetPassword from "./components/ForgetPassword";
 import Checkout from "./components/RBookings/Checkout";
import FeedbackForm from "./components/FeedbackForm";
import About from "./components/About";
import Admin from "./components/admin/Admin"; 
import AdminHome from "./components/admin/AdminHome";
import AddRoom from "./components/admin/AddRoom";
import FetchRegistrations from "./components/admin/FetchRegistration";
// import Navbar from "./components/Navbar";
import PaymentPage from "./components/RBookings/PaymentPage";
import MapComponent from "./components/MapComponent";



function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/GardenView" element={<GardenView/>} />
          <Route path="/LakeView" element={<LakeView/>} />
          <Route path="/OceanView" element={<OceanView/>} />
          <Route path="/ForgetPassword" element={<ForgetPassword/>} />
          <Route path="/Checkout" element={<Checkout/>} />
          <Route path="/FeedbackForm" element={<FeedbackForm/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/AdminHome" element={<AdminHome/>} /> 
          <Route path="/Admin/AddRoom" element={<AddRoom/>} />
          <Route path="/Admin/FetchRegistrations" element={<FetchRegistrations/>}/>
          {/* <Route path="/Navbar" element={<Navbar/>} /> */}
          <Route path="/RBookings/PaymentPage" element={<PaymentPage/>} />
          <Route path="/MapComponent" element={<MapComponent/>}/>
          
        
        
    
        
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
