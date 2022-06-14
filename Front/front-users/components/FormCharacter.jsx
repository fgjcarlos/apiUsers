// DEPENDENCIES
import { useState } from 'react'
import { useSelector } from 'react-redux';
import Image from "next/image";
import { Formik, Field, ErrorMessage, Form } from "formik";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
// COMPONENTS
import ChooseBgAvatar from '../components/ChooseBgAvatar';
import Button from "components/Button";
import { Avatar } from 'components/Avatar';
import { ChooseAvatar } from './../components/ChooseAvatar';
// RESOURCES
import AvatarDefault from 'public/avatarDefault.png'

export default function FormCharacter({ handleSubmit, formRef, initialValues, avatars }) {

    dayjs.extend(utc)

    const [showModalChooseAvatar, setShowModalChooseAvatar] = useState(false)
    const [showModalChooseBgAvatar, setShowModalChooseBgAvatar] = useState(false)
    const [errAvatar, setErrAvatar] = useState(false)

    const listInterests = ["sports", "music", "travel", "cuture"]

    const storeAvatar = useSelector((s) => s.avatar);
    const birthday = initialValues?.birthday ? dayjs(initialValues?.birthday).format("YYYY-MM-DD") : ""

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

    return (
        <>
            <ChooseAvatar
                show={showModalChooseAvatar}
                avatars={avatars}
                onExit={() => setShowModalChooseAvatar(false)}
                onDone={handleConfigAvatar}
            />

            <ChooseBgAvatar
                show={showModalChooseBgAvatar}
                handleSetChooseAvatar={handleSetChooseAvatar}
                onDone={() => setShowModalChooseBgAvatar(false)}
            />

            <Formik
                initialValues={
                    {
                        name: initialValues?.name || '',
                        birthday: birthday || '',
                        profession: initialValues?.profession || '',
                        interests: initialValues?.interests || "",
                        gender: initialValues?.gender || "",
                        biography: initialValues?.biography || "",
                        avatar: initialValues?.avatar || "",
                    }
                }
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
                    if (values.biography.length > 140) {
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
                                    storeAvatar || initialValues?.avatar
                                        ? <div className='w-40 h-48'>
                                            <Avatar avatar={storeAvatar || initialValues?.avatar } />
                                        </div>
                                        : <Image alt='avatar-default' src={AvatarDefault} width={150} height={150} />
                                }

                                {
                                    errAvatar &&
                                    <div className='text-sm text-red-600 '>
                                        *Required
                                    </div>
                                }

                                <Button
                                    show={true}
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

        </>
    )
}


