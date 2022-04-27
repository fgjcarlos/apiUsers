// DEPENDENCIES
import { ErrorMessage } from "formik";
import { Formik } from "formik";
import { Field } from "formik";
import { Form } from "formik";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { serverHost } from "utils/globalVars";

export default function FormUser({ onSubmit, typeForm, initialValues }) {

    const urlNamesUser = `${serverHost}/user/all`;
    const [countCharacters, setCountCharacters] = useState(0);

    return (
        <div className="w-[90%] lg:w-[40%] bg-slate-100 p-4 rounded-lg shadow-lg">
            <Toaster />

            <Formik
                initialValues={{
                    name: initialValues?.name || "",
                    password: initialValues?.password || "",
                    bio: initialValues?.bio || "",
                    rol: "user",
                }}
                validate={async values => {
                    const errors = {}; //** Search in db the entered name */

                    if (values.bio.length >= 0) {
                        setCountCharacters(values.bio.length)
                    }

                    if (values.name.length > 2 && typeForm === "register") {
                        const response = await fetch(urlNamesUser, {
                            method: "GET"
                        });
                        const {
                            users
                        } = await response.json();

                        if (users && users.find(user => user.name === values.name)) {
                            // if the name is already in the db
                            errors.name = "* The name is already in the db.";
                        }
                    }

                    if (values.password.length < 6) {
                        errors.password = "* The password must be at least 6 characters long.";
                    }

                    return errors;
                }}
                onSubmit={onSubmit}
                onChange={(e) => { console.log(e) }}
            >
                {({
                    isSubmitting
                }) => <Form className="flex flex-col gap-4 " autoComplete="false">

                        <div className="p-2">
                            <label className="block mb-2 font-bold" htmlFor="name">
                                Name
                            </label>
                            <Field type="text" name="name" className="w-11/12 p-1 border rounded-md" />
                            <ErrorMessage className='mt-1 text-sm text-red-600 ' name="name" component="div" />

                        </div>


                        {
                            typeForm === "register" && <div className="p-2">
                                <label className="block mb-2 font-bold " htmlFor="bio">
                                    Bio
                                </label>

                                <div className="relative">
                                    {/* // TODO --> eliminar div, befor, after o handlec🖐  */}
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

                            </div>
                        }

                        <div className="p-2">
                            <label className="block mb-2 font-bold" htmlFor="password">
                                Password
                            </label>
                            <Field type="password" name="password" className="w-11/12 p-1 border rounded-md" />
                            <ErrorMessage className='mt-1 text-sm text-red-600 ' name="password" component="div" />

                        </div>

                        <button className="self-center my-6 text-white bg-blue-600 border-none rounded-md cursor-pointer hover:bg-blue-700 w-28 h-9" type="submit" disabled={isSubmitting}>
                            Submit
                        </button>

                    </Form>}

            </Formik>

        </div>)
}
