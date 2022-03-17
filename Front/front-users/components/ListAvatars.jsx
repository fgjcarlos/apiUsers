// DEPENDENCIES
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
// COMPONENTS
import { Avatar } from "./Avatar";

export default function ListAvatars({ avatars }) {

  const [avatarActive, setAvatarActive] = useState("")
  const dispatch = useDispatch();

  const lazyRoot = useRef(null)

  const handleSetAvatar = (avatar) => {
    setAvatarActive(avatar.id)
    dispatch({ type: '@avatar/set', payload: avatar })
  }

  return (
    <div
      ref={lazyRoot}
      className="flex flex-wrap items-center justify-center w-11/12 h-full gap-5 p-5 overflow-y-scroll rounded-md scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-700"
    >
      {avatars.map(avatar =>
        <div
          key={avatar.id}
          className="h-48 w-36"
        >
          <Avatar
            avatarActive={avatarActive}
            onClick={() => handleSetAvatar(avatar)}
            avatar={avatar}
            lazyRoot={lazyRoot}
          />
        </div>
      )}
    </div>
  );
}

