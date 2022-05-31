// DEPENDENCIES
import toast from "react-hot-toast";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";
// COMPONENTS
import FormUser from 'components/FormUser';
// HOOKS
import useLogin from "hooks/useLogin";
// RESOURCES
import { serverHost } from "utils/globalVars";

export default function Register({profilePhoto}) {

    const [setValues] = useLogin()


    const urlRegister = `${serverHost}/user/register`;


   // console.log('%cDEBUG:', 'color: #ff25e2; background: #1d1b1b; padding: 2px;', profilePhoto);

    const handleSubmit = async (values) => {

        // Name in lowerCase
        values.name = values.name.toLowerCase();


        const toastLoading = throwLoadingToast("Uploading data... Wait please.")

        const response = await fetch(urlRegister, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ ...values }),
        });

        toast.dismiss(toastLoading);

        if (response.ok) {
            throwSuccessToast("User created successfully.", 2000)
            // Login
            setTimeout(async () => {
                // set Login and redirect home page

                console.log(values)
                setValues(values)
            }, 1000);
        } else {
            throwErrorToast("Error creating user.", 10000)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 ">
            <h1 className="text-xl font-bold capitalize ">Register</h1>
            <FormUser onSubmit={handleSubmit} typeForm={"register"} profilesPhoto={profilePhoto.profilePhotos} />
        </div>
    )
}

export async function getStaticProps() {
    
    const response = await fetch(`${serverHost}/profilePhoto/all`);
    const profilePhoto = await response.json();

    return{
        props: {
            profilePhoto,
        }
    }
}