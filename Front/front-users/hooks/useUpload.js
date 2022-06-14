// DEPENDENCIES
import { useState } from "react";
import { uploadFile } from "services/files";
// RESOURCES
import { serverHost } from "utils/globalVars";

export default function useUpload() {

    const [file, setFile] = useState(null);

    const handleUpload = async() => {
        if (!file) return;

        const formData = new FormData();
        formData.append("dir", file.dir);
        formData.append("type", file.type);

        // const files = file.files;

        for (const fileElement of file.files) {
            formData.append(`files[]`, fileElement);
        }

        return await uploadFile(formData);
    };

    return [file, setFile, handleUpload];
}