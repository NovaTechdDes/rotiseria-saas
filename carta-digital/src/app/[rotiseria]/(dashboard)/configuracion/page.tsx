import { Color } from "@/components/dashboard/configuracion/Color"
import { TipoEgreso } from "@/components/dashboard/configuracion/TipoEgreso"
import { Usuario } from "@/components/dashboard/configuracion/Usuario"
import { HeaderDashboard } from "@/components/dashboard/ui/HeaderDashboard"

const Configuracion = () => {

    return (
        <main className='text-black bg-[#e8e4e0] p-5'>
            <HeaderDashboard titulo="Configuracion" />

            <TipoEgreso />

            <Color />

            <Usuario />
        </main>
    )
}

export default Configuracion