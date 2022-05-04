import { ChooseAvatar } from './../components/ChooseAvatar';
// DEPENDENCIES
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import { Formik, Field, ErrorMessage, Form } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
// COMPONENTS
import ChooseBgAvatar from '../components/ChooseBgAvatar';
import Modal from '../components/Modal';
import Button from "components/Button";
import { Avatar } from 'components/Avatar';
// RESOURCES
import AvatarDefault from 'public/avatarDefault.png'
import { throwErrorToast, throwLoadingToast, throwSuccessToast } from 'utils/toast';
import { serverHost } from 'utils/globalVars';

export default function Addcharacter(props) {

    dayjs.extend(utc)

    const { avatars } = props
    const formRef = useRef();
    const router = useRouter()

    const [showModalChooseAvatar, setShowModalChooseAvatar] = useState(false)
    const [showModalChooseBgAvatar, setShowModalChooseBgAvatar] = useState(false)
    const [errAvatar, setErrAvatar] = useState(false)

    const listInterests = ["sports", "music", "travel", "cuture"]

    const dispatch = useDispatch();
    const storeAvatar = useSelector((s) => s.avatar);
    const user = useSelector((s) => s.login);

    const handleSetChooseAvatar = (e) => {
        e.preventDefault()
        setShowModalChooseAvatar(true)
    }

    const handleConfigAvatar = (e) => {
        e.preventDefault()
        setShowModalChooseAvatar(false)
        setShowModalChooseBgAvatar(true)
        setErrAvatar(false)
    }

    // Max and min date
    // Max date -> 120 years
    // Min date --> date now - 18 year
    const minDate = dayjs().subtract(120, 'year').format("YYYY-MM-DD")
    const maxDate = dayjs().subtract(18, 'year').format("YYYY-MM-DD")

    const handleSubmit = async (values, { setSubmitting }) => {

        if(!storeAvatar) return

        const urlServer = `${serverHost}/character/add`

        const character = {
            ...values,
            avatar: storeAvatar,
            name: values.name.toLowerCase(),
            profession: values.profession.toLowerCase(),
            Created_by: {
                name: user.name,
                id: user.id
            },
            birthday: dayjs(values.birthday).format()
        }


        console.log({character});

        const toastLoading = throwLoadingToast("Uploading data... Wait please.")

        const response = await fetch(urlServer, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ...character }),
        });

        toast.dismiss(toastLoading);

        response.ok
            ? throwSuccessToast("The character has been added successfully.", 10000)
            : throwErrorToast("An error has occurred.", 6000)

        // *Reset form and avatar
        response.ok && setTimeout(() => {
            formRef.current.reset()
            dispatch({ type: "@avatar/reset" })
            router.push("/profile")
        }, 2000);
    }

    return (

        <div className='flex flex-col items-center justify-center gap-4 p-4 pt-8'>
            <Toaster />
            <h1 className='text-2xl font-semibold'>
                Add Character
            </h1>
            <p className='text-gray-700'>
                Create your characters fill out this form, remember that the maximum number of characters is 3.
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

                    if (!storeAvatar) {
                        setErrAvatar(true)
                    }

                    if (values.name.length < 3) {
                        errors.name = "* Required"
                    }

                    if (values.birthday === "") {
                        errors.birthday = "* Required"
                    }

                    if (values.profession.length < 3) {
                        errors.profession = "* Required"
                    }

                    if (values.biography.length < 3) {
                        errors.biography = "* Required"
                    }
                    if( values.biography.length > 140){
                        errors.biography = "* Max length 140"

                    }

                    if (values.gender === "") {
                        errors.gender = "* Required"
                    }


                    return errors
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form
                        ref={formRef}
                        className="md:w-1/2 xl:w-2/5 w-11/12 min-w-[300px] mx-auto my-0 mt-10 flex justify-center flex-col p-8 shadow-xl rounded-2xl border  h-auto gap-5"
                    >
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <h2 className='mb-2 font-bold'>
                                Avatar
                            </h2>

                            <div
                                name="avatar"
                                value={storeAvatar}
                                className='flex flex-col items-center justify-center gap-2'
                            >

                                {
                                    storeAvatar
                                        ? <div className='w-40 h-48'>
                                            <Avatar avatar={storeAvatar} />
                                        </div>
                                        : <Image alt='avatar-default' src={AvatarDefault} width={150} height={150} />
                                }

                                {
                                    errAvatar &&
                                    <div className='text-sm text-red-600 '>
                                        *Required
                                    </div>
                                }

                                <Button onClick={handleSetChooseAvatar}>
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
                                max={maxDate}
                                min={minDate}
                                type="date"
                                name="birthday"
                                className="p-1 border rounded-md textareaw-11/12"
                            />
                            <ErrorMessage
                                className='mt-1 text-sm text-red-600 '
                                name="birthday"
                                component="div" 
                                />

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
                                component="div" 
                            />

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
                                placeholder="max. 140 chars"
                                className="w-11/12 h-20 p-1 border rounded-md"
                            />
                            <ErrorMessage
                                className='mt-1 text-sm text-red-600 '
                                name="biography"
                                component="div" 
                            />

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
        </div >

    )

}


export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    let response = await fetch(`${serverHost}/avatar/all`)

    let avatars = await response.json()

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: avatars,
    }
}
