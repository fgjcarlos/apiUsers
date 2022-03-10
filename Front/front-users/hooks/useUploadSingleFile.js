// DEPENDENCIES
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUploadSingleAvatar() {
  const urlServer = "http://192.168.1.135:3001/upload/single/avatar";

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file.file);
    formData.append("dir", file.dir);
    formData.append("type", file.type);

    const myPromise = fetch(urlServer, {
      method: "POST",
      body: formData,
    });

    await toast.promise(
      myPromise,
      {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      },
      {
        success: {
          duration: 5000,
        },
      }
    );

    return myPromise;
  };

  return [file, setFile, handleUpload];
}
