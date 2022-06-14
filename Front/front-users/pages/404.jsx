import Image from "next/image";
import Link from "next/link";
import Img404 from 'public/404.png'

export default function Custom404() {
  return (

    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="relative w-[300px] h-[500px]">
        <Image
          objectFit="contain"
          alt={'404'}
          src={Img404}
        />
      </div>

      <div className="px-4 py-2 mt-4 bg-blue-400 rounded-md drop-shadow-md text-slate-800">
        <Link href={"/"}>
          <a>Go Home</a>
        </Link>
      </div>


    </div>

  )
}
