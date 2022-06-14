// DEPENDENCIES
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RgbaColorPicker } from "react-colorful";
// COMPONENTS
import { Avatar } from "./Avatar";
import Button from "./Button";

export default function ChooseBgAvatar({ show=true, handleChooseAvatar, onDone }) {

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

    if (!show) return null;

    return (

        <div className="box-border fixed inset-0 z-50 flex flex-wrap items-center justify-center w-screen h-screen bg-slate-300/90">
            <div className="box-border flex items-center justify-center w-[80%] max-w-4xl overflow-auto h-[90%] rounded-3xl bg-slate-100 p10">


                <div className='box-border flex flex-col items-stretch justify-between w-full h-full gap-2 p-4 bg-white lg:justify-center'>

                    <h1 className='text-xl font-bold text-center'>
                        Select background of your avatar
                    </h1>

                    <div className='box-border flex flex-wrap items-center justify-around gap-10 rounded-md h-4/6'>

                        <div className='w-48 h-56'>
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

                    <Button
                        show={true}
                        onClick={handleSetBgAvatar}
                        classButton="self-center"
                    >
                        Done
                    </Button>


                </div>
            </div>
        </div>
    );
}
