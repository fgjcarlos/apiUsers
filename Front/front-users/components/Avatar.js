import Image from "next/image";
import React, { useRef, useState } from "react";
import { serverStaticDir } from "utils/globalVars";

export function Avatar({ avatarActive, onClick, avatar, lazyRoot, bg }) {

    const commonStyle = `p-2 w-full h-full rounded-lg cursor-pointer relative overflow-hidden`
    const defaultStyle = ` bg-white  border-2 ${avatarActive === avatar.id ? 'border-green-500 border-4' : 'border-transparent'} hover:border-green-700`
    const avatarCardStyle = 'shadow-lg shadow-slate-500'
    const backgroundColor = bg && { backgroundColor: `rgba(${bg?.r},${bg?.g},${bg?.b},${bg?.a})` }

    const typeStyle = (bg || avatar.style.backgroundColor) ? avatarCardStyle : defaultStyle


    console.log("avatar.style", avatar.style.backgroundColor)

    const [showTooltip, setToolTip] = useState(false)

    const ToolTip = () => {
        return (
            <div className="absolute w-40 p-2 text-sm font-light transform -translate-x-1/2 -translate-y-full bg-gray-400 rounded-lg -top-4 left-1/2 text-gray-50"            >
                Click here if you want change the avatar
            </div>
        )

    }

    return (
        <div
            onMouseOver={() => bg && setToolTip(true)}
            onMouseOut={() => setToolTip(false)}
            style={(avatar.style.backgroundColor === "") ? backgroundColor : avatar.style}
            className={`${commonStyle} ${typeStyle}`}
            onClick={onClick}
        >
            {showTooltip && <ToolTip ></ToolTip>}

            <Image
                lazyRoot={lazyRoot}
                objectFit="cover"
                alt={avatar.name}
                src={`${serverStaticDir}${avatar.url}`}
                lazyBoundary="200px"
                layout="fill"
            />
        </div>
    );
}
