// DEPENDENCIES
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from "swiper";
import Image from 'next/image';
// CSS
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
// RESOURCES
import { serverStaticDir } from 'utils/globalVars';
// COMPONENTS

export default function CarouselCharacters({ characters, lazyRoot, setModal, setCharacter }) {

    if (!characters) return <p>No character loaded</p>

    return (
        <>
            <Swiper
                className="w-full h-[350px] py-5 md:w-full md:px-10"
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
                                setModal(true)
                                setCharacter(character)
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
        </>
    )
}