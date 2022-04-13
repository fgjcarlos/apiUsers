// COMPONENTS
import Footer from "./Footer";
import Navbar from "./NavBar";

export default function MainLayout({ children }) {
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