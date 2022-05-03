import dayjs from "dayjs";
import Image from "next/image";
import { serverStaticDir } from "utils/globalVars";
import Button from "./Button";

export default function ModalViewAvatar({ onExit, character }) {
    return (
        <div className="h-full w-full bg-gray-600/60 z-50 fixed scroll- inset-0">
            <div className="relative box-border flex items-center justify-center w-[80%] max-w-4xl overflow-auto h-[90%] rounded-3xl bg-slate-300 p10 mx-auto top-8">

                <div className='flex flex-col justify-between w-full h-full gap-4 p-4 overflow-auto sm:p-8 '>

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


                    <div className='flex flex-col w-full h-full gap-1' >
                        <p className='mb-2 mr-4 text-lg font-semibold'>
                            {character.name}
                        </p>
                        <div className='flex items-center justify-start gap-2'>
                            <label className='text-sm sm:text-base'>Profession:</label>
                            <p className='text-xs text-gray-800 sm:text-sm'>{character.profession}</p>
                        </div>

                        <div className='flex items-center justify-start gap-2'>
                            <label className='text-sm sm:text-base'>Birthday:</label>
                            <p className='text-xs text-gray-800 sm:text-sm'>{dayjs(character.birthday).format('MMMM DD, YYYY')}</p>
                        </div>

                        <div className='flex items-center justify-start gap-2'>
                            <label className='text-sm sm:text-base'>Gender:</label>
                            <p className='text-xs text-gray-800 sm:text-sm'>{character.gender}</p>
                        </div>

                        <div className='flex items-center justify-start gap-2'>
                            <label className='text-sm sm:text-base'>Interests:</label>

                            {character.interests.map((interest, index) =>
                                <p className='p-[0.15rem] text-[10px] sm:text-sm text-gray-800 capitalize border border-blue-400 rounded-lg' key={index}>
                                    {interest}
                                </p>
                            )}
                        </div>

                        <div className='flex flex-col justify-start gap-2  h-max-[60%] overflow-auto'>
                            <label className='text-sm sm:text-base'>Biography:</label>
                            <p className='flex flex-col px-2 mb-2 overflow-auto text-xs text-gray-800 whitespace-pre-wrap sm:text-sm'>{character.biography}</p>
                        </div>


                    </div>

                    <Button
                        onClick={onExit}
                        classButton={'self-center'}
                    >
                        Exit
                    </Button>

                </div>
            </div>

        </div>
    )
}