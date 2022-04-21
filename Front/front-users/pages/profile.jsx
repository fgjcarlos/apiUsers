import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Profile({userData}) {
    
    const router = useRouter()

    const user = useSelector(state => state.login);

    if (!user) {
        router.push("/login");
    }




    return (
        <div className=''>
            <p>{user?.name}</p>
            <p>{user?.quantityCharacters}</p>
        </div>
    )
}

