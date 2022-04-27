import FormUser from "components/FormUser";
import { useSelector } from "react-redux";

export default function EditProfile() {

    const user = useSelector(state => state.login);

    return (
        <div className=''>
            <h1>Edit Profile</h1>

            <FormUser initialValues={user} typeForm="register" />

        </div>
    )
}