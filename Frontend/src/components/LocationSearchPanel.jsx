import React from 'react'


const LocationSearchPanel = (props) => {

 
  const locations=[
  "B-42 Shyam Nagar, Jaipur, Rajasthan",
  "1600 Amphitheatre Parkway, Mountain View, California",
  "221B Baker Street, London, Greater London",
  "350 Victoria Street, Toronto, Ontario"
  ]
  return (
    <div>
        {/* this is just a sample dataa */}

        {
          locations.map(function(elem,key) {
            return (
               <div key={key} 
                onClick={() => {
                  props.setvehiclePanel(true)
                  props.setpanelOpen(false)
                }}
                className='flex gap-4 items-center my-2 border-gray-50 active:border-black justify-start border-2 p-3 rounded-xl'>
                <h2 className='bg-[#eee] h-8 flex items-center w-12 justify-center rounded-full'><i className='ri-map-pin-fill'></i></h2>
                <h4 className='font-medium'>{elem}</h4>
            </div>
          )
          })
        }
      </div>
  )
}

export default LocationSearchPanel