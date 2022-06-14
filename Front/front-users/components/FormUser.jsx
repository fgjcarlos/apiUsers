// DEPENDENCIES
import { ErrorMessage } from "formik";
import { Formik } from "formik";
import { Field } from "formik";
import { Form } from "formik";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { serverHost, serverStaticDir } from "utils/globalVars";
import Button from "./Button";
import Modal from "./Modal";
// RESOURCES    
import DefaultImgProfile from 'public/avatarDefault.png'
import { useEffect } from "react";

export default function FormUser({ onSubmit, typeForm, initialValues, profilesPhoto, show=true }) {

    const urlNamesUser = `${serverHost}/user/all`;
    const [countCharacters, setCountCharacters] = useState(0);
    const [profilePhoto, setProfilePhoto] = useState(initialValues?.profilePhoto ?? null)
    const [showModal, setShowModal] = useState(false)
    const imgDefaultRegister = initialValues?.profilePhoto?.url ? `${serverStaticDir}${profilePhoto?.url}` : DefaultImgProfile

    useEffect(() => {
        if (initialValues && show) {
                setProfilePhoto(initialValues.profilePhoto)
        }
    }, [show, initialValues]);

    if (!show) return null;

    return (
        <div className="w-[90%] lg:w-[40%]  bg-slate-100 p-4 rounded-lg shadow-lg">
            <Toaster />

            {
                showModal &&
                <Modal>
                    <div
                        className="flex flex-wrap items-center justify-around w-full h-full gap-2 p-4 bg-white"
                    >
                        {
                            profilesPhoto.map(photo =>
                                <div
                                    key={photo.id}
                                    onClick={() => {
                                        setProfilePhoto(photo)
                                        setShowModal(false)
                                    }}
                                    className="rounded-[50%] hover:scale-105 hover:shadow-lg hover:shadow-red-400 cursor-pointer relative h-[150px] w-[150px]">
                                    <Image
                                        // lazyRoot={lazyRoot}
                                        className="text-sm text-center "
                                        objectFit="contain"
                                        alt={photo?.name}
                                        src={`${serverStaticDir}${photo?.url}`}
                                        // lazyBoundary="200px"
                                        layout="fill"
                                    />
                                </div>

                            )
                        }
                    </div>

                </Modal>
            }

            <Formik
                initialValues={{
                    name: initialValues?.name || "",
                    password: "",
                    bio: initialValues?.bio || "",
                    rol: "user",
                }}
                validate={async values => {
                    const errors = {}; //** Search in db the entered name */

                    if (values.bio.length >= 0) {
                        setCountCharacters(values.bio.length)
                    }

                    if (values.name.length > 2) {
                        const response = await fetch(urlNamesUser, {
                            method: "GET"
                        });
                        const {
                            users
                        } = await response.json();

                        if (typeForm === "register" && users && users.find(user => user.name === values.name)) {
                            // if the name is already in the db
                            errors.name = "* The name is already in the db.";
                        }

                        if (typeForm === "edit" && users && users.find(user => (user.name === values.name) && (values.name !== initialValues.name))) {
                            // if the name is already in the db
                            errors.name = "* The name is already in the db.";
                        }



                    }

                    if (typeForm === "register" && values.password.length < 6) {
                        errors.password = "* The password must be at least 6 characters long.";
                    }

                    return errors;
                }}
                onSubmit={values => {
                    values.profilePhoto = profilePhoto
                    onSubmit(values)
                }}
                onChange={(e) => { console.log(e) }}
            >
                {({
                    isSubmitting
                }) => <Form className="flex flex-col gap-4 " autoComplete="false">

                        {
                            typeForm !== "login" &&
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="rounded-[50%] relative h-[150px] w-[150px] bg-white">
                                    <Image
                                        // lazyRoot={lazyRoot}
                                        className="text-sm rounded-[50%]"
                                        objectFit="contain"
                                        alt="Profile photo"
                                        src={imgDefaultRegister}
                                        // lazyBoundary="200px"
                                        layout="fill"
                                    />
                                </div>

                                <Button 
                                show={true}
                                onClick={e => {
                                    e.preventDefault()
                                    setShowModal(true)
                                }}
                                >
                                    Select photo
                                </Button>

                            </div>


                        }

                        <div className="p-2">
                            <label className="block mb-2 font-bold" htmlFor="name">
                                Name
                            </label>
                            <Field type="text" name="name" className="w-11/12 p-1 border rounded-md" />
                            <ErrorMessage className='mt-1 text-sm text-red-600 ' name="name" component="div" />

                        </div>


                        {typeForm !== "login" && <div className="p-2">
                            <label className="block mb-2 font-bold " htmlFor="bio">
                                Bio
                            </label>

                            <div className="relative">
                                <Field
                                    as="textarea"
                                    maxLength="140"
                                    placeholder="max 140 chars."
                                    name="bio"
                                    className="  h-[130px] w-11/12 p-2 border rounded-md"
                                />
                                <span className="absolute text-xs font-light text-gray-500 bottom-1 right-12">
                                    {`${countCharacters}/140`}
                                </span>

                            </div>



                            <ErrorMessage className='mt-1 text-sm text-red-600 ' name="bio" component="div" />

                        </div>}


                        {
                            typeForm !== "edit" &&
                            <div className="p-2">
                                <label className="block mb-2 font-bold" htmlFor="password">
                                    Password
                                </label>
                                <Field type="password" name="password" className="w-11/12 p-1 border rounded-md" />
                                <ErrorMessage className='mt-1 text-sm text-red-600 ' name="password" component="div" />

                            </div>
                        }

                        <button className="self-center my-6 text-white bg-blue-600 border-none rounded-md cursor-pointer hover:bg-blue-700 w-28 h-9" type="submit" disabled={isSubmitting}>
                            Submit
                        </button>

                    </Form>}

            </Formik>

        </div>)
}
