// DEPENDENCIES
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Link from 'next/link';
// CSS
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
// RESOURCES

// COMPONENTS
import SectionCarousel from 'components/SectionCarousel';
import { serverHost } from 'utils/globalVars';
import { getCharacters } from 'services/characters';


export default function Home({characters}) {

  dayjs.extend(customParseFormat)


  return (
    <>
      <div className="relative bg-bgHeroHome2 after:absolute after:inset-0 after:z-[11] after:block after:w-full after:h-full  after:bg-[#303030] after:bg-opacity-60  bg-cover h-full  lg:h-[50vh] flex justify-center items-center  text-white  ">
        <div className=" lg:w-10/12 z-[12] max-w-[1280px] gap-8 flex-col p-10 flex justify-center items-center">

          <h1 className="self-start text-3xl font-bold text-gray-100 md:text-4xl">Character API  📤 📥</h1>

          <p className="text-xl ">
            Rest API where you can make GET requests of all the characters created by the admin and by other registered users on the web.
            <br />
            <br />
            You can also create your own characters and join the already available list.
          </p>
        </div>
      </div>

      <div className="p-10 ">
        <h2 className="mb-4 text-xl font-bold">
          Description
        </h2>

        <p>
          All users will be able to access the GET requests, which will return a JSON with the data of the available characters, the default characters and those created by the community.
          <br />
          If you are a registered user you can create a maximum of 3 characters and in your profile you will have access to them and modify or delete them as you wish.
          <br />
          <br />
          To be a registered user you just need to make a simple registration with a nickname and a password.
        </p>
      </div>

      <div className="p-10">
        <h2 className="mb-4 text-xl font-bold">
          How to use
        </h2>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod ea veniam corrupti ipsum voluptatibus natus voluptatem repellat, consequuntur dolorum consectetur saepe excepturi eos aliquid similique, quo quis? Odit, nemo in?
          Vero illo reiciendis error tempore facere enim ex sint? Repudiandae voluptas consequatur dolores commodi. Animi corporis iusto vel blanditiis quia distinctio amet beatae accusamus, nostrum, asperiores a? Est, temporibus sed.
          Id aperiam placeat eligendi iure tenetur delectus inventore sunt eum repellat, vel praesentium perferendis incidunt. In dolorum unde provident, numquam quaerat non velit cupiditate, ab eligendi, maxime atque corrupti veritatis?
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime optio non odio reiciendis enim praesentium asperiores, quos nisi ullam voluptatibus dolor voluptate! Iure veniam aspernatur reprehenderit commodi enim ratione laborum.
          Asperiores pariatur, quia consequuntur ab maxime veniam obcaecati fugiat, possimus dignissimos optio aperiam placeat esse. Tempora aspernatur soluta, ipsa ad magnam eligendi veritatis quas alias accusantium officia fugiat ipsum cumque!
        </p>

      </div>




      <SectionCarousel characters={characters} />


      <div className="p-10 pb-5">
        <h2 className="mb-4 text-xl font-bold">
          Get routes
        </h2>

        <p>
          You have these routes:
        </p>
        <ul className='mb-8'>
          <li className='mt-5 indent-4'>
            GET
            <a
              className='ml-2 text-blue-800 '
              rel="noopener noreferrer"
              target="_blank"
              href={`${serverHost}/character/all`}
            >
              /character/all
            </a>
          </li>

          <li className='mt-5 indent-4'>
            GET
            <a
              className='ml-2 text-blue-800 '
              rel="noopener noreferrer"
              target="_blank"
              href={`${serverHost}/character/1`}
            >
              /character/1
            </a>
          </li>

          <li className='mt-5 indent-4'>
            GET
            <a
              className='ml-2 text-blue-800 '
              rel="noopener noreferrer"
              target="_blank"
              href={`${serverHost}/avatar/all`}
            >
              /avatar/all
            </a>
          </li>

          <li className='mt-5 indent-4'>
            GET
            <a
              className='ml-2 text-blue-800 '
              rel="noopener noreferrer"
              target="_blank"
              href={`${serverHost}/avatar/1`}
            >
              /avatar/1
            </a>
          </li>

        </ul>

        <p>
          Check the
          <Link href={'/guide'}>
            <a className='mx-1 text-blue-800 '>guide</a>
          </Link>
          to see the other routes.
        </p>

      </div>

      <div className="p-10 pt-5">
        <h2 className="mb-4 text-xl font-bold">
          Resources
        </h2>
        <p>
          The images of the avatars belong to Lisa Broedlin,

          you can get more information about this beautiful collection at
          <br />
          <br />
          <a
            className='uppercase font-bevan'
            rel="noopener noreferrer"
            target="_blank"
            href={`https://powerpeopleplatform.com/`}
            title='Power People User'
          >
            -- power people platform --
          </a>
        </p>
      </div>


    </>
  )
}

export async function getStaticProps() {
  //Get external data from the file system, API, DB, etc.

  // TODO-> paginacion

  const characters = await getCharacters()

  return {
    props: characters,
  }
}
