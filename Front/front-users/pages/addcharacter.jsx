import { ChooseAvatar } from './../components/ChooseAvatar';
// DEPENDENCIES
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import { Formik, Field, ErrorMessage, Form } from "formik";
import toast, { Toaster } from 'react-hot-toast';
// COMPONENTS
import ChooseBgAvatar from '../components/ChooseBgAvatar';
import Modal from '../components/Modal';
import Button from "components/Button";
import { Avatar } from 'components/Avatar';
// RESOURCES
import AvatarDefault from 'public/avatarDefault.png'
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from 'utils/toast';

export default function Addcharacter(props) {

    const { avatars } = props
    const formRef = useRef();

    const [showModalChooseAvatar, setShowModalChooseAvatar] = useState(false)
    const [showModalChooseBgAvatar, setShowModalChooseBgAvatar] = useState(false)

    const listInterests = ["sports", "music", "travel", "cuture"]

    const dispatch = useDispatch();
    const storeAvatar = useSelector((s) => s.avatar);

    const handleSetChooseAvatar = (e) => {
        e.preventDefault()
        setShowModalChooseAvatar(true)
    }

    const handleConfigAvatar = (e) => {
        e.preventDefault()
        setShowModalChooseAvatar(false)
        setShowModalChooseBgAvatar(true)
    }

    // Max and min date
    // Max date -> 120 years
    // Min date --> date now - 18 year

    const handleSubmit = async (values, { setSubmitting }) => {

        const urlServer = "http://192.168.1.135:3001/character/add";

        const messageLoading = "Uploading data... Wait please."
        const messageOk = "The character has been added successfully."
        const messageError = "An error has occurred."
        const duration = 10000

        // e.preventDefault()

        // TODO -> Created_by and time to utc
        const character = { ...values, avatar: storeAvatar, Created_by: "admin", birthday: Date.UTC(), }

        const toastLoading = throwLoadingToast(messageLoading)

        const response = await fetch(urlServer, {
            method: "POST",
            body: JSON.stringify({ ...character }),
        });

        toast.dismiss(toastLoading);

        response.ok
            ? throwSuccessToast(messageOk, duration)
            : throwErrorToast(messageError, duration)

        // *Reset form and avatar
        /// TODO -> reset created_by, 
        setTimeout(() => {
            formRef.current.reset()
            dispatch({ type: "@avatar/reset" })
        }, 2000);
    }

    return (
        <>
            <div>
                <Toaster />
                <h1>Add Character</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro consequatur impedit quaerat omnis quis voluptatibus commodi culpa molestias, perspiciatis neque similique, rem laudantium veniam eligendi? Est consequuntur odio corporis.
                    Reprehenderit vel quibusdam excepturi. Dignissimos tempore adipisci saepe? Excepturi, vero nesciunt quod repellat facilis laboriosam iste necessitatibus a inventore natus delectus porro ipsam! Delectus modi, nisi tempore quo nobis illo!
                </p>

                {showModalChooseAvatar &&
                    <Modal>
                        <ChooseAvatar
                            avatars={avatars}
                            onExit={() => setShowModalChooseAvatar(false)}
                            onDone={handleConfigAvatar}
                        />
                    </Modal>
                }
                {
                    showModalChooseBgAvatar &&
                    <Modal>
                        <ChooseBgAvatar
                            handleSetChooseAvatar={handleSetChooseAvatar}
                            onDone={() => setShowModalChooseBgAvatar(false)}
                        />
                    </Modal>
                }


                <Formik
                    initialValues={{ name: '', birthday: '', profession: '', interests: "", gender: "", biography: "" }}
                    validate={values => {
                        const errors = {};

                        // if (values.name.length < 1) {
                        //     errors.name = "* Required"
                        // }

                        // if (values.birthday === "") {
                        //     errors.birthday = "* Required"
                        // }



                        return errors
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form
                            ref={formRef}

                            className="md:w-1/2 xl:w-2/5 w-11/12 min-w-[300px] mx-auto my-0 mt-10 flex justify-center flex-col p-10 shadow-xl rounded border  h-auto gap-5"
                        >


                            <div >
                                <h2 className='mb-2 font-bold'>
                                    Avatar
                                </h2>
                                <div className='flex flex-wrap items-center justify-start gap-10'>


                                    {
                                        storeAvatar
                                            ?
                                            <div className='w-32 h-40'>
                                                <Avatar avatar={storeAvatar} />
                                            </div>
                                            : <Image alt='avatar-default' src={AvatarDefault} width={176} height={176} />
                                    }
                                    <Button

                                        onClick={handleSetChooseAvatar}>
                                        Select avatar
                                    </Button>
                                </div>

                            </div>

                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="w-11/12 p-1 border rounded-md"
                                />
                                <ErrorMessage
                                    className='mt-1 text-sm text-red-600 '
                                    name="name"
                                    component="div" />

                            </div>

                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="birthday"
                                >
                                    Birthday
                                </label>
                                <Field
                                    type="date"
                                    name="birthday"
                                    className="p-1 border rounded-md textareaw-11/12"
                                />
                                <ErrorMessage
                                    className='mt-1 text-sm text-red-600 '
                                    name="birthday"
                                    component="div" />

                            </div>

                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="profession"
                                >
                                    Profession
                                </label>
                                <Field
                                    type="text"
                                    name="profession"
                                    className="w-11/12 p-1 border rounded-md"
                                />
                                <ErrorMessage
                                    className='mt-1 text-sm text-red-600 '
                                    name="birthday"
                                    component="div" />

                            </div>

                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="biography"
                                >
                                    Biography
                                </label>
                                <Field
                                    as="textarea"
                                    name="biography"

                                    className="w-11/12 h-20 p-1 border rounded-md"
                                />
                                <ErrorMessage
                                    className='mt-1 text-sm text-red-600 '
                                    name="biography"
                                    component="div" />

                            </div>

                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="gender"
                                >
                                    Gender
                                </label>
                                <Field
                                    className="w-11/12 p-1 bg-white border border-gray-200 rounded-md "
                                    as="select"
                                    name="gender"
                                >
                                    <option value="">---------</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Field>
                                <ErrorMessage
                                    className='mt-1 text-sm text-red-600 '
                                    name="gender"
                                    component="div" />

                            </div>

                            <div>
                                <label
                                    className="block mb-2 font-bold"
                                    htmlFor="interests"
                                >
                                    Interests
                                </label>

                                <div className='flex flex-wrap gap-4'>
                                    {listInterests.map((interests, index) =>
                                        <label
                                            className='mb-2 text-gray-900 capitalize min-w-max'
                                            key={index}
                                        >
                                            <Field
                                                className="block w-11/12 mb-2"
                                                type="checkbox"
                                                name="interests"
                                                value={interests}
                                            />
                                            {interests}
                                        </label>
                                    )}
                                </div>


                            </div>

                            <button
                                className="text-white bg-blue-600 border-none rounded-md cursor-pointer hover:bg-blue-700 w-28 h-9"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>

                        </Form>

                    )}

                </Formik>
            </div>
        </>
    )

}


export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    let response = await fetch('http://192.168.1.135:3001/avatar/all')

    let avatars = await response.json()

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: avatars,
    }
}
