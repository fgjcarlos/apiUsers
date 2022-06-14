// DEPENDENCIES
import { useRef } from 'react'
import { Toaster } from 'react-hot-toast';
// COMPONENTS
import Button from "components/Button";
// HOOKS
import useUpload from 'hooks/useUpload';
// UTILS
import { throwSuccessToast, throwErrorToast, throwLoadingToast } from 'utils/toast'
import toast from 'react-hot-toast';


export default function FormUpload({ show = true, dir, type, onDone }) {

    const [file, setFile, handleUpload] = useUpload()

    const formRef = useRef();

    if (!show) return null

    const inputChange = (e) => {
        if (!e.target.files?.length) return;

        setFile({
            files: e.target.files,
            dir: dir ?? "",
            type: type ?? ""
        })
    }

    const onClick = async (e) => {

        e.preventDefault()

        if (file) {

            const toastLoading = throwLoadingToast("Uploading data... Wait please.")

            const response = await handleUpload()

            toast.dismiss(toastLoading);

            response.ok
                ? throwSuccessToast("The file has been uploaded successfully.", 4000)
                : throwErrorToast("An error has occurred.", 4000)

            // *Reset form and state file
            formRef.current.reset()
            setFile(null)
            onDone()
        }

    }

    return (
        <form
            ref={formRef}
            className="relative w-[90%] flex flex-col items-center p-4 bg-white shadow-2xl rounded-2xl justify-evenly md:w-[60%] h-[350px]"
        >
            <label
                htmlFor="avatar"
                className='text-3xl font-bold capitalize text'
            >
                {`Upload ${type}`}
            </label>
            <input
                className='block w-4/5 text-sm truncate cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
                type="file"
                name="file"
                onChange={inputChange}
                multiple={true}
            />
            <Button onClick={onClick}>
                Upload
            </Button>

            <Button
                classButton={'h-[40px] bg-green-300 border-2 border-green-400 hover:bg-green-400  w-[40px] absolute bottom-0 right-10 text-base p-0 m-0'}
                onClick={onDone}
            >
                ↩️
            </Button>
            <Toaster />
        </form >

    )
}