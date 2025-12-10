'use client';
import { useFormStatus } from 'react-dom';
export const SumbitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors">
      {pending ? 'Ingresando...' : 'Ingresar'}
    </button>
  );
};
