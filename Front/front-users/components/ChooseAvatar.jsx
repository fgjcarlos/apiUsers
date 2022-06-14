import { useSelector } from "react-redux";
import ListAvatars from "./ListAvatars";
import Button from './Button'

export function ChooseAvatar({ show=true, avatars, onDone, onExit }) {

    const storeAvatar = useSelector((s) => s.avatar);

    if (!show) return null

    return (

        <div className="box-border fixed inset-0 z-50 flex flex-wrap items-center justify-center w-screen h-screen bg-slate-300/90">
            <div className="box-border flex items-center justify-center w-[80%] max-w-4xl overflow-auto h-[90%] rounded-3xl bg-slate-100 p10">


                <div className='flex flex-col items-center justify-between h-full gap-1 p-1 lg:p-5 '>
                    <h1 className='my-2 text-xl font-bold'>
                        Choose the avatar
                    </h1>

                    <ListAvatars avatars={avatars} />

                    <div className='flex w-2/3 gap-2 lg:my-4 justify-evenly'>
                        <Button
                            show={true}
                            onClick={onDone}
                            state={!storeAvatar}
                        >
                            Done
                        </Button>
                        <Button
                            show={true}
                            onClick={onExit}
                        >
                            Exit
                        </Button>
                    </div>
                </div>
            </div>
        </div>


    );
}
