import Button from "./Button";

export default function ModalConfirm({ show, title, message, onConfirm, onCancel }) {

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 w-full h-full bg-gray-600/60 scroll-">
            <div className="flex p-4 justify-between flex-col text-center w-[90%] lg:w-fit  mx-auto top-4  bg-white relative rounded-lg shado">
                <h2 className="text-lg font-semibold ">{title}</h2>
                <p className="text-sm ">{message}</p>
                <div className="flex items-center justify-around gap-4">
                    <Button
                        show={true}
                        onClick={onConfirm}
                    >
                        Yes
                    </Button>
                    <Button
                        show={true}
                        onClick={onCancel}
                    >
                        No
                    </Button>
                </div>
            </div>
        </div >
    )
}