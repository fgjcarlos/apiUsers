// DEPENDENCIES
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RgbaColorPicker } from "react-colorful";
// COMPONENTS
import { Avatar } from "./Avatar";
import Button from "./Button";

export default function ChooseBgAvatar({ handleChooseAvatar, onDone }) {

    const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
    const storeAvatar = useSelector((s) => s.avatar);
    const dispatch = useDispatch();

    const handleSetBgAvatar = () => {
        dispatch({
            type: "@avatar/updateStyle", payload: {
                backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`
            }
        })
        setColor({ r: 255, g: 255, b: 255, a: 1 })
        onDone()
    }

    return (
        <div className='max-w-3xl h-full w-[90%] bg-white p-10 box-border flex flex-col justify-between items-stretch'>

            <h1 className='mt-2 mb-2 text-2xl font-bold text-center'>
                Select background of your avatar
            </h1>

            <div className='box-border flex flex-wrap items-center justify-around gap-10 rounded-md h-4/6'>

                <div className='w-56 h-60'>
                    <Avatar
                        avatar={storeAvatar}
                        bg={color}
                        onClick={handleChooseAvatar}
                    />
                </div>

                <RgbaColorPicker
                    style={{ height: `13rem` }}
                    className='rounded-lg h-52'
                    color={color}
                    onChange={setColor}
                />
            </div>

            <Button onClick={handleSetBgAvatar} classButton="self-end mr-5">
                Done
            </Button>


        </div>
    );
}
