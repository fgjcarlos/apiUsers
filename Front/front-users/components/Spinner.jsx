export default function Spinner({ show=true }) {

    if (!show) return null;

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="w-16 h-16 border-b-2 border-blue-500 rounded-full animate-spin" />
        </div>
    )
}