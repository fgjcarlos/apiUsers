import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverHost } from "utils/globalVars";

export default function useCheckLogin(isLogin) {
  const dispatch = useDispatch();


  useEffect(() => {


    let isSubscribed = true;

    let token = localStorage.getItem("token");

    const fetchGetUserInfo = async () => {
      const resUserInfo = await fetch(`${serverHost}/user/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      // convert the data to json
      const { user } = await resUserInfo.json();


      // set state with the result if `isSubscribed` is true
      if (isSubscribed && resUserInfo.ok) {
        dispatch({ type: "login", payload: user });
      } else {
        localStorage.removeItem("token");
        dispatch({ type: "logout", payload: null });
      }
    };


    if(token && !isLogin) {
        fetchGetUserInfo().catch(console.error)
    }else if (!token) {
        console.log("logout")
        dispatch({ type: "logout", payload: null });
    }

    // token
    //   ? fetchGetUserInfo().catch(console.error)
    //   : dispatch({ type: "logout", payload: null });

    // cancel any future `setData`
    return () => (isSubscribed = false);
  }, [isLogin]);

}
