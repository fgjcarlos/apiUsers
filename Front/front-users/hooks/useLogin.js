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
import { serverHost } from "utils/globalVars";

export default function useLogin() {
  const [values, setValues] = useState(null);
  const urlLogin = `${serverHost}/user/login`;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let isSubscribed = true;

    const handleSubmit = async () => {
      const toastLoading = throwLoadingToast("Uploading data... Wait please.");

      const response = await fetch(urlLogin, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...values }),
      });

      const { token } = await response.json();

      toast.dismiss(toastLoading);

      if (response.ok && token) {
        localStorage.setItem("token", token);

        throwSuccessToast("Login successful!", 2000);

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

        router.push("/", null, { shallow: true });
      } else {
        throwErrorToast("Login failed!", 10000);
      }
    };

    if (values && isSubscribed) {
      handleSubmit();
    }
    return () => (isSubscribed = false);
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return [setValues];
}
