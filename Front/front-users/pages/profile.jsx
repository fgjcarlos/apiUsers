// DEPENDENCIES
import { useDispatch, useSelector } from "react-redux";
// RESOURCES
import BgProfile1 from 'public/images/profile/profile3.jpg'
import BgProfile2 from 'public/images/profile/profile2.jpg'
import Image from "next/image";
import { useRouter } from "next/router";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from "react";
import useIsMounted from 'hooks/useIsMounted';
import Button from "components/Button";
import { serverHost, serverStaticDir } from "utils/globalVars";
import ModalConfirm from "components/ModalConfirm";
import { Toaster } from "react-hot-toast";
import { throwSuccessToast } from "utils/toast"
import ModalViewAvatar from "components/ModalViewAvatar";

export default function Profile({ userData }) {

    const router = useRouter()
    const userLogin = useSelector(state => state.login);
    const [loaded] = useIsMounted()
    const [charactersUsers, setCharactersUsers] = useState(null)
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)
    const [characterSelected, setCharacterSelected] = useState(null)
    const [modalViewAvatar, setModalViewAvatar] = useState(false)

    const [modal, setShowModal] = useState(false)
    const titleModal = "Are you sure to modify the character?"

    dayjs.extend(customParseFormat)

    // TODO--> debug print
    // console.log(userLogin);

    const handleModifyCharacter = () => {
        const { character } = characterSelected

        dispatch({ type: "@character/set", payload: character });
        router.push("/editCharacter")
        
        // setShowModal(true)

    }

    const handleViewCharacter = () => {

    }

    const handleDeleteCharacter = async (id) => {

        let response = await fetch(`${serverHost}/user/character/${id}`, {
            method: "DELETE",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        if (response.status === 200) {
            throwSuccessToast("Character deleted successfully", 2000)
            setUpdateUser(true)
            setShowModal(false)
        }

    }

    const handleOperationsCharacter = () => {

        const { character } = characterSelected

        switch (characterSelected.action) {
            case "modify":
                handleModifyCharacter(character.id)
                break;
            case "delete":
                handleDeleteCharacter(character.id)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        let isSubscribed = true;

        const token = localStorage.getItem("token");

        const getCharacters = async () => {

            setSpinner(true)

            let response = await fetch(`${serverHost}/user/characters/${userLogin.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            let { characters } = await response.json()

            // Update user in login
            const resUserInfo = await fetch(`${serverHost}/user/info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const { user } = await resUserInfo.json();

            if (resUserInfo.ok && user) {
                dispatch({ type: "login", payload: user });
            }
            setCharactersUsers(characters)
            setSpinner(false)
        }

        userLogin && isSubscribed && getCharacters()

        if (!userLogin && charactersUsers) {
            router.push("/login");
            return null
        }

        return () => isSubscribed = false;

    }, [updateUser, router]) // eslint-disable-line react-hooks/exhaustive-deps


    if (!loaded) return "Loading..."

    const memberSince = dayjs(userLogin?.created_at).format('MMMM DD, YYYY')

    return (
        <div className='lg:w-[80%] box-content mx-auto p-4'>
            <Toaster />
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
                        <div className="relative w-[160px] h-[160px]  shadow-lg shadow-slate-600  overflow-hidden lg:w-[230px] lg:h-[230px] bg-gray-100 rounded-full ">
                            <Image
                                objectFit="none"
                                alt={userLogin?.name}
                                // src={BgProfile2}
                                src={`${serverStaticDir}${userLogin?.profilePhoto.url}`}
                                layout="fill"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h1 className="m-0 text-[36px] lg:text-[48px] font-semibold text-gray-800  capitalize font-moonRocks">{userLogin?.name}</h1>
                <p className="text-sm text-gray-500">
                    {`Member since ${memberSince}`}
                </p>
                {
                    userLogin?.bio &&
                    <p className="text-left w-[60%] mx-auto my-4 text-gray-700">
                        {userLogin?.bio}
                    </p>
                }
                <Button onClick={() => router.push("/editProfile")}>
                    Edit Profile
                </Button>
            </div>

            <div className="p-2 my-4 text-center rounded-2xl bg-slate-500">
                <h2 className="text-lg font-semibold ">Characters created</h2>
                <div className="flex flex-col flex-wrap items-center justify-center gap-4 p-4 lg:flex-row lg:justify-between ">
                    {
                        (charactersUsers && !spinner)
                            ? charactersUsers.map(character =>
                                <div
                                    className="relative box-content group cursor-pointer px-1 py-2 bg-[#fcfcfc] w-[200px] h-[250px] rounded-md shadow-md flex flex-col justify-center items-center"
                                    key={character.id}
                                >
                                    <span className="self-start p-2 font-light text-">{character?.name}</span>


                                    <div
                                        style={(character?.avatar?.style?.backgroundColor === "") ? { backgroundColor: "inherit" } : character?.avatar.style}
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
                                            onClick={() => { setShowModal(true); setCharacterSelected({ character, action: "delete" }) }}
                                            className="px-4 py-1 text-sm text-white rounded-lg hover:scale-105 bg-slate-900">🚫 Delete</div>
                                        <div
                                            onClick={() => { setShowModal(true); setCharacterSelected({ character, action: "modify" }) }}
                                            className="px-4 py-1 text-sm text-white rounded-lg hover:scale-105 bg-slate-900">⚙️ Modify</div>
                                        <div
                                            onClick={() => { setModalViewAvatar(true); setCharacterSelected({ character, action: "" }) }}
                                            className="px-4 py-1 text-sm text-white rounded-lg hover:scale-105 bg-slate-900">🖥️ View</div>
                                    </div>

                                </div>
                            )
                            : spinner
                                ? <p>Loading</p>
                                : <p>You havent created any characters yet</p>

                    }
                </div>
            </div>

            {userLogin && (userLogin.quantityCharacters < 3)
                &&
                <Button onClick={() => router.push("/addcharacter")}>Add character</Button>

            }

            {
                modal &&
                <ModalConfirm title={titleModal} onConfirm={handleOperationsCharacter} onCancel={() => setShowModal(false)} />
            }

            {
                modalViewAvatar && characterSelected && <ModalViewAvatar onExit={() => setModalViewAvatar(false)} character={characterSelected.character} />
            }

        </div>
    )
}
