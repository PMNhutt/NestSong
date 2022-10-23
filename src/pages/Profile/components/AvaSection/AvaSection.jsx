import React from 'react'
import { defaultAva } from '../../../../assets/images'

//** Third party components*/
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const AvaSection = (props) => {
    return (
        <div className='font-maven'>
            <div className='flex justify-center'>
                <div className='w-[100px] h-[100px] bg-cover bg-center bg-no-repeat rounded-full relative' style={{ backgroundImage: `url(${defaultAva})` }} >
                    {/* <label htmlFor="file" className='cursor-pointer absolute bottom-0 right-0'>
                        <AddAPhotoIcon className="upload-icon text-gray-700" />
                    </label>
                    <input type="file" id="file" style={{ display: 'none' }}
                    // onChange={(e) => setFile(e.target.files[0])}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default AvaSection