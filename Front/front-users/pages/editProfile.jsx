// DEPENDENCIES
import toast from "react-hot-toast";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";
import { useDispatch, useSelector } from "react-redux";
// COMPONENTS
import FormUser from 'components/FormUser';
// RESOURCES
import { serverHost } from "utils/globalVars";
// HOOKS
import useLogin from "hooks/useLogin";
import { useRouter } from "next/router";


export default function EditProfile({ profilePhoto }) {

    const user = useSelector(state => state.login);
    const [setValues] = useLogin()
    const router = useRouter();


    const dispatch = useDispatch();

    const urlRegister = `${serverHost}/user/update_profile`;

    const handleSubmit = async (values) => {

        // Name in lowerCase
        values.name = values.name.toLowerCase();
        values.id = user.id

        const toastLoading = throwLoadingToast("Uploading data... Wait please.")

        const response = await fetch(urlRegister, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            method: "PATCH",
            body: JSON.stringify({ ...values }),
        });

        toast.dismiss(toastLoading);

        if (response.ok) {
            throwSuccessToast("User edited successfully.", 2000)
            // Login
            setTimeout(async () => {
                // set Login and redirect home page
                //setValues(values)
                dispatch({ type: "login", payload: values });
                router.push("/profile", null, { shallow: true });

            }, 1000);
        } else {
            throwErrorToast("Error creating user.", 10000)
        }
    }


    return (
        <div className=''>
            <h1>Edit Profile</h1>

            <FormUser onSubmit={handleSubmit} initialValues={user} profilesPhoto={profilePhoto.profilePhotos} typeForm="edit" />

        </div>
    )
}

export async function getStaticProps() {

    const response = await fetch(`${serverHost}/profilePhoto/all`);
    const profilePhoto = await response.json();

    return {
        props: {
            profilePhoto,
        }
    }
}