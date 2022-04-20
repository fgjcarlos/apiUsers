// DEPENDENCIES
import { ErrorMessage } from "formik";
import { Formik } from "formik";
import { Field } from "formik";
import { Form } from "formik";
import useCheckLogin from "hooks/useLogin";
import useCheckToken from "hooks/useToken";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { serverHost } from "utils/globalVars";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";

export default function Login() {

    const urlServer = `${serverHost}/user/login`;
    const dispatch = useDispatch();
    const router = useRouter()

    const messageLoading = "Uploading data... Wait please."
    const messageOk = "Login user successfully."
    const messageError = "An error has occurred."
    const duration = 1000
    const durationSuceess = 2000

    const handleSubmit = async (values, { setSubmitting }) => {

        const toastLoading = throwLoadingToast(messageLoading)

        const response = await fetch(urlServer, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ ...values }),
        });

        const { token } = await response.json()

        toast.dismiss(toastLoading);

        if (response.ok && token) {


            localStorage.setItem("token", token);

            throwSuccessToast(messageOk, durationSuceess)

            const resUserInfo = await fetch(`${serverHost}/user/info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const { user } = await resUserInfo.json();

            if (resUserInfo.ok && user) {
                dispatch({ type: "login", payload: user });
            } else {
                localStorage.removeItem("token");
                dispatch({ type: "logout", payload: null });
            }

                router.push('/', null, { shallow: true })

        } else {
            throwErrorToast(messageError, duration)
        }

    }

    return (
        <div>
            <Toaster />

            <Formik
                initialValues={{ name: '', password: '', }}
                validate={async (values) => {
                    const errors = {};

                    //** Search in db the entered name */

                    if (values.name.length > 2) {
                        // const response = await fetch(urlNamesUser, {
                        //     method: "GET",
                        // });

                        // const {users} = await response.json();

                        // if (users && users.find(user => user.name === values.name)) { 
                        //     // if the name is already in the db
                        //     errors.name = "* The name is already in the db."
                        // }

                    }

                    // if (values.password === "") {
                    //     errors.password = "* Required"
                    // }

                    return errors
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h1>Login</h1>

                        <div>
                            <label
                                className="block mb-2 font-bold"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <Field
                                type="text"
                                name="name"
                                className="w-11/12 p-1 border rounded-md"
                            />
                            <ErrorMessage
                                className='mt-1 text-sm text-red-600 '
                                name="name"
                                component="div" />

                        </div>

                        <div>
                            <label
                                className="block mb-2 font-bold"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                className="w-11/12 p-1 border rounded-md"
                            />
                            <ErrorMessage
                                className='mt-1 text-sm text-red-600 '
                                name="password"
                                component="div" />

                        </div>

                        <button
                            className="text-white bg-blue-600 border-none rounded-md cursor-pointer hover:bg-blue-700 w-28 h-9"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>

                    </Form>
                )}

            </Formik>

        </div>
    )

}