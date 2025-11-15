import { TipoEgreso } from "@/components/dashboard/configuracion/TipoEgreso"
import { HeaderDashboard } from "@/components/dashboard/ui/HeaderDashboard"

const Configuracion = () => {

    return (
        <main className='text-black bg-[#e8e4e0] p-5'>
            <HeaderDashboard titulo="Configuracion" />

            <TipoEgreso />
        </main>
    )
}

export default Configuracion