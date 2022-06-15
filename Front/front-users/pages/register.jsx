// DEPENDENCIES
import toast from "react-hot-toast";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";
// COMPONENTS
import FormUser from 'components/FormUser';
// HOOKS
import useLogin from "hooks/useLogin";
// RESOURCES
import { serverHost } from "utils/globalVars";
// SERVICES
import { userRegister } from "services/users";
import {getProfilePhotos} from "services/profilePhoto";

export default function Register({profilePhoto}) {

    const [handleAuthenticated] = useLogin()


    const handleSubmit = async (values) => {

        // Name in lowerCase
        values.name = values.name.toLowerCase();

        const toastLoading = throwLoadingToast("Uploading data... Wait please.")

        const response = await userRegister(values)

        toast.dismiss(toastLoading);

        if (response.ok) {
            throwSuccessToast("User created successfully.", 2000)
            // Login
            setTimeout(async () => {
                await handleAuthenticated(values)
            }, 1000);
        } else {
            throwErrorToast("Error creating user.", 3000)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 ">
            <h1 className="text-xl font-bold capitalize ">Register</h1>
            <FormUser onSubmit={handleSubmit} typeForm={"register"} profilesPhoto={profilePhoto.profilePhotos}/>
        </div>
    )
}

export async function getStaticProps() {
    
    // const response = await fetch(`${serverHost}/profilePhoto/all`);
    const profilePhoto = await getProfilePhotos()

    return{
        props: {
            profilePhoto,
        }
    }
}