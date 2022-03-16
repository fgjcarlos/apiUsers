import Modal from './../components/Modal';
import Button from "components/Button";
import { Field } from "formik";
import { ErrorMessage } from "formik";
import { Form } from "formik";
import { Formik } from "formik";
import Image from "next/image";
import { useState } from 'react'
import ListAvatars from 'components/ListAvatars';
import { RgbaColorPicker } from "react-colorful";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'components/Avatar';
import AvatarDefault from 'public/avatarDefault.png'
import AvatarSkeleton from 'skeletons/AvatarSkeleton';

export default function Addcharacter(props) {

    const { avatars } = props
    const [showModal, setShowModal] = useState(false)
    const [showConfgAvatar, setConfigAvatar] = useState(false)

    const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
    const listInterests = ["sports", "music", "travel", "cuture"]

    const storeAvatar = useSelector((s) => s.avatar);
    const dispatch = useDispatch();


    const handleSetBgAvatar = () => {
        dispatch({
            type: "@avatar/updateStyle", payload: {
                backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`
            }
        })

        setColor({ r: 255, g: 255, b: 255, a: 1 })
        setConfigAvatar(false)
    }

    const handleChooseAvatar = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    const handleConfigAvatar = () => {
        setShowModal(false)
        setConfigAvatar(true)
    }

    // Max and min date
    // Max date -> 120 years
    // Min date --> date now - 18 year

    return (
        <>
            <div className='w-full p-5'>
                <h1>Add Character</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro consequatur impedit quaerat omnis quis voluptatibus commodi culpa molestias, perspiciatis neque similique, rem laudantium veniam eligendi? Est consequuntur odio corporis.
                    Reprehenderit vel quibusdam excepturi. Dignissimos tempore adipisci saepe? Excepturi, vero nesciunt quod repellat facilis laboriosam iste necessitatibus a inventore natus delectus porro ipsam! Delectus modi, nisi tempore quo nobis illo!
                </p>

                {
                    showConfgAvatar &&
                    <Modal>
                        <div className='max-w-3xl h-full w-[90%] bg-white p-10 box-border flex flex-col justify-between items-stretch'>

                            <h1 className='mt-2 mb-2 text-2xl font-bold text-center'>
                                Select background of your avatar
                            </h1>

                            <div className='box-border flex flex-wrap items-center justify-around gap-10 rounded-md h-4/6'>

                                <div className='w-56 h-60'>
                                    <Avatar avatar={storeAvatar} bg={color} onClick={handleChooseAvatar} />
                                </div>



                                <RgbaColorPicker
                                    style={{ height: `13rem` }}
                                    className='rounded-lg h-52'
                                    color={color} onChange={setColor}
                                />
                            </div>

                            <Button
                                onClick={handleSetBgAvatar}
                                classButton="self-end mr-5"
                            >
                                Done
                            </Button>


                        </div>
                    </Modal>
                }

                {showModal &&
                    <Modal>
                        <div className='flex flex-col items-center justify-between h-full gap-1 p-5'>
                            <h1 className='my-2 text-xl font-bold'>
                                Choose the avatar
                            </h1>

                            <ListAvatars avatars={avatars} />

                            <div className='flex w-2/3 my-4 justify-evenly'>
                                <Button onClick={handleConfigAvatar} state={!storeAvatar}>
                                    Done
                                </Button>
                                <Button onClick={() => setShowModal(false)}>
                                    Exit
                                </Button>
                            </div>


                        </div>
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
                    onSubmit={async (values, { setSubmitting }) => {

                        const urlServer = "http://192.168.1.135:3001/character/add";

                         const character = { ...values, avatar: storeAvatar, Created_by: "admin", birthday: Date.UTC(), }
                      

                        // const character = {
                        //     name: values.name,
                        //     avatar: storeAvatar,
                        //     birthday: Date.UTC(),
                        //     profession: values.profession,
                        //     biography: values.biography

                        // }

                        // const formData = new FormData();
                        // formData.append("character", character);

                        console.log(character);


                        const myPromise = await fetch(urlServer, {
                            // headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            method: "POST",
                            body: JSON.stringify({...character}),
                        });

                        ;
                        console.log(myPromise)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form
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

                                        onClick={handleChooseAvatar}>
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
