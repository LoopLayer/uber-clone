import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
        <h5
        onClick={()=>props.setvehiclePanel(false)} 
        className='p-1 text-center absolute w-[93%] top-0'><i className=' text-gray-200 text-3xl ri-arrow-down-wide-line'></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

        <div className='flex flex-col gap-2 items-center justify-between'>
        <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="CarImg" />
        <div className='w-full mt-5'>
        <div className='flex items-center gap-5  p-3 border-b-2'>
          <i className='text-lg ri-map-pin-2-fill'></i>
          <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-base -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
           <i className='ri-map-pin-user-fill'></i>
          <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-base -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
          </div>
        </div>
        <div className="flex items-center gap-5  p-3">
           <i className='ri-currency-line'></i>
          <div>
            <h3 className='text-lg font-medium'>&#x20B9; 203.20</h3>
            <p className='text-base -mt-1 text-gray-600'>Cash</p>
          </div>
        </div>
        </div>
        <button 
        onClick={()=>{
          props.setvehicleFound(true)
          props.setconfirmRidePanel(false)
        }}
        className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
        </div>
    
    </div>
  )
}

export default ConfirmRide