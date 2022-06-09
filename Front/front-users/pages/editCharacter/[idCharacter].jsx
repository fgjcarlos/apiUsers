// DEPENDENCIES
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// COMPONENTS
import FormCharacter from "components/FormCharacter";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { serverHost } from "utils/globalVars";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Spinner from "components/Spinner";

export default function EditCharacter(props) {


    const { avatars, character } = props

    dayjs.extend(utc)

    const dispatch = useDispatch();
    const formRef = useRef();
    // const character = useSelector(state => state.character);
    // const [character, setCharacter] = useState(null);
    const storeAvatar = useSelector((s) => s.avatar);
    const user = useSelector((s) => s.login);
    const router = useRouter()


    console.log("avatars", avatars);

    useEffect(() => {
        if (character) {
            // dispatch({ type: "@avatar/set", payload: character.avatar })
        }
    }, [character]) // eslint-disable-line


    const handleSubmit = async (values) => {

        const characterModified = {
            ...values,
            id: character.id,
            avatar: storeAvatar,
            name: values.name.toLowerCase(),
            profession: values.profession.toLowerCase(),
            Created_by: {
                name: user.name,
                id: user.id
            },
            birthday: dayjs(values.birthday).format()
        }

        const toastLoading = throwLoadingToast("Uploading data... Wait please.")

        const urlServer = `${serverHost}/character/modify`
        const response = await fetch(urlServer, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ...characterModified }),
        });

        toast.dismiss(toastLoading);

        if (response.ok) {
            throwSuccessToast("The character has been added successfully.", 5000)
            setTimeout(() => {
                router.push("/profile")
            }, 1000);
        } else {
            throwErrorToast("An error has occurred.", 6000)
        }

        // Reset modal confirm edit
        dispatch({ type: "@modalConfirm/reset" })

    }


    if (!character) return <Spinner />;

    return (
        <div className='flex flex-col items-center justify-center gap-4 p-4 pt-8'>
            <Toaster />
            <h1 className='text-2xl font-semibold'>
                Edit Character
            </h1>
            <p className='text-gray-700'>
                Create your characters fill out this form, remember that the maximum number of characters is 3.
            </p>

            <FormCharacter
                handleSubmit={handleSubmit}
                formRef={formRef}
                avatars={avatars}
                initialValues={character}
            />

        </div >

    )
}

export async function getStaticProps({ params }) {

    const [responseAvatars, characterResponse] = await Promise.all([
        fetch(`${serverHost}/avatar/all`),
        fetch(`${serverHost}/character/${params.idCharacter}`),
    ]);

    const [avatarsJson, characterJson] = await Promise.all([
        responseAvatars.json(),
        characterResponse.json()
    ]);

    return {
        props: {
            avatars: avatarsJson.avatars,
            character: characterJson.character
        }
    }
}

// This function gets called at build time
export async function getStaticPaths() {

    const res = await fetch(`${serverHost}/character/all`)
    const { characters } = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = characters.map((character) => ({
        params: { idCharacter: character.id.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths,
        fallback: false
    }
}