// DEPENDENCIES
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Toaster } from "react-hot-toast";
// COMPONENTS
import ListCardCharacters from "components/ListCardCharacters";
import ModalViewAvatar from "components/ModalViewAvatar";
import ModalConfirm from "components/ModalConfirm";
import Button from "components/Button";
import Spinner from "components/Spinner";
import ProfileHero from "components/ProfileHero";
// HOOKS
import { useProfile } from "hooks/useProfile";
import useIsMounted from 'hooks/useIsMounted';
// RESOURCES

export default function Profile() {

    const router = useRouter()
    const [spinner, charactersUsers, handleOperationsCharacter] = useProfile(router);
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.login);
    const character = useSelector(state => state.character);
    const modalConfirm = useSelector(state => state.modalConfirm);
    const modalViewAvatar = useSelector(state => state.modalViewCharacter);
    const [loaded] = useIsMounted()
    const titleModal = "Are you sure to modify the character?"
    const memberSince = dayjs(userLogin?.created_at).format('MMMM DD, YYYY')
    dayjs.extend(customParseFormat)

    // TODO--> debug print
    // console.log("maxCharacter", maxCharacter);

    if (!loaded) return <Spinner />

    return (
        <div className='lg:w-[80%] box-content mx-auto p-4'>
            <Toaster />
            <ProfileHero />

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
                <Button
                    show={true}

                    onClick={() => router.push("/editProfile")}>
                    Edit Profile
                </Button>
            </div>

            <div className="p-2 my-4 text-center rounded-2xl bg-slate-500">
                <h2 className="text-lg font-semibold ">Characters created</h2>
                <div className="flex flex-col flex-wrap items-center justify-center gap-4 p-4 lg:flex-row lg:justify-between ">

                    <ListCardCharacters
                        show={charactersUsers && !spinner}
                        charactersUsers={charactersUsers}
                    />

                    <Spinner show={spinner} />

                    {
                        !spinner && !charactersUsers &&
                        <p>You havent created any characters yet</p>

                    }

                </div>
            </div>

            <Button
                show={(userLogin?.quantityCharacters < 3)}
                onClick={() => router.push("/addcharacter")}
            >
                Add character
            </Button>

            <ModalConfirm
                show={modalConfirm}
                title={titleModal}
                onConfirm={handleOperationsCharacter}
                onCancel={() => dispatch({ type: "@modalConfirm/reset" })}
            />

            <ModalViewAvatar
                show={modalViewAvatar && character}
                onExit={() => dispatch({ type: "@viewModal/reset" })}
                character={character}
            />

        </div>
    )
}
