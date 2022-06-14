// DEPENDENCIES
import toast from "react-hot-toast";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// COMPONENTS
import FormUser from 'components/FormUser';
// RESOURCES
import { serverHost } from "utils/globalVars";
// HOOKS
import useLogin from "hooks/useLogin";
import Spinner from "components/Spinner";
import { getUser, userRegister } from "services/users";
import { getProfilePhotos } from "services/profilePhoto";


export default function EditProfile({ profilePhoto }) {

    // const user = useSelector(state => state.login);
    const router = useRouter();
    const dispatch = useDispatch();
    const [userEdit, setUserEdit] = useState(null)

    useEffect(() => {

        const fetchUserInfo = async () => {

            const user = await getUser()

            if (user) {
                setUserEdit(user);
            }
        }

        if (!userEdit) {
            fetchUserInfo();
        }

    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const handleSubmit = async (values) => {

        // Name in lowerCase
        values.name = values.name.toLowerCase();
        values.id = userEdit.id

        const toastLoading = throwLoadingToast("Uploading data... Wait please.")

        const response = await userRegister(values)

        toast.dismiss(toastLoading);

        if (response.ok) {
            throwSuccessToast("User edited successfully.", 2000)
            // Login
            setTimeout(async () => {
                dispatch({ type: "login", payload: values });
                router.push("/profile", null, { shallow: true });
            }, 1000);
        } else {
            throwErrorToast("Error creating user.", 3000)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center p-8 '>
            <h1 className="mb-2 text-2xl font-semibold">Edit Profile</h1>
            <Spinner show={!userEdit} />

            <FormUser
                show={userEdit}
                onSubmit={handleSubmit}
                initialValues={userEdit}
                profilesPhoto={profilePhoto.profilePhotos}
                typeForm="edit"
            />

        </div>
    )
}

export async function getStaticProps() {

    const profilePhoto = await getProfilePhotos();

    return {
        props: {
            profilePhoto,
        }
    }
}