// DEPENDENCIES
import { useEffect } from "react";
import { useSelector } from "react-redux";
// HOOKS
import useLogin from "./useLogin";
// AUTH
import { isAuthenticated } from "Auth/auth";

export default async function useCheckSession() {

    const login = useSelector((state) => state.login);
    const [, updateUser, setUpdateUser] = useLogin();

    useEffect(() => {
        if ((typeof window !== "undefined") && !login && isAuthenticated) {
            setUpdateUser(!updateUser)
        }
    }, [login]); // eslint-disable-line react-hooks/exhaustive-deps
}