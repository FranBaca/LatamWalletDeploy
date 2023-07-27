import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ options }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Verificar si el componente CardElement está montado correctamente
    if (elements) {
      // si el componente se ha montado correctamente
      console.log("CardElement mounted successfully");
    }
  }, [elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js not loaded.
      return;
    }

    setIsProcessing(true);

    try {
      // Realizar confirmación del intento de pago con el monto y el elemento de pago de Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        options.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === "requires_action") {
        // Si el pago requiere autenticación adicional (3D Secure), se redirige al cliente
        setIsProcessing(false);
        stripe.handleCardAction(paymentIntent.client_secret).then((result) => {
          if (result.error) {
            setMessage(result.error.message);
          } else {
            // Confirmación exitosa después de la autenticación adicional
            setMessage("Payment succeeded!");
            // Manejar el caso de éxito, por ejemplo, mostrar un mensaje de éxito o actualizar el saldo de la wallet.
          }
        });
      } else {
        // Confirmación exitosa del intento de pago
        setMessage("Payment succeeded!");
        // Manejar el caso de éxito, por ejemplo, mostrar un mensaje de éxito o actualizar el saldo de la wallet.
      }
      navigate("/main")
    } catch (error) {
      console.error(
        "Error durante la confirmación del intento de pago:",
        error,
      );
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="mt-10 flex flex-col items-center " >
      {/* Asegúrar de que CardElement se renderice dentro del formulario */}
      <CardElement id="card-element" options={options} className="w-[500px]"/>
      <button className="bg-[#6528BD] text-white font-semibold p-2 rounded-md mt-5" disabled={isProcessing || !stripe || !elements} id="submit">
        <span>{isProcessing ? "Processing ... " : "Pay Now"}</span>
      </button>
      {/* Mostrar cualquier mensaje de error o éxito */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
