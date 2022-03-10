// DEPENDENCIES
import { useRef } from 'react'
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
// COMPONENTS
import Button from "components/Button";
// HOOKS
import useUploadSingleAvatar from 'hooks/useUploadSingleFile';
import toast from 'react-hot-toast';

export default function UploadAvatar() {

    const router = useRouter()

    const [file, setFile, handleUpload] = useUploadSingleAvatar()

    const formRef = useRef();

    const inputChange = (e) => {
        if (!e.target.files?.length) return;
        setFile({
            file: e.target.files[0],
            dir: "avatars",
            type: "avatar"
        })
    }


    const throwSuccessToast = () => {
        toast.success('The file has been uploaded successfully.', {
            duration: 4000,
        })
    }

    const throwErrorToast = () => {
        toast.error('An error has occurred.', {
            duration: 4000,
        })
    }

    const onClick = async (e) => {

        e.preventDefault()

        if (file) {

            const response = await handleUpload()

            response.ok
                ? throwSuccessToast()
                : throwErrorToast()

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
                >Upload avatar</label>
                <input
                    className='cursor-pointer block w-4/5 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 truncate'
                    type="file"
                    name="file"
                    onChange={inputChange}
                />
                <Button onClick={onClick}>Upload</Button>
                <Toaster />
            </form>
        </div>
    )
}