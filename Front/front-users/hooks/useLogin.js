// DEPENDENCIES
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

// RESOURCES
import { getUser, userLogin } from "services/users";
import {
    throwErrorToast,
    throwLoadingToast,
    throwSuccessToast,
} from "utils/toast";
import { isAuthenticated, removeToken, setToken } from "../Auth/auth";

export default function useLogin() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [updateUser, setUpdateUser] = useState(null);

    useEffect(() => {

        let isSubscribed = true;

        const fetchGetUserInfo = async() => {
            if (isAuthenticated()) {
                await handleLogin();
            }
        };

        isSubscribed && fetchGetUserInfo();

        return () => (isSubscribed = false);
    }, [updateUser]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogout = () => {
        removeToken();
        dispatch({ type: "logout", payload: null });
        // router.push("/login", null, { shallow: true });
    };

    const handleLogin = async() => {
        const user = await getUser();

        if (user) {
            dispatch({ type: "login", payload: user });
            //   router.push("/profile", null, { shallow: true });
        } else {
            handleLogout();
        }
    };

    const handleAuthenticated = async(user) => {
        const toastLoading = throwLoadingToast(
            "Checking authentication... Wait please."
        );
        // Authenticate user
        const token = await userLogin(user);

        toast.dismiss(toastLoading);

        if (token) {
            // set token in localStorage
            setToken(token);
            router.push("/profile", null, { shallow: true });
            throwSuccessToast("User authenticated", 2000);
        } else {
            throwErrorToast("Authenticated failed!", 2000);
        }

        setUpdateUser(!updateUser);
    };

    return [handleAuthenticated, updateUser, setUpdateUser];
}