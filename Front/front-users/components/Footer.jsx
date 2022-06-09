//DEPENDENCIES
import Link from "next/link";

export default function Footer() {
    return (
        <div className='h-[20vh] w-full bg-zinc-700 mx-auto max-w-[1280px] m-0 box-border flex flex-col gap-4 justify-center items-center text-slate-100'>
            <Link href="/" >
                <a className="text-3xl font-bevan hover:scale-105 hover:text-orange-400">
                    Characters Api
                </a>
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300">
                <a href="https://www.fgjcarlos.com" className="hover:text-orange-400">
                    Carlos Fontán - Web developer
                </a>
                <Link href="/credits" >
                    <a className="hover:text-orange-400">
                        ©Credits
                    </a>
                </Link>
            </div>
        </div>
    )
}