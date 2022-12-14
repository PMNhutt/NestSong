import { useState, useEffect } from 'react'
import LoadingSmall from '../../../../share/components/LoadingSmall/LoadingSmall';
import instances from '../../../../utils/plugin/axios'

//** icon */
import { icPin } from '../../../../assets/images'

//** Third party components*/
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux'

const DeliveryAddress = (props) => {

    //**Const */
    let nameArr = [];

    const shoppingCart = useSelector((state) => state.cart?.shoppingCart)
    let loggedUserName = `${props?.userInfo.firstName} ${props?.userInfo.lastName}`
    const [userName, setUserName] = useState(loggedUserName)
    const [userEmail, setUserEmail] = useState(props?.userInfo?.email)
    const [provinces, setProvinces] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')

    const [checkStockAgency, setCheckStockAgency] = useState([])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const Placeholder = ({ children }) => {
        return <div className='text-gray-400'>{children} <span className='text-redError text-[18px] font-semibold'>*</span></div>;
    };

    const handleProvincesChange = async (e) => {
        setProvinces(e.target.value)
        // props?.setProvinces(e.target.value);

        //** get product list agency -> compare quantityInStock */
        let localList = JSON.parse(localStorage.getItem('LIST_AGENCIES'))

        let productAmount = []
        shoppingCart?.map((item) => (
            productAmount.push(
                {
                    amount: item.amount,
                    proId: item.id,
                    name: item.name
                }
            )
        ))

        //compare => 
        let res = []
        localList.map(item => {
            let agencyStock = item.list.filter(agency => agency.agencyId === e.target.value)
            productAmount.map((pro, i) => {
                if (pro.proId === item.id) {
                    let selectedAgency = item.list.find(agency => agency.agencyId === e.target.value)

                    // console.log('localItem', {
                    //     id: item.id,
                    //     agency: selectedAgency,
                    //     proAmount: pro.amount,
                    //     quantityInStock: selectedAgency.quantityInStock,
                    //     compare: pro.amount > selectedAgency.quantityInStock
                    // })
                    res.push({
                        name: pro.name,
                        id: item.id,
                        agency: selectedAgency,
                        proAmount: pro.amount,
                        quantityInStock: selectedAgency.quantityInStock,
                        compare: pro.amount > selectedAgency.quantityInStock
                    })
                }
            })
        });

        setCheckStockAgency(res)
        props?.handleCompareStock(res)

        props?.handleSelectProvinces(e.target.value)
    }

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value)
        // props?.setDistrict(e.target.value);
        props?.handleSelectDistrict(e.target.value)
    }

    const handleWardChange = (e) => {
        setWard(e.target.value)
        // props?.setWard(e.target.value);
        props?.handleSelectWard(e.target.value)
    }
    const handleInputName = (value) => {
        props?.handleInputName(value)
        setUserName(value)
    }

    //** validate number */
    const handleKeyDown = (e) => {
        if (e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 110
            || e.keyCode === 189) {
            e.preventDefault();
        }
    }

    return (
        <div className='text-black w-full border rounded-[5px] shadow-md px-6 py-2 h-fit'>
            <div className='pb-3 mb-5 border-b flex items-center gap-2'>
                <div className='w-[25px] h-[25px] bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${icPin})` }} />
                <p className='font-semibold uppercase text-[20px]'> Th??ng tin ?????a ch???</p>
            </div>
            {
                props?.userPhone ?
                    <div className='my-2'>
                        <div className="mb-2 relative input-placeholer">
                            <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.name.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary`}
                                required type="text"
                                // readOnly
                                // onChange={(e) => handleInputName(e.target.value)}
                                onBlur={(e) => handleInputName(e.target.value)}
                                value={userName}
                            />
                            <div className='placeholder'>
                                H??? v?? t??n <span className='text-redError  text-[25px] absolute right-[-13px] font-semibold'>*</span>
                            </div>
                        </div>
                        <div className='mb-2 flex gap-3'>
                            <div className='relative input-placeholer w-full'>
                                <input className={`bg-white appearance-none border-[1.5px] ${props?.deliveryInfo?.phone.error ? 'border-red-500' : 'border-gray-400'}
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary `}
                                    required type="number"
                                    onBlur={(e) => props?.handleInputPhone(e.target.value)}
                                    value={props?.userPhone}
                                    onKeyDown={handleKeyDown}
                                />
                                <div className='placeholder'>
                                    S??? ??i???n tho???i <span className='text-redError text-[25px] absolute right-[-13px] font-semibold'>*</span>
                                </div>
                            </div>
                            <div className='relative input-placeholer w-full'>
                                <input className="bg-white appearance-none border-[1.5px] border-gray-400
                    rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary "
                                    required
                                    onBlur={(e) => props?.handleInputEmail(e.target.value)}
                                    value={userEmail}
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
                                onBlur={(e) => props?.handleInputAddress(e.target.value)}
                                value={props?.userAddress}
                            />
                            <div className='placeholder'>
                                ?????a ch??? nh???n h??ng <span className='text-redError text-[25px] absolute right-[-13px] font-semibold'>*</span>
                            </div>
                        </div>
                        <div className='flex flex-col mt-3 gap-3 w-full md:flex-nowrap flex-wrap'>
                            <Select
                                displayEmpty
                                disableUnderline
                                value={provinces}
                                onChange={handleProvincesChange}
                                MenuProps={MenuProps}
                                renderValue={
                                    provinces !== '' ? undefined : () => <Placeholder>Ch???n chi nh??nh giao h??ng</Placeholder>
                                }
                                variant="standard"
                                className={`bg-white border ${props?.deliveryInfo?.provinces.error ? 'border-red-500' : 'border-gray-400'} rounded px-3 w-full`}
                            >
                                {
                                    props?.provinces?.length > 0 ?
                                        props?.provinces?.map((province) =>
                                            <MenuItem key={province.agencyId} value={province.agencyId} className="menu-item">
                                                <p className="item-label font-maven">
                                                    {province.address}
                                                </p>
                                            </MenuItem>
                                        ) :
                                        <MenuItem disabled value='' className="menu-item">
                                            <em>Kh??ng t??m th???y d??? li???u</em>
                                        </MenuItem>
                                }
                            </Select>
                            {
                                checkStockAgency?.length > 0 &&
                                checkStockAgency.map(item => {
                                    item.compare == true &&
                                        nameArr.push(item.name)
                                })
                            }
                            {
                                nameArr?.length > 0 &&
                                <span className='text-[14px] text-redError font-semibold'>{`Chi nh??nh b???n ch???n kh??ng ????? s??? l?????ng cho ${nameArr}, vui l??ng ch???n chi nh??nh kh??c`}</span>
                            }



                            {/* <Select
                        displayEmpty
                        disableUnderline
                        value={district}
                        onChange={handleDistrictChange}
                        MenuProps={MenuProps}
                        renderValue={
                            district !== '' ? undefined : () => <Placeholder>Ch???n qu???n/huy???n</Placeholder>
                        }
                        variant="standard"
                        className="bg-white border border-gray-400 rounded px-3 w-full"
                    >
                        {
                            props?.district?.length > 0 ?
                                props?.district?.map((distrc) =>
                                    <MenuItem key={distrc.agencyId} value={distrc.address} className="menu-item">
                                        <p className="item-label font-maven">
                                            {distrc.address}
                                        </p>
                                    </MenuItem>
                                ) :
                                <MenuItem disabled value='' className="menu-item">
                                    <em>Kh??ng t??m th???y d??? li???u</em>
                                </MenuItem>
                        }
                    </Select>
                    <Select
                        displayEmpty
                        disableUnderline
                        value={ward}
                        onChange={handleWardChange}
                        MenuProps={MenuProps}
                        renderValue={
                            ward !== '' ? undefined : () => <Placeholder>Ch???n ph?????ng/x??</Placeholder>
                        }
                        variant="standard"
                        className="bg-white border border-gray-400 rounded px-3 w-full"
                    >
                        {
                            props?.ward?.length > 0 ?
                                props?.ward?.map((wardd) =>
                                    <MenuItem key={wardd.agencyId} value={wardd.address} className="menu-item">
                                        <p className="item-label font-maven">
                                            {wardd.address}
                                        </p>
                                    </MenuItem>
                                ) :
                                <MenuItem disabled value='' className="menu-item">
                                    <em>Kh??ng t??m th???y d??? li???u</em>
                                </MenuItem>
                        }
                    </Select> */}
                        </div>
                        <textarea onBlur={(e) => props?.handleInputNote(e.target.value)} rows="4" className="mt-3 p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400
                focus:outline-none focus:bg-white focus:border-primary resize-none" placeholder="Ghi ch??..."></textarea>
                    </div>
                    : <LoadingSmall />
            }
        </div>
    )
}

export default DeliveryAddress