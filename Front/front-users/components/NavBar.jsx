// DEPENDENCIES
import { memo, useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import useCheckSession from 'hooks/useCheckSession'
import { Toaster } from 'react-hot-toast'
// ICONS
import MenuHam from 'public/menuHamb.svg'
import AvatarDefault from 'public/avatarDefault.png'
// RESOURCES
import { toasterLogOut } from 'utils/toast'

function Navbar() {

    const [menuBtn, setMenuBtn] = useState(false)
    const [dropDownProfle, setDropDownProfile] = useState(false)
    const login = useSelector(state => state.login, shallowEqual);

    const dispatch = useDispatch();
    
    console.log("reload Navbar")

    useCheckSession()

    const handleLogOut = async () => {
        toasterLogOut()
    }

    const links = [
        {
            endPoint: "/guide",
            name: "Guide",
        },
        {
            endPoint: "/uploadAvatar",
            name: "Upload Avatar",
        },
    ]

    return (
        <div className='w-full bg-white border-b border-b-zinc-200 lg:sticky lg:top-0 lg:z-30'>
            <Toaster />
            <div className='flex flex-wrap items-center p-3 font-serif lg:mx-auto lg:max-w-4xl lg:w-2/3'>
                <Link href="/" >
                    <a onClick={() => {
                        setMenuBtn(false)
                        setDropDownProfile(false)
                    }} >
                        <h1 className="text-2xl font-bold text-gray-800 uppercase hover:text-gray-600">Characters</h1>
                    </a>
                </Link>
                <button
                    onClick={() => {
                        setMenuBtn(!menuBtn)
                        setDropDownProfile(false)
                    }}
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
                                    onClick={() => {
                                        setMenuBtn(false)
                                        setDropDownProfile(false)
                                    }}
                                >
                                    {name}
                                </a>
                            </Link>
                        )}

                        {login
                            ?
                            <div className='relative'>

                                <div
                                    className='box-border flex items-center justify-between gap-1 p-2 cursor-pointer rounded-2xl hover:bg-slate-400 hover:text-gray-50 bg-slate-200 lg:bg-inherit'
                                    onClick={() => setDropDownProfile(!dropDownProfle)}
                                >
                                    <Image
                                        objectFit="contain"
                                        alt={login?.name}
                                        src={AvatarDefault}
                                        width={30} height={30} />

                                    <h1 className='font-semibold capitalize'>
                                        {login.name}
                                        <span className='ml-2 text-xs align-middle' >⛛</span>
                                    </h1>


                                </div>



                                {
                                    dropDownProfle &&
                                    <div className='lg:absolute  mt-1 ml-2 lg:mt-0 lg:ml-0 lg:top-[105%] lg:left-0 lg:z-30 lg:bg-slate-300 w-full lg:w-[140px] lg:text-white rounded-md p-2 bg-slate-200 flex justify-start items-center gap-2 flex-col'>
                                        <div className='text-black'>
                                            <span className='mr-2 text-lg'>👤</span>
                                            <Link href={`/profile`}>
                                                <a
                                                    className='px-4 py-1 rounded-xl hover:bg-slate-400 hover:text-gray-50 bg-slate-200 lg:bg-inherit'
                                                    onClick={() => {
                                                        setMenuBtn(false)
                                                        setDropDownProfile(false)
                                                    }}
                                                >
                                                    Profile
                                                </a>
                                            </Link>
                                        </div>

                                        <div onClick={handleLogOut} className="text-black cursor-pointer">
                                            <span className='mr-2 text-lg'>📴</span>
                                            <p className='inline-block px-4 py-1 rounded-xl hover:bg-slate-400 hover:text-gray-50 bg-slate-200 lg:bg-inherit'>
                                                Logout
                                            </p>
                                        </div>
                                    </div>
                                }

                            </div>
                            :
                            <div className='flex items-center gap-2 text-sm lg:text-base lg:px-4'>
                                <Link href={"/login"}>
                                    <a
                                        className='p-2 bg-blue-200 rounded-xl hover:bg-blue-400 hover:text-gray-50 '
                                        onClick={() => {
                                            setMenuBtn(false)
                                            setDropDownProfile(false)
                                        }}
                                    >
                                        Login
                                    </a>
                                </Link>
                                <Link href={"/register"}>
                                    <a
                                        className='p-2 bg-blue-300 rounded-xl hover:bg-blue-500 hover:text-gray-50 '
                                        onClick={() => {
                                            setMenuBtn(false)
                                            setDropDownProfile(false)
                                        }}
                                    >
                                        Register
                                    </a>
                                </Link>
                            </div>
                        }

                    </nav>
                </div>

            </div>
        </div>

    )
}



export default memo(Navbar)