import Button from "./Button";

export default function ModalConfirm({title, message, onConfirm, onCancel}) {
    return (
        <div className="h-full w-full bg-gray-600/60 z-50 fixed scroll- inset-0">
            <div className="flex p-4 justify-between flex-col text-center w-[90%] lg:w-fit  mx-auto top-4  bg-white relative rounded-lg shado">
                <h2 className=" font-semibold text-lg">{title}</h2>
                <p className=" text-sm">{message}</p>
                <div className="flex justify-around gap-4 items-center">
                    <Button onClick={onConfirm}>Yes</Button>
                    <Button onClick={onCancel}>No</Button>
                </div>
            </div>
        </div >
    )
}