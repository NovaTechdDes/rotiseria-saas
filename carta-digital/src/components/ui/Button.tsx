'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Definimos las variantes de estilo que usas en tus diseños
  variant?: 'primary' | 'pink' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button = ({ children, variant = 'primary', fullWidth = false, className = '', ...props }: ButtonProps) => {
  // Estilos base que comparten TODOS los botones (redondeados, fuente, transición)
  const baseStyles = 'px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  // Diccionario de colores según la variante
  const variants = {
    primary: 'cursor-pointer bg-orange-600 text-white hover:bg-orange-700 shadow-sm hover:shadow-md', // Naranja (Dashboard / Confirmar)
    pink: 'cursor-pointer bg-pink-500 text-white hover:bg-pink-600 shadow-sm hover:shadow-md', // Rosa (Carta Cliente)
    secondary: 'cursor-pointer bg-gray-100 border border-gray-500 text-gray-800 hover:bg-gray-300 cursor-pointer', // Gris (Cancelar)
    outline: 'cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50', // Borde Naranja
    danger: 'cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 border border-red-200', // Rojo (Eliminar)
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
