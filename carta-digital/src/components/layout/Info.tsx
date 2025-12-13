import { Check, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export const Info = () => {
  return (
    <section className="py-20 text-black">
      <div className="container">
        <div className="grid gap-12  items-center lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-2 text-sm mb-6">
              <ShieldCheck />
              <p>Seguro y Confiable</p>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-balance">Diseñado específicamente para rotiserías y negocios gastronómicos</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                  <Check className="text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-start">Configuracion Instantanea</h4>
                  <p className="text-sm text-slate-500">Comienza en minutos, sin instalaciones complicadas ni conocimientos tecnicos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                  <Check className="text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-start">Acceso desde cualquier dispositivo</h4>
                  <p className="text-sm text-slate-500">Funciona perfectamente en computadoras, tablets y móviles</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                  <Check className="text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-start">Datos siempre seguros</h4>
                  <p className="text-sm text-slate-500">Respaldos automáticos y encriptación de nivel empresarial</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shrink-0 mt-0.5">
                  <Check className="text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-start">Actualizaciones continuas</h4>
                  <p className="text-sm text-slate-500">Nuevas funcionalidades y mejoras sin costo adicional</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image src="https://lwuuqboohvwbigpcxidg.supabase.co/storage/v1/object/public/logo/Info.png" alt="Info" width={1000} height={1000} loading="eager" className="h-[350px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
