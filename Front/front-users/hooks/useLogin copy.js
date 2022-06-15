// DEPENDENCIES
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
    throwErrorToast,
    throwLoadingToast,
    throwSuccessToast,
} from "utils/toast";
// RESOURCES
import { getUser, userLogin } from "services/users";

export default function useLogin() {
    const [values, setValues] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        let isSubscribed = true;

        const handleSubmit = async() => {
            const toastLoading = throwLoadingToast("Uploading data... Wait please.");

            const token = await userLogin(values)

            toast.dismiss(toastLoading);

            if (token) {
                localStorage.setItem("token", token);

                throwSuccessToast("Login successful!", 2000);

                const user = await getUser()

                user ? handleLogin(user) : handleLogout()

            } else {
                throwErrorToast("Login failed!", 3000);
            }
        };

        if (values && isSubscribed) {
            handleSubmit();
        }
        return () => (isSubscribed = false);
    }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogin = (user) => {
        dispatch({ type: "login", payload: user });
        // router.push("/profile", null, { shallow: true });
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "logout", payload: null });
        // router.push("/login", null, { shallow: true });
    }

    return [setValues, handleLogin, handleLogout];
}