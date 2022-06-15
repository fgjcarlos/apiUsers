// DEPENDENCIES
import { Toaster } from "react-hot-toast";
// COMPONENTS
import FormUser from "components/FormUser";
// HOOKS
import useLogin from "hooks/useLogin";

export default function Login() {

    const [handleAuthenticated] = useLogin()

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 ">
            <Toaster />
            <h1 className="text-xl font-bold capitalize ">Login</h1>
            <FormUser
                onSubmit={(values) => handleAuthenticated(values)}
                typeForm={"login"}
            />
        </div>
    )

}