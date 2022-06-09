// DEPENDENCIES
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
// RESOURCES
import { serverStaticDir } from "utils/globalVars";
// IMAGES
import BgProfile1 from 'public/images/profile/profile3.jpg'

export default function ProfileHero({}) {

    const userLogin = useSelector(state => state.login);

    return (
        <div className=" box-content h-[270px] lg:h-[380px] mx-auto p-4">
            <div className="h-[180px]  lg:h-[250px] relative">
                <Image
                    className="rounded-[45px]"
                    objectFit="cover"
                    alt={"bg profile"}
                    src={BgProfile1}
                    layout="fill"
                />
                <div className=" bg-white w-[180px] h-[180px] lg:w-[260px] lg:h-[260px] rounded-full flex justify-center items-center absolute bottom-0 left-[50%] translate-y-[50%]  translate-x-[-50%]">
                    <div className="relative w-[160px] h-[160px]  shadow-lg shadow-slate-600  overflow-hidden lg:w-[230px] lg:h-[230px] bg-pink-200 rounded-full ">
                        <Image
                            objectFit="cover"
                            alt={userLogin?.name}
                            src={`${serverStaticDir}${userLogin?.profilePhoto.url}`}
                            layout="fill"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

