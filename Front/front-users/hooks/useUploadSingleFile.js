// DEPENDENCIES
import { useState } from "react";

export default function useUploadAvatar() {
  const urlServer = "http://192.168.1.135:3001/upload";

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("dir", file.dir);
    formData.append("type", file.type);

    const files = file.files;

    for (let i = 0; i < files.length; i++) {
      formData.append(`files[]`, files[i]);
    }

    const myPromise = await fetch(urlServer, {
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: formData,
    });

    return myPromise;
  };

  return [file, setFile, handleUpload];
}
