// DEPENDENCIES
import { useState } from 'react'
// COMPONENTS
import Button from 'components/Button';
import FormUpload from 'components/FormUpload';
import SelectFileUpload from 'components/SelectFileUpload';
// HOOKS
// UTILS


export default function UploadFiles() {

    const [isSelected, setIsSelected] = useState(null)

    const handleSelectedType = ({ dir, type }) => {

        setIsSelected({
            dir,
            type
        })
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full p-8'>

            <SelectFileUpload
                show={!isSelected}
                selectedType={handleSelectedType}
            />

            <FormUpload
                show={isSelected}
                onDone={() => setIsSelected(null)}
                dir={isSelected?.dir}
                type={isSelected?.type}
            />

        </div>
    )
}