import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'


const Home = () => {
  const [pickup,setPickup]= useState('')
  const [destination,setDestination]= useState('')
  const [panelOpen,setpanelOpen]= useState(false)
  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel,setvehiclePanel]= useState(false)

  const submitHandler= (e) =>{
    e.preventDefault()
  }

 useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
      })
    }
  }, [vehiclePanel])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      <div className='h-screen w-screen'>
        {/* temporary image */}
        <img className='h-full w-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sOHD2wqF-sCf8yMHeggcz2c2Y0NleG86-g&s" alt="mapImage" />
      </div>
      <div className='absolute flex flex-col justify-end h-screen top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
        <h5
        ref={panelCloseRef}
        onClick={()=>setpanelOpen(false)}
        className='absolute top-6 right-6 text-2xl opacity-1'>
          <i className='ri-arrow-down-wide-line'>
            </i> </h5>
        <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
        <div className="line absolute h-16 w-1 top-[50%] left-5 bg-gray-700 rounded-full"></div>
          <input 
          onClick={()=>setpanelOpen(true)}
          value={pickup} 
          onChange={(e)=>setPickup(e.target.value)}
           className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location'/>
          <input 
          onClick={()=>setpanelOpen(true)}
          value={destination} 
          onChange={(e)=>setDestination(e.target.value)}
           className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Enter your destination'/>
        </form>
        </div>
        <div ref={panelRef} className='h-0 bg-white'>
        <LocationSearchPanel setpanelOpen={setpanelOpen} setvehiclePanel={setvehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14'>
        <h5
        onClick={()=>setvehiclePanel(false)} 
        className='p-1 text-center absolute w-[93%] top-0'><i className=' text-gray-200 text-3xl ri-arrow-down-wide-line'></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div className='flex border-2 active:border-black mb-2 rounded-xl p-3 w-full items-center justify-between'>
          <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="CarImg" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>&#x20B9; 203.20</h2>
        </div>
        <div className='flex border-2 active:border-black mb-2 rounded-xl p-3 w-full items-center justify-between'>
          <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="BikeImg" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
            <h5 className='font-medium text-sm'>5 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>&#x20B9; 150.49</h2>
        </div>
        <div className='flex border-2 active:border-black mb-2 rounded-xl p-3 w-full items-center justify-between'>
          <img className="h-10" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="AutoImg" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
            <h5 className='font-medium text-sm'>10 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>&#x20B9; 118.63</h2>
        </div>
      </div>
    </div>
  )
}

export default Home