// DEPENDENCIES
import toast from "react-hot-toast";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";
// COMPONENTS
import FormUser from 'components/FormUser';
// HOOKS
import useLogin from "hooks/useLogin";
// RESOURCES
import { serverHost } from "utils/globalVars";

export default function Register() {

    const [setValues] = useLogin()

    const urlRegister = `${serverHost}/user/register`;

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
                setValues(values)
            }, 1000);
        } else {
            throwErrorToast("Error creating user.", 10000)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 ">
            <h1 className="text-xl font-bold capitalize ">Register</h1>
            <FormUser onSubmit={handleSubmit} typeForm={"register"} />
        </div>
    )
}