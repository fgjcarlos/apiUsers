// DEPENDENCIES
import { useState } from 'react'
import Link from "next/link"
// RESOURCES
import MenuHam from 'public/menuHamb.svg'
import Image from 'next/image'

export default function Navbar() {

    const [menuBtn, setMenuBtn] = useState(false)

    const links = [
        {
            endPoint: "/guide",
            name: "Guide",
        },
        {
            endPoint: "/addcharacter",
            name: "Add Character",
        },
        {
            endPoint: "/uploadAvatar",
            name: "Upload Avatar",
        },
    ]

    return (
        <div className='w-full bg-white border-b border-b-zinc-200 lg:sticky lg:top-0 lg:z-30'>
            <div className='flex flex-wrap items-center p-3 font-serif lg:mx-auto lg:max-w-4xl lg:w-2/3'>
                <Link href="/" >
                    <a onClick={() => setMenuBtn(false)} >
                        <h1 className="text-2xl font-bold text-gray-800 uppercase hover:text-gray-600">Characters</h1>
                    </a>
                </Link>
                <button
                    onClick={() => setMenuBtn(!menuBtn)}
                    className="inline-flex p-2 ml-auto bg-blue-400 rounded outline-none hover:bg-blue-500 lg:hidden "
                >
                    <Image src={MenuHam} alt="menuHamb" width={24} height={24} />
                </button>
                <div className={`${menuBtn ? '' : 'hidden'} w-full lg:inline-flex mt-4 lg:m-0 lg:flex-grow lg:w-auto`}>
                    <nav className="flex flex-col items-start w-full gap-4 font-medium text-gray-800 lg:text-lg lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto">
                        {links.map(({ endPoint, name }) =>
                            <Link key={endPoint} href={endPoint}>
                                <a
                                    className='p-2 rounded-2xl hover:bg-slate-400 hover:text-gray-50 bg-slate-200 lg:bg-inherit'
                                    onClick={() => setMenuBtn(false)}
                                >
                                    {name}
                                </a>
                            </Link>
                        )}
                    </nav>
                </div>




            </div>
        </div>

    )
}