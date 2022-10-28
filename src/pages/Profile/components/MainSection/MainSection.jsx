import React from 'react'
import UserInfo from './components/UserInfo'
import OrderTracking from './components/OrderTracking'

const MainSection = (props) => {
    return (
        <div>
            {
                props.activeMenu === 1 &&
                <OrderTracking />
            }
            {
                props.activeMenu === 2 &&
                <UserInfo
                    setUpdateStatus={props.setUpdateStatus}
                    data={props?.info}
                />
            }
        </div>
    )
}

export default MainSection