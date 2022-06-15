import toast from "react-hot-toast";
import { userLogin } from "services/users";
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from "utils/toast";

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

// export const handleAuthenticated = async(user) => {
//     const toastLoading = throwLoadingToast("Uploading data... Wait please.");
//     // Authenticate user
//     const token = await userLogin(user);

//     toast.dismiss(toastLoading);

//     if (token) {
//         // set token in localStorage
//         setToken(token);
//         throwSuccessToast("User authenticated", 2000);
//     } else {
//         throwErrorToast("Authenticated failed!", 2000);
//     }
// };