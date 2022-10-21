import React from 'react'

const CustomerInfo = (props) => {


    //** validate number */
    const handleKeyDown = (e) => {
        if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110
            || e.keyCode === 189) {
            e.preventDefault();
        }
    }

    return (
        <div className='bg-white p-5 shadow-md rounded w-full'>
            <div className="mb-2 relative input-placeholer">
                <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                    required type="text"
                    // readOnly
                    // onChange={(e) => handleInputName(e.target.value)}
                    onBlur={(e) => props.handleInputName(e.target.value)}
                />
                <div className='placeholder'>
                    Họ và tên <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                </div>
            </div>

            <div className='mb-2 flex gap-3'>
                <div className='relative input-placeholer w-full'>
                    <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.phone.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary `}
                        required type="number"
                        onBlur={(e) => props.handleInputPhone(e.target.value)}
                        // value={userPhone}
                        onKeyDown={handleKeyDown}
                    />
                    <div className='placeholder'>
                        Số điện thoại <span className='text-redError text-[25px] absolute right-[-13px] font-semibold'>*</span>
                    </div>
                </div>
                <div className='relative input-placeholer w-full'>
                    <input className="bg-white appearance-none border-[1.5px] border-gray-400
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary "
                        required
                        onBlur={(e) => props.handleInputEmail(e.target.value)}
                    // value={userEmail}
                    />
                    <div className='placeholder'>
                        Email
                    </div>
                </div>
            </div>

            <div className="mb-2 relative input-placeholer">
                <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.address.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                    required
                    type="text"
                    onBlur={(e) => props.handleInputAddress(e.target.value)}
                />
                <div className='placeholder'>
                    Địa chỉ nhận hàng <span className='text-redError text-[25px] absolute right-[-13px] font-semibold'>*</span>
                </div>
            </div>

            <div className=''>
                <input className={`select-none bg-white appearance-none border-[1.5px] border-gray-400
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                    required
                    type="text"
                    readOnly
                    value={`Chi nhánh: ${props.agency}`}
                />
            </div>

            <textarea onBlur={(e) => props.handleInputNote(e.target.value)} rows="4" className="mt-3 p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
                focus:outline-none focus:bg-white focus:border-primary resize-none" placeholder="Ghi chú..."></textarea>
        </div>
    )
}

export default CustomerInfo