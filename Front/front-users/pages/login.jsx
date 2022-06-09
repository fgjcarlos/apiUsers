// DEPENDENCIES
import useLogin from "hooks/useLogin";
import { Toaster } from "react-hot-toast";
// COMPONENTS
import FormUser from "components/FormUser";

export default function Login() {

    const [setValues] = useLogin()

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 ">
            <Toaster />
            <h1 className="text-xl font-bold capitalize ">Login</h1>
            <FormUser onSubmit={(values)=>setValues(values)} typeForm={"login"} show={true} />
        </div>
    )

}