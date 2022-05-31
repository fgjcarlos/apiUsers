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

export default function EditCharacter({avatars}) {

    dayjs.extend(utc)

    const dispatch = useDispatch();
    const formRef = useRef();
    const character = useSelector(state => state.character);
    const storeAvatar = useSelector((s) => s.avatar);
    const user = useSelector((s) => s.login);
    const router = useRouter()


    useEffect(() => {
        character && dispatch({ type: "@avatar/set", payload: character.avatar })
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
            body: JSON.stringify({...characterModified }),
        });

        toast.dismiss(toastLoading);

        response.ok
            ? throwSuccessToast("The character has been added successfully.", 10000)
            : throwErrorToast("An error has occurred.", 6000)

                    // *Reset form and avatar
        response.ok && setTimeout(() => {
            router.push("/profile")
        }, 2000);

    }

    if(!character) return "Loading..."


    return (
        <div className='flex flex-col items-center justify-center gap-4 p-4 pt-8'>
            <Toaster />
            <h1 className='text-2xl font-semibold'>
                Add Character
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

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    let response = await fetch(`${serverHost}/avatar/all`)

    let avatars = await response.json()

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: avatars,
    }
}