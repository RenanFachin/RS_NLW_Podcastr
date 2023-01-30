import Image from 'next/image'
import Logo from '../../public/logo.svg'

import format from "date-fns/format"
import ptBR from "date-fns/locale/pt-BR"
import Switch from 'react-switch'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'phosphor-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'


export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    function handleTheme() {
        const currentTheme = theme === 'light' ? 'dark' : 'light'
        console.log(currentTheme)

        setTheme(currentTheme)
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }


    return (
        <header
            className="bg-white h-28 flex items-center py-8 px-16 border border-solid border-gray-100 dark:bg-darkMode-headerBackground dark:text-white"
        >
            <Link href={'/'}>
                <Image
                    src={Logo}
                    alt="Logo do Podcastr"
                />
            </Link>

            <p className="ml-8 py-1 pl-8 border-l border-l-gray-100">
                O melhor para você ouvir, sempre
            </p>

            <span className="ml-auto capitalize">
                {currentDate}
            </span>

            <Switch
                className='ml-7'
                onChange={handleTheme}
                checked={theme === 'dark'}
                checkedIcon={
                    <div className='flex items-center justify-center h-full text-white'>
                        <Sun />
                    </div>

                }
                uncheckedIcon={
                    <div className='flex items-center justify-center h-full text-white'>
                        <Moon />
                    </div>
                }
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                offHandleColor='#6F48C9'
                onHandleColor="#6F48C9"
                offColor="#9F75FF"
                onColor="#9F75FF"
            />

        </header>
    )
}