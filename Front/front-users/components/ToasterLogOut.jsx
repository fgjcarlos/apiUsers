import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'


export default function ToasterLogout({ t }) {

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogOut = (t) => {
        toast.dismiss(t.id);

        setTimeout(() => {
            dispatch({ type: "logout", payload: null })
            localStorage.removeItem("token")
            router.push("/");

        }, 500);
    }

    return (
        
            <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full mt-4  bg-slate-500 overflow-hidden shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-1 ml-3">

                            <p className="mt-1 text-base text-white">
                                Do you want to log out?
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex bg-red-500 border-l border-gray-200">
                    <button
                        onClick={() => {
                            handleLogOut(t)
                            // toast.dismiss(t.id);
                        }}
                        className="flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Logout
                    </button>
                </div>
                <div className="flex bg-green-500 border-l border-gray-200">
                    <button
                        onClick={() => {
                            // handleLogOut(t)
                            toast.dismiss(t.id);
                        }}
                        className="flex items-center justify-center w-full p-4 text-sm font-medium border border-transparent rounded-none rounded-r-lg hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
    )
}