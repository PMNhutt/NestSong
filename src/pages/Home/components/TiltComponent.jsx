import React from 'react'
import Tilt from 'react-parallax-tilt';

const TiltComponent = ({ img, text, tiltX, tiltY }) => {
    return (
        <Tilt perspective={500} className="parrallax-effect glassmorse-card p-6 h-fit rounded-md" glareEnable={true}
            glareMaxOpacity={0.45}
            tiltAngleXInitial={tiltX} tiltAngleYInitial={tiltY}
        >
            <div className="text-center inner-effect text-[20px] glassmorse-card px-3 rounded-md
             py-2 font-maven font-semibold relative
              drop-shadow-md shadow-black">{text}</div>
            <div className="w-[280px] h-[312px] bg-cover bg-center rounded-md border-glass" style={{ backgroundImage: `url(${img})` }} />
        </Tilt>
    )
}

export default TiltComponent