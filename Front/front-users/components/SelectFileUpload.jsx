// COMPONENTS
import Button from "./Button"

export default function SelectFileUpload({show=true, selectedType}) {

    if (!show) return null

    const selectableOptions = [
        {
            label: "avatar",
            dir: "avatars",
            type: "avatar",
            state: true,
        },
        {
            label: "Profile pictures",
            dir: "profilePhotos",
            type: "profilePhoto",
            state: true,
        }, {
            label: "Others files",
            dir: "files",
            type: "file",
            state: false,
        },
    ]

    return (
        <div className='p-4 flex flex-col items-center w-[90%] bg-white shadow-2xl rounded-2xl justify-evenly md:w-[60%] h-[350px] gap-4'>
            <h1 className='text-3xl font-semibold'>Select file type</h1>

            {
                selectableOptions.map(({ label, dir, type, state }) =>

                    <Button
                        key={label}
                        show={state}
                        onClick={() => selectedType({ dir, type })}
                        classButton={'h-[50px]'}
                    >
                        {label}
                    </Button>
                )
            }

        </div>
    )
}