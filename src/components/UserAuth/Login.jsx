import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../Layouts/Input";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../hooks/CurrentUserSlice";
import { closeModal } from "../../hooks/modalSlice";
import { useNavigate } from "react-router-dom";
import ErrorContainer from "./ErrorContainer";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}login`, data)
      .then((response) => {
        const responseData = response.data; // Obtiene el objeto completo de la respuesta
        toast.success(responseData.message); // Muestra el mensaje de éxito o error utilizando solo la propiedad "message"
        dispatch(getCurrentUser(responseData)); // Actualiza el estado del usuario
        reset();
        navigate("/main");
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

  const auth = getAuth();
  const loginGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      axios
        .post(`${process.env.REACT_APP_API_URL}google/google`, {
          email: user.email,
          loginGoogle: user.uid,
        })
        .then((response) => {
          const responseData = response.data;
          if (responseData.containErrors) {
            // Si la respuesta contiene errores, establecer el mensaje de error en el estado
            setError(responseData.message);
          } else {
            // Si la respuesta es exitosa, mostrar el mensaje de éxito y realizar las acciones necesarias
            toast.success(responseData.message);
            console.log(responseData.message);
            dispatch(getCurrentUser(responseData));
            reset();
            navigate("/main");
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage =
            error.response &&
            error.response.data &&
            error.response.data.message;

          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          setError(errorMessage, errorCode, credential);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  return (
    <div className="overflow-hidden bg-white flex flex-col gap-20 w-full pt-3 pb-12 px-5 rounded-[40px] mt-40">
      <div className="flex flex-col ml-3 gap-3 items-start">
        <img alt=""
          src="https://file.rendit.io/n/nmlOSxeMZqtYSkZsbYkf.svg"
          className="min-h-0 min-w-0 mb-1 ml-24 mt-8"
        />
        <div className="self-stretch relative flex flex-col">
          <img alt=""
            src="https://file.rendit.io/n/ZpmfGNSoh4nDrXZIGkG5.svg"
            className="w-8 h-8 min-h-0 min-w-0 absolute top-[180px] left-[312px]"
          />
          <div className="border-solid w-6 h-6 absolute top-[235px] left-6 flex flex-col items-center border-black border rounded-sm">
            <img alt=""
              src="https://file.rendit.io/n/ha1LGvyn6wNJvnCUH1Pi.svg"
              className="min-h-0 min-w-0 w-6"
            />
          </div>
          <div className="text-sm font-['Lato'] font-medium leading-[19.5px] absolute top-[239px] left-16 h-5 w-20">
            Recordarme
          </div>
          <div className="whitespace-nowrap text-sm font-['Lato'] font-medium leading-[19.5px] absolute top-[239px] left-56 h-5 w-32">
            Olvido Contraseña?
          </div>
          <div className="overflow-hidden bg-white relative flex flex-col justify-between gap-12 pb-1 px-6">
            <div className="text-center text-4xl font-['Montserrat'] font-bold leading-[40px] text-[#6528bd]">
              Inicio
            </div>
            <div className="flex flex-col gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-solid border-[#6528bd] bg-white flex flex-row gap-3 h-12 shrink-0 items-center px-3 border-2 rounded-lg">
                  <img alt="alt"
                    src="https://file.rendit.io/n/Hp8IRWkhFNI8H9izwjmy.svg"
                    className="min-h-0 min-w-0 w-6 shrink-0"
                  />
                  <div className="text-xl font-['Montserrat'] font-medium leading-[20px] text-[#6528bd] w-64 ">
                    <Input
                      type="email"
                      id="email"
                      className="text-xl font-['Montserrat'] font-medium leading-[28px] text-[#6528bd] w-64  "
                      placeholder="Email"
                      register={register}
                      disabled={isLoading}
                      errors={errors}
                    />
                  </div>
                </div>
              </form>
              <div className="border-solid border-[#6528bd] bg-white flex flex-row gap-3 h-12 shrink-0 items-center px-3 border-2 rounded-lg">
                <img alt="alt"
                  src="https://file.rendit.io/n/ZOvi1BusR5aIoUdDoDBD.svg"
                  className="min-h-0 min-w-0 w-6 shrink-0"
                />
                <div className="text-xl font-['Montserrat'] font-medium leading-[20px] text-[#18191f] w-64">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      type="password"
                      id="password"
                      className="text-xl font-['Montserrat'] font-medium leading-[28px] text-[#18191f] w-64 outline-none"
                      placeholder="Password"
                      register={register}
                      disabled={isLoading}
                      errors={errors}
                    />
                  </form>
                </div>
              </div>
            </div>
            <button className="overflow-hidden bg-[#6528bd] flex flex-row justify-center gap-1 h-16 shrink-0 items-center rounded-lg">
              <div
                onClick={handleSubmit(onSubmit)}
                className="text-center text-xl font-['Montserrat'] font-bold leading-[28px] text-[#00ffcb] w-24 shrink-0"
              >
                Ingresar
              </div>
              <img alt="alt"
                src="https://file.rendit.io/n/vusQpl2wJZEkhJFhHnee.svg"
                className="min-h-0 min-w-0 w-6 shrink-0"
              />
            </button>
          </div>
        </div>
        <div className="whitespace-nowrap font-['Lato'] leading-[20.8px] w-20 mb-px ml-[141px]">
          Ingrese con
          {"  "}
        </div>
        <div className="self-center flex flex-row gap-6 items-center">
          <button onClick={loginGoogle}>
            <img alt="alt"
              src="https://file.rendit.io/n/eBQuwxRpmI9plflJr4Dm.svg"
              className="min-h-0 min-w-0 mt-1 w-12 shrink-0"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center ml-12 mr-8">
        <div className="whitespace-nowrap text-xl font-['Lato'] leading-[26px] text-black/85 w-3/5">
          No tiene una cuenta?<div className="contents"> </div>
        </div>
        <button
          className="text-xl font-['Lato'] font-semibold leading-[28.6px] text-[#6528bd] w-[108px] shrink-0 h-[88.46%]"
          onClick={() => dispatch(closeModal())}
        >
          Registrarse
        </button>
      </div>
      {/* Mostrar el ErrorContainer si hay un mensaje de error */}
      {error && (
        <ErrorContainer errorMessage={error} onClose={handleCloseError} />
      )}
    </div>
  );
}
