// DEPENDENCIES
import Image from 'next/image';

export default function Guide() {
    return (
        <div className='flex flex-col items-start justify-between p-8 sm:px-24'>
            <h1 className="mb-4 text-3xl font-bold">
                Guide
            </h1>

            <p>
                We will explain the available endpoints as an example, through the FETCH API, all the results will return a JSON.
            </p>

            <h2 className="mt-8 text-xl font-bold ">
                Get all the characters
            </h2>

            <div className='relative min-h-[160px] w-full sm:h-[300px] sm:w-[720px] self-center'>
                <Image
                    alt={'Get all the characters'}
                    src={'/images/guide/get-characters.png'}
                    objectFit="fill"
                    lazyBoundary="200px"
                    layout="fill"
                />

            </div>

            <h2 className="mt-8 text-xl font-bold ">
                Output ⬇️
            </h2>

            <div className='relative min-h-[160px] w-full sm:h-[300px] sm:w-[720px] self-center'>
                <Image
                    alt={'Get all the characters'}
                    src={'/images/guide/get-characters.png'}
                    objectFit="fill"
                    lazyBoundary="200px"
                    layout="fill"
                />

            </div>

            <h2 className="mt-8 text-xl font-bold ">
                Get all the avatars
            </h2>

            <div className='relative min-h-[160px] w-full sm:h-[300px] sm:w-[720px] self-center '>
                <Image
                    alt={'Get all the characters'}
                    src={'/images/guide/get-characters.png'}
                    objectFit="fill"
                    lazyBoundary="200px"
                    layout="fill"
                />

            </div>

            <h2 className="mt-8 text-xl font-bold ">
                Output ⬇️
            </h2>


            <div className='relative min-h-[160px] w-full sm:h-[300px] sm:w-[720px] self-center'>
                <Image
                    alt={'Get all the characters'}
                    src={'/images/guide/get-characters.png'}
                    objectFit="fill"
                    lazyBoundary="200px"
                    layout="fill"
                />

            </div>


        </div>
    )
}