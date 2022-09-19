import React from 'react'

const Banner = ({img}) => {
  return (
    <div className='w-full h-[500px] bg-cover bg-bottom' style={{backgroundImage: `url(${img})`}}/>
  )
}

export default Banner