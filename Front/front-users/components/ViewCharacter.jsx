// DEPENDENCIES
import Image from "next/image"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs"
// COMPONENTS
import Button from "./Button"
//RESOURCES
import { serverStaticDir } from "utils/globalVars"

export default function ViewCharacter({ show=true, character, onExit }) {

    dayjs.extend(customParseFormat)

    if (!show) return null

    return (
        <div className="box-border fixed inset-0 z-50 flex flex-wrap items-center justify-center w-screen h-screen bg-slate-300/90">
            <div className="box-border flex items-center justify-center w-[80%] md:max-w-[600px] max-w-4xl overflow-auto h-[90%] rounded-3xl bg-zinc-50 p10">

                <div className='flex flex-col justify-between md:justify-around w-full h-full gap-4 p-4  sm:p-8 '>

                    <div className='relative overflow-hidden shadow-xl self-center shadow-gray-200 rounded-t-[50%] rounded-r-[50%] rounded-l-[50%] rounded-b-[40%] min-h-[25%] w-[80%] sm:w-[40%] sm:min-h-[200px] '
                        style={(character.avatar.style.backgroundColor === "") ? backgroundColor : character.avatar.style}
                    >
                        <Image
                            alt={character.name}
                            src={`${serverStaticDir}${character.avatar.url}`}
                            objectFit="contain"
                            lazyBoundary="200px"
                            layout="fill"
                        />

                    </div>

                    <div className='flex flex-col  w-full  gap-8' >

                        <p className=' text-2xl capitalize mx-auto my-2 font-semibold font-moonRocks md:text-4xl'>
                            {character.name}
                        </p>

                        <ul>
                            <li className='flex items-center justify-start gap-2 pb-2'>
                                <label className='text-sm sm:text-base font-light'>Profession:</label>
                                <p className='text-xs text-gray-800 sm:text-sm '>{character.profession}</p>

                            </li>
                            <li className='flex items-center justify-start gap-2 pb-2'>
                                <label className='text-sm sm:text-base font-light'>Birthday:</label>
                                <p className='text-xs text-gray-800 sm:text-sm'>{dayjs(character.birthday).format('MMMM DD, YYYY')}</p>
                            </li>
                            <li className='flex items-center justify-start gap-2 pb-2'>
                                <label className='text-sm sm:text-base font-light'>Gender:</label>
                                <p className='text-xs text-gray-800 sm:text-sm'>{character.gender}</p>
                            </li>
                            <li className='flex items-center justify-start gap-2 pb-2'>
                                <label className='text-sm sm:text-base font-light'>Interests:</label>

                                {
                                    character.interests.map((interest, index) =>
                                        <p className='p-[0.15rem] text-[10px] sm:text-sm text-gray-800 capitalize border border-blue-400 rounded-lg' key={index}>
                                            {interest}
                                        </p>
                                    )
                                }
                            </li>
                            <li className='flex flex-col justify-start gap-2  h-max-[60%] overflow-auto pb-2'>
                                <label className='text-sm sm:text-base font-light'>Biography:</label>
                                <p className='flex flex-col px-2 mb-2 overflow-auto text-xs text-gray-800 whitespace-pre-wrap sm:text-sm'>{character.biography}</p>

                            </li>
                        </ul>

                    </div>

                    <button onClick={onExit} className={'self-center w-[72px] h-[32px] text-center bg-blue-600 hover:bg-blue-700 border-none cursor-pointer rounded-md py-1  text-white  text-sm'} >
                        Exit
                    </button>

                </div>

            </div>
        </div>
    )
}