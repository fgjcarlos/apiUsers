// DEPENDENCIES
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCheckToken() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
//    const [isToken, setIsToken] = useState(false);

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (!token && login) {
      dispatch({ type: "logout" });
    }

  }

//   return [isToken];
}
