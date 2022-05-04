import { useSelector } from "react-redux";
import ListAvatars from "./ListAvatars";
import Button from './Button'

export function ChooseAvatar({ avatars, onDone, onExit }) {
   
    const storeAvatar = useSelector((s) => s.avatar);

    return (
        <div className='flex flex-col items-center justify-between h-full gap-1 p-1 lg:p-5 '>
            <h1 className='my-2 text-xl font-bold'>
                Choose the avatar
            </h1>

            <ListAvatars avatars={avatars} />

            <div className='flex w-2/3 gap-2 lg:my-4 justify-evenly'>
                <Button onClick={onDone} state={!storeAvatar}>
                    Done
                </Button>
                <Button onClick={onExit}>
                    Exit
                </Button>
            </div>
        </div>
    );
}
