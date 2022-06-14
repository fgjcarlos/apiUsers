// DEPENDENCIES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "services/users";
import { serverHost } from "utils/globalVars";

export default async function useCheckSession() {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.login);

    useEffect(() => {


        let isSubscribed = true;

        const fetchGetUserInfo = async(token, login) => {
            if (token && !login) {

                console.log("Exist TOKEN but not login, waiting for fetching user info...")


                const user = await getUser()

                if (user) {
                    dispatch({ type: "login", payload: user });
                } else {
                    localStorage.removeItem("token");
                    dispatch({ type: "logout", payload: null });
                }

            }
            if (!token && login) {
                dispatch({ type: "logout", payload: null });
            }

        }


        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            fetchGetUserInfo(token, login);
        }

        // cancel any future `setData`
        return () => (isSubscribed = false);
    }, [login]); // eslint-disable-line react-hooks/exhaustive-deps
}