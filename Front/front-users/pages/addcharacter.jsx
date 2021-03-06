// DEPENDENCIES
import {  useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
// COMPONENTS
// RESOURCES
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from 'utils/toast';
import FormCharacter from 'components/FormCharacter';
import { getAvatars } from 'services/avatars';
import { createCharacter } from 'services/characters';

export default function Addcharacter(props) {

    dayjs.extend(utc)

    const { avatars } = props
    const formRef = useRef();
    const router = useRouter()

    const dispatch = useDispatch();
    const storeAvatar = useSelector((s) => s.avatar);
    const user = useSelector((s) => s.login);

    useEffect(() => {
        dispatch({ type: "@avatar/reset" })
    }, []) // eslint-disable-line

    const handleSubmit = async (values, { setSubmitting }) => {

        if (!storeAvatar) return

        const character = {
            ...values,
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

        const response = await createCharacter(character)

        toast.dismiss(toastLoading)

        // *Reset form and avatar
        if (response.ok) {
        
            throwSuccessToast("The character has been added successfully.", 2000)

            setTimeout(() => {
                formRef.current.reset()
                dispatch({ type: "@avatar/reset" })
                router.push("/profile")
            }, 2000);
        }else {
            throwErrorToast("An error has occurred.", 2000)
        }

    }

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
            />

        </div >

    )

}

export async function getStaticProps() {

    const avatars = await getAvatars()

    return {
        props: avatars,
    }
}
