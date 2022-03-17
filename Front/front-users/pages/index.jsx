// DEPENDENCIES
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from "swiper";
import 'swiper/css';
import Image from 'next/image';
// RESOURCES
import { serverStaticDir } from 'utils/globalVars';

export default function Home(props) {

  const lazyRoot = useRef(null)

  const { characters } = props


  console.log(characters[0].avatar?.style?.backgroundColor);

  return (
    <div className="">
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

      <div ref={lazyRoot} className="h-[350px] lg:h-[50vh] bg-slate-200 p-5 mb-96">
        <Swiper
          className="w-10/12 h-full p-5 md:w-full"
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
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
                  <div className='border-t box-border  border-gray-900 flex flex-col w-full gap xl:gap-2 p-2 pl-3 text-sm h-[20%] bg-slate-100'>
                    <span className='font-semibold capitalize'>{character?.name}</span>
                    <span className='font-light capitalize'>{character?.profession}</span>
                  </div>

                </div>

              </SwiperSlide>

            )
          }

        </Swiper>
      </div>



    </div>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  let response = await fetch('http://192.168.1.135:3001/character/all')

  let characters = await response.json()

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: characters,
  }
}
