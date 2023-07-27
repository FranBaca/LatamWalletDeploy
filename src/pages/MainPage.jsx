import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsCoin } from "react-icons/bs"
import { Link } from 'react-router-dom'
import UserAuth from './UserAuth'
import {TbTransitionRight} from "react-icons/tb"
import axios from 'axios'


export default function MainPage() {
  const { user } = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([])

  useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}transactions/get-transactions-limit/3 `, {
            headers: {
              "Content-Type": "application/json",
              Authorization: user?.payload?.token,
            },
          },
        )
        .then((response) => {
          console.log(response.data)   
          setTransactions(response.data)
        })
        .catch((error) => {
            console.log("transactions went wrong...")
      
        })

  },[user?.payload?.token])

  return (
    user ? (
      <>
      <div className="w-screen px-6 py-4 mt-[85px] overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
        <div className="text-purple-600">
          <div className='flex flex-col items-center'>
          <BsCoin size={"30px"} />
            <h1 className='font-medium text-3xl'>Balance Total</h1>
            <span className='font-light text-2xl' >${user.payload.balance} USDT</span>
          </div>
        
          <div className="flex flex-row justify-around mt-10">
            <Link to="/transactions" className="flex flex-col items-center">
              <div className="rounded-full bg-[#00FFCB] w-[60px] h-[60px] flex flex-col items-center justify-center">
                <img src="images/enviar.svg" className="w-[40px]" alt="Enviar" />
              </div>
              <span className="font-medium">Enviar</span>
            </Link>
            <Link to="/receive" className="flex flex-col items-center">
              <div className="rounded-full bg-[#00FFCB] w-[60px] h-[60px] flex flex-col items-center justify-center">
                <img src="images/recibir.svg" className="w-[40px]" alt="Enviar" />
              </div>
              <span className="font-medium">Recibir</span>
            </Link>
            <Link to="/Payment" className="flex flex-col items-center">
              <div className="rounded-full bg-[#00FFCB] w-[60px] h-[60px] flex flex-col items-center justify-center">
                <img src="images/compra.svg" className="w-[40px]" alt="Enviar" />
              </div>
              <span className="font-medium">Compra</span>
            </Link>
          </div>
          
        </div>
      </div>
      <div>
      <div>
        <div className='bg-[#6528BD] mt-[310px] w-screen py-6 lg:py-8 text-white shadow-sm p-2 '>
          <div className='flex flex-row flex-start justify-center items-center m-1'>
          <h2 class="text-xl font-semibold mb-2">Historial de transacciones</h2>
          </div>
				
          {transactions.map((transaction)=> (
				<div class="flex flex-row justify-around p-5 bg-[#6528BD] rounded-md">
          
            <p class="text-md">{transaction.toEmail ? transaction.toEmail : transaction.type}</p>
            <TbTransitionRight size={"1em"} className='m-2'/> 
            <div class="flex space-x-2">
              <p class="text-lg">${transaction.amount} USDT</p>
              <div class="flex space-x-1">
              </div>
            </div>
          </div>
          ))}
          </div>
          </div>
      </div>
      </>
    ) : (
      <UserAuth />
    )
  );
}
