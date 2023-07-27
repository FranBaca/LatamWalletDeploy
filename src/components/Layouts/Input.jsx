function Input({ id, register, type, number, required, minLength }) {
  const { ref, ...registerProps } = register(id, {
    required: required && "Este campo es requerido.",
    valueAsNumber: number,
    minLength: minLength && {
      value: minLength,
      message: `El campo debe tener al menos ${minLength} caracteres.`,
    },
  });

  return (
    <div className="w-full relative">
      <input
        type={type}
        {...registerProps}
        ref={ref}
        className={`
          block w-full mt-1 p-2 
          border-gray-800 
          rounded-md 
          shadow-sm 
          focus:ring 
          focus:ring-indigo-200 
          focus:ring-opacity-50
          focus:border-indigo-300
        `}
      />
    </div>
  );
}

export default Input;
