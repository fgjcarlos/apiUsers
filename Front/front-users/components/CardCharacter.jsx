// DEPENDENCIES
import Image from "next/image";
import { useDispatch } from "react-redux";
// RESOURCES
import { serverStaticDir } from "utils/globalVars";

export default function CardCharacter({ show=true, character }) {

    const dispatch = useDispatch();

    if (!show) return null;

    const handleModify = () => {
        character.action = "modify";
        dispatch({ type: "@modalConfirm/set" })
        dispatch({ type: "@character/set", payload: character });
    }
    const handleDelete = () => {
        character.action = "delete";
        dispatch({ type: "@modalConfirm/set" })
        dispatch({ type: "@character/set", payload: character });
    }

    const handleView = () => {
        character.action = "view";
        dispatch({ type: "@viewModal/set" })
        dispatch({ type: "@character/set", payload: character });
    }

    return (

        <div className="relative box-content group cursor-pointer px-1 py-2 bg-[#fcfcfc] w-[200px] h-[250px] rounded-md shadow-md flex flex-col justify-center items-center">
            <span className="self-start p-2 font-light capitalize">
                {character?.name}
            </span>

            <div style={(character?.avatar?.style?.backgroundColor === "") ? { backgroundColor: "inherit" } : character?.avatar.style}
                className="relative w-[180px] h-[230px] rounded-md mb-2 shadow-md"
            >
                <Image
                    objectFit="cover"
                    alt={"bg profile"}
                    src={`${serverStaticDir}${character?.avatar.url}`}
                    layout="fill"
                />
            </div>
            <div className="p-2 flex justify-center items-center gap-2 flex-wrap rounded-t-[10%] transition-height duration-300 animate-appear-below opacity-0 group-hover:opacity-100 group-hover:h-[40%]  w-full h-[0%] absolute bottom-0 left-0 bg-amber-200 border-t-2 border-neutral-900">
                <div
                    onClick={handleDelete}
                    className="px-4 py-1 text-sm text-white rounded-lg hover:scale-105 bg-slate-900"
                >
                    🚫 Delete
                </div>
                <div
                    onClick={handleModify}
                    className="px-4 py-1 text-sm text-white rounded-lg hover:scale-105 bg-slate-900"
                >
                    ⚙️ Modify
                </div>
                <div
                    onClick={handleView}
                    className="px-4 py-1 text-sm text-white rounded-lg hover:scale-105 bg-slate-900"
                >
                    🖥️ View
                </div>
            </div>

        </div>

    )
}