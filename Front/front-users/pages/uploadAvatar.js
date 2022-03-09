// DEPENDENCIES
import { useState } from 'react'
// COOMPONENTS
import Button from "components/Button";

export default function UploadAvatar() {

    const [avatar, setAvatar] = useState(null)
    const urlServer = "http://192.168.1.135:3001/upload"

    // TODO --> Make a custom hook useUploadSingleFile, add type to save in back in correct dir


    const handleUpload = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", avatar)

        const response = await fetch(urlServer, {
            method: "POST",
            body: formData,
        })

        if(response.ok){
            console.log("El archivo se ha subido correctamente");
        }else {
            console.log("Ha ocurrido un error en la subida del archivo");
        }

    }

    const inputChange = (e) => {

        if (!e.target.files?.length) {
            return;
        }

        setAvatar(e.target.files[0])
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
            <form className="bg-white rounded-2xl flex justify-evenly items-center flex-col h-2/3 w-3/5 shadow-2xl">
                <label htmlFor="avatar">Upload avatar</label>
                <input type="file" name="file" onChange={inputChange} />
                <Button onClick={handleUpload}>Upload</Button>
            </form>
        </div>
    )
}