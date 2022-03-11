// DEPENDENCIES
import { useRef } from 'react'
import { Toaster } from 'react-hot-toast';
// COMPONENTS
import Button from "components/Button";
// HOOKS
import useUploadAvatar from 'hooks/useUploadSingleFile';
// UTILS
import { throwSuccessToast, throwErrorToast, throwLoadingToast } from 'utils/toast'
import  { useState } from 'react';
import toast from 'react-hot-toast';

export default function UploadAvatar() {

    const [file, setFile, handleUpload] = useUploadAvatar()

    const formRef = useRef();

    const inputChange = (e) => {
        if (!e.target.files?.length) return;

        setFile({
            files: e.target.files,
            dir: "avatars",
            type: "avatar"
        })
    }

    const onClick = async (e) => {

        e.preventDefault()

        const messageLoading = "Uploading data... Wait please."
        const messageOk = "The file has been uploaded successfully."
        const messageError = "An error has occurred."
        const duration = 4000

        if (file) {

            const toastLoading = throwLoadingToast(messageLoading)

            const response = await handleUpload()

            toast.dismiss(toastLoading);

            response.ok
                ? throwSuccessToast(messageOk, duration)
                : throwErrorToast(messageError, duration)

            // *Reset form and state file
            formRef.current.reset()
            setFile(null)
        }

    }

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <form
                ref={formRef}
                className="bg-white rounded-2xl flex justify-evenly items-center flex-col h-2/3 w-3/5 shadow-2xl"
            >
                <label
                    htmlFor="avatar"
                    className='capitalize font-bold text-3xl'
                >Upload avatar/s</label>
                <input
                    className='cursor-pointer block w-4/5 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 truncate'
                    type="file"
                    name="file"
                    onChange={inputChange}
                    multiple={true}
                />
                <Button onClick={onClick}>Upload</Button>
                <Toaster />
            </form>
        </div>
    )
}