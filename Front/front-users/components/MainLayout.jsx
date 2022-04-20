// COMPONENTS
import useCheckSession from "hooks/useCheckSession";
import useCheckToken from "hooks/useToken";
import Footer from "./Footer";
import Navbar from "./NavBar";

export default function MainLayout({ children }) {

    //useCheckSession()

    return (
        <div className="bg-[#f5f5f5] min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="mx-auto max-w-[1280px] m-0 box-border bg-white w-full h-full flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}