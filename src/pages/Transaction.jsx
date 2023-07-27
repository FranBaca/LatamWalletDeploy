import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../components/Layouts/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Heading from '../components/Layouts/Heading';
import ErrorContainer from '../components/UserAuth/ErrorContainer';
import UserAuth from './UserAuth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Transaction () {
    const { user } = useSelector((state) => state.user);
    const [isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        defaultValues: {
          amount: Number,
          email: "",
        },
      });

      const handleCloseError = () => {
        setError(null);
      };

      const onSubmit = (data) => {
        setIsLoading(true);
        console.log(data);
        axios.post(`${process.env.REACT_APP_API_URL}transactions/transfer-amount-by-email`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: user?.payload?.token,
            },
          },
        )
        .then((response) => {   
            const responseData = response.data; // Obtiene el objeto completo de la respuesta
            toast.success(responseData.message); // Muestra el mensaje de éxito o error utilizando solo la propiedad "message"
            reset()
        })
        .catch((error) => {
          const errorMessage =
          error.response && error.response.data && error.response.data.message;

        // Si hay un mensaje de error, establecerlo en el estado para mostrarlo en ErrorContainer
          setError(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
      };
    
  return (
    user ? (
    <div class="flex h-screen w-full items-center justify-center">
    <form onSubmit={handleSubmit(onSubmit)}>
  <div class="mx-auto box-border w-[365px] border bg-white p-4 rounded-lg">
    <div class="flex items-center justify-between">
      <Heading title="Transferir Dinero" center />
    </div>

    <div class="mt-6">
      <div class="font-semibold">Cantidad</div>
      <div> 
            <Input
                type={"number"}
                id={"amount"}
                register={register}
                disabled={isLoading}
                errors={errors}
                number={true}
                placeholder={"Cuanto dinero deseas enviar?"}
            />
        </div>
    </div>
    <div class="mt-5">
      <div class="flex justify-between">
        <span class="font-semibold text-gray-800">Receptor</span>
      </div>
        <div>   
            <Input
                type={"email"}
                id={"email"}
                register={register}
                disabled={isLoading}
                errors={errors}
                placeholder={"Ingresa el email del receptor del dinero"}
            />
      </div>
    </div>
    <div class="mt-6">
      <button onClick={handleSubmit(onSubmit)} class="w-full cursor-pointer rounded-[4px] bg-purple-600 text-[#00FFCB] px-3 py-[6px] text-center font-semibold">{isLoading ?<LoadingSpinner/> : "Enviar"}</button>
    </div>
  </div>
  {error && (
        <ErrorContainer errorMessage={error} onClose={handleCloseError} />
      )}
  </form>
</div>
    ): <UserAuth />
  )
}
