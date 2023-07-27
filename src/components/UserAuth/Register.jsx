/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import Countries from "../../assets/countrybyname.json";
import Input from "../Layouts/Input";
import { openModal } from "../../hooks/modalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../hooks/CurrentUserSlice";
import ErrorContainer from "./ErrorContainer";

export default function RegisterModal() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Nuevo estado para almacenar el mensaje de error
  const handleCloseError = () => {
    setError(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      birthDay: "",
      country: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
      documentId: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}users/newuser`, data)
      .then((response) => {
        const responseData = response.data; // Obtiene el objeto completo de la respuesta
        toast.success(responseData.message); // Muestra el mensaje de éxito o error utilizando solo la propiedad "message"
        console.log("Toast.success executed");
        console.log(responseData);
        console.log(responseData.message);
        dispatch(getCurrentUser(responseData));
        reset();
        dispatch(openModal())
      })
      .catch((error) => {
        // Verificar si el objeto de respuesta tiene una propiedad 'message' con el mensaje de error
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
    <div className="flex items-center justify-center min-h-screen bg-white-100  ">
      <div className="w-[27rem] bg-white rounded-[40px] shadow-lg p-10">
        <div className="text-center text-2xl font-Lato text-[#6528bd] mb-4 ">
          Complete los siguientes datos
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-4 ">
            <div>
              <label htmlFor="firstName" className="font-Lato text-[#6528bd] ">
                Nombre
              </label>
              <Input
                type="text"
                id="firstName"
                className="w-full p-2 border border-[#6528bd] rounded-lg"
                placeholder="Nombre"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
                minLength={2}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">El nombre es requerido.</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="font-Lato text-[#6528bd]">
                Apellido
              </label>
              <Input
                type="text"
                id="lastName"
                className="w-full p-2 border border-[#6528bd] rounded-lg"
                placeholder="Apellido"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
                minLength={2}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  El Apellido es requerido.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="birthDay" className="font-Lato text-[#6528bd]">
                Fecha de Nacimiento
              </label>
              <Input
                type="date"
                id="birthDay"
                className="w-full p-2 border border-[#6528bd] rounded-lg"
                placeholder="Fecha de Nacimiento"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
              />
              {errors.birthDay && (
                <p className="text-red-500 text-sm">
                  La Fecha de Nacimiento es requerido.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="font-Lato text-[#6528bd]">
                Teléfono
              </label>
              <Input
                type="text"
                id="phone"
                className="w-full p-2 border border-[#6528bd] rounded-lg"
                placeholder="Teléfono"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  El Teléfono es requerido.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="documentId" className="font-Lato text-[#6528bd]">
                Documento
              </label>
              <Input
                type="text"
                id="documentId"
                className="w-full p-2 border border-[#6528bd] rounded-lg"
                placeholder="Documento"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
              />
              {errors.documentId && (
                <p className="text-red-500 text-sm">
                  El Documento es requerido.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="country" className="font-Lato text-[#6528bd]">
                Pais
              </label>
              <select
                id="country"
                {...register("country")}
                placeholder="Country"
                register={register}
                disabled={isLoading}
                errors={errors}
                className="block w-full mt-1 p-2 border-[#6528bd] rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                {errors.country && (
                  <p className="text-red-500 text-sm">El Pais es requerido.</p>
                )}
                {Countries.map((c) => (
                  <option key={c.key}>{c.country}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="Email" className="font-Lato text-[#6528bd]">
                Email
              </label>
              <Input
                type="email"
                id="email"
                className="w-full p-2 border border-[#6528bd] rounded-lg"
                placeholder="Email"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">El Email es requerido.</p>
              )}
            </div>
            <div>
              <label htmlFor="Password" className="font-Lato text-[#6528bd]">
                Contraseña
              </label>
              <Input
                type="password"
                id="password"
                className="w-full p-2 border border-[#6528bd] rounded-lg"
                placeholder="Password"
                register={register}
                disabled={isLoading}
                errors={errors}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {" "}
                  La Contraseña es requerida.
                </p>
              )}
            </div>
            {/* Más campos de formulario... */}
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full px-4 py-4 rounded-lg bg-[#6528bd] text-white hover:text-[#6528bd] hover:bg-teal-400 focus:outline-none focus:bg-teal-300 "
          >
            Registrarse
          </button>
          <div className="flex flex-row gap-2 items-center ml-12 mr-8">
        <div className="whitespace-nowrap text-xl font-['Lato'] leading-[26px] text-black/85 w-3/5">
          Ya tienes una cuenta?<div className="contents"> </div>
        </div>
        <br/>
        <button
          className="text-xl font-['Lato'] font-semibold leading-[28.6px] text-[#6528bd] w-[108px] shrink-0 h-[88.46%]"
          onClick={() => dispatch(openModal())}
        >
           Inicia sesión
        </button>
      </div>
        </form>
        {error && (
          <ErrorContainer errorMessage={error} onClose={handleCloseError} />
        )}
      </div>
    </div>
  );
}
