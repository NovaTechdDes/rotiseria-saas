import React from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ItemCaracteristica = ({ icon, title, description }: Props) => {
  return (
    <div className="flex items-center gap-2 mt-5 px-4 py-10 bg-white shadow-xl rounded-lg">
      {icon}
      <div className="flex flex-col">
        <h3 className="font-semibold text-xl text-slate-700 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
};
