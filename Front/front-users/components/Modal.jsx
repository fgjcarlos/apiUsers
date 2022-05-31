export default function Modal({ children }) {
    return (
        <div
            className="box-border fixed inset-0 z-50 flex flex-wrap items-center justify-center w-screen h-screen bg-slate-300/90">
            <div className="box-border flex items-center justify-center w-[80%] max-w-4xl overflow-auto h-[90%] rounded-3xl bg-slate-100 p10">
                {children}
            </div>
        </div>
    );
}
