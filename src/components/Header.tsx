import Image from 'next/image'
import Logo from '../../public/logo.svg'

import format from "date-fns/format"
import ptBR from "date-fns/locale/pt-BR"

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })

    return (
        <header
            className="bg-white h-28 flex items-center py-8 px-16 border border-solid border-gray-100"
        >
            <Image
                src={Logo}
                alt=""
            />

            <p className="ml-8 py-1 pl-8 border-l border-l-gray-100">
                O melhor para você ouvir, sempre
            </p>

            <span className="ml-auto capitalize">
                {currentDate}
            </span>
        </header>
    )
}