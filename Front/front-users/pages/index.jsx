// DEPENDENCIES
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from "swiper";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
// CSS
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
// RESOURCES
import { serverHost, serverStaticDir } from 'utils/globalVars';
// COMPONENTS
import Modal from 'components/Modal';
import Button from 'components/Button';


export default function Home(props) {

  dayjs.extend(customParseFormat)
  const [characterSelected, setCharacterSelected] = useState(false);
  const [showModalCharacter, setShowModalCharacter] = useState(false)
  const lazyRoot = useRef(null)

  const { characters } = props

  console.log({characters});

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



      {
        showModalCharacter &&
        <Modal>

          <div className='flex flex-col justify-between w-full h-full gap-4 p-4 overflow-auto sm:p-8 '>

            <div className='relative overflow-hidden shadow-xl self-center shadow-gray-200 rounded-t-[50%] rounded-r-[50%] rounded-l-[50%] rounded-b-[40%] min-h-[25%] w-[80%] sm:w-[40%] sm:min-h-[200px] '
              style={(characterSelected.avatar.style.backgroundColor === "") ? backgroundColor : characterSelected.avatar.style}
            >
              <Image
                alt={characterSelected.name}
                src={`${serverStaticDir}${characterSelected.avatar.url}`}
                objectFit="contain"
                lazyBoundary="200px"
                layout="fill"
              />

            </div>


            <div className='flex flex-col w-full h-full gap-1' >
              <p className='mb-2 mr-4 text-lg font-semibold'>
                {characterSelected.name}
              </p>
              <div className='flex items-center justify-start gap-2'>
                <label className='text-sm sm:text-base'>Profession:</label>
                <p className='text-xs text-gray-800 sm:text-sm'>{characterSelected.profession}</p>
              </div>

              <div className='flex items-center justify-start gap-2'>
                <label className='text-sm sm:text-base'>Birthday:</label>
                <p className='text-xs text-gray-800 sm:text-sm'>{dayjs(characterSelected.birthday).format('MMMM DD, YYYY')}</p>
              </div>

              <div className='flex items-center justify-start gap-2'>
                <label className='text-sm sm:text-base'>Gender:</label>
                <p className='text-xs text-gray-800 sm:text-sm'>{characterSelected.gender}</p>
              </div>

              <div className='flex items-center justify-start gap-2'>
                <label className='text-sm sm:text-base'>Interests:</label>

                {characterSelected.interests.map((interest, index) =>
                  <p className='p-[0.15rem] text-[10px] sm:text-sm text-gray-800 capitalize border border-blue-400 rounded-lg' key={index}>
                    {interest}
                  </p>
                )}
              </div>

              <div className='flex flex-col justify-start gap-2  h-max-[60%] overflow-auto'>
                <label className='text-sm sm:text-base'>Biography:</label>
                <p className='flex flex-col px-2 mb-2 overflow-auto text-xs text-gray-800 whitespace-pre-wrap sm:text-sm'>{characterSelected.biography}</p>
              </div>


            </div>

            <Button
              onClick={() => setShowModalCharacter(false)}
              classButton={'self-center'}
            >
              Exit
            </Button>

          </div>
        </Modal>

      }

      <div id='ref' ref={lazyRoot} className="h-[400px] lg:h-[50vh] bg-[#f5f8fd] p-5">

        <Swiper
          className="w-10/12 h-full p-5 md:w-full"
          spaceBetween={50}
          slidesPerView={3}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          keyboard={{
            enabled: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
            },

            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {
            characters && characters.map(character =>
              <SwiperSlide
                key={character.id}
                style={{ "backgroundColor": `${character.avatar?.style?.backgroundColor}` }}
                className={`cursor-pointer rounded-2xl overflow-hidden `}
                onClick={() => {
                  setShowModalCharacter(true)
                  setCharacterSelected(character)
                }}
              >
                <div className='box-border w-full h-full '>
                  <div className='w-full h-[80%] relative'>
                    <Image
                      lazyRoot={lazyRoot}
                      objectFit="cover"
                      alt={character?.name}
                      src={`${serverStaticDir}${character.avatar.url}`}
                      lazyBoundary="200px"
                      layout="fill"
                    />
                  </div>
                  <div className='border-t box-border  border-gray-900 flex flex-col w-full gap xl:gap-2 p-2 pl-3 text-sm h-[20%] bg-[#fff]'>
                    <span className='font-semibold capitalize'>{character?.name}</span>
                    <span className='font-light capitalize'>{character?.profession}</span>
                  </div>

                </div>

              </SwiperSlide>

            )
          }

        </Swiper>
      </div>

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
  let response = await fetch(`${serverHost}/character/all`)

  let characters = await response.json() 

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: characters,
  }
}
