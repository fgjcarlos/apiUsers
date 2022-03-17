// COMPONENTS
import Navbar from "./NavBar";

export default function MainLayout({ children }) {
    return (
        <div className="bg-[#f5f5f5]">
            <Navbar />
            <main className="mx-auto max-w-[1280px] m-0 box-border bg-white ">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )
}