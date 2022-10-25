import React from 'react'
import UserInfo from './components/UserInfo'
import OrderTracking from './components/OrderTracking'

const MainSection = (props) => {
    return (
        <div>
            {
                props.activeMenu === 1 &&
                <UserInfo
                    data={props?.info}
                />
            }
            {
                props.activeMenu === 2 &&
                <OrderTracking />
            }
        </div>
    )
}

export default MainSection