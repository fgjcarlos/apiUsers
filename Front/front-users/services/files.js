import { urlUploadFiles } from "utils/globalVars";

export const uploadFile = async(formData) => {
    return await fetch(urlUploadFiles, {
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: formData,
    });

}