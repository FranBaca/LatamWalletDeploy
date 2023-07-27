import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import UserAuth from "./pages/UserAuth";
import Payment from "./components/Stripe/Payment";
import Transaction from "./pages/Transaction"
import Profile from "./pages/Profile";
import ReceivePayment from "./pages/ReceivePayment";

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
        <Toaster />
      <div className="flex flex-col items-center justify-center">      
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="main" element={<MainPage />} />
        <Route path="payment" element={<Payment/>}/>
        <Route path="transactions" element={<Transaction/>}/>
        <Route path="receive" element={<ReceivePayment/>}/>
        <Route path="userProfile" element={<Profile />}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
