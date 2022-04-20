// DEPENDENCIES
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverHost } from "utils/globalVars";

export default async function useCheckSession() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token && !login) {

        console.log("Exist TOKEN but not login, waiting for fetching user info...")

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

    }
    if (!token && login) {
        dispatch({ type: "logout", payload: null });
    }

  }
}
