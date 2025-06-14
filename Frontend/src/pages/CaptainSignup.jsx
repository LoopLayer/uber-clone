import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const CaptainSignup = () => {

  const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor,setVehicleColor]= useState("")
  const [vehiclePlate,setVehiclePlate] = useState("")
  const [vehicleCapacity,setVehicleCapacity] = useState("")
  const [vehicleType,setVehicleType] = useState("")

  const {captain,setCaptain}= useContext(CaptainDataContext)
  
  const submitHandler = async(e) => {
    e.preventDefault();

    const captainData={
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType,
      
    };

    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
    if(response.data.success){
      const data = response.data;
      console.log(data.data)
      console.log(data)
      setCaptain(data.data);

      navigate("/captain-login");
    }



    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehicleType("");
    setVehiclePlate("");
    setVehicleCapacity("");
  };
  return (
    <div className="p-5 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg w-full font-medium mb-2"> What's our Captain's name</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-base placeholder:text-base"
              type="text"
              placeholder="First Name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-base"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
          <div>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Enter your password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
            type="text"
            required
            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            placeholder="Vehicle Color"
            value={vehicleColor}
            onChange={(e)=>{
              setVehicleColor(e.target.value)
            }}
            />

            <input
            type="text"
            required
            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            placeholder="Vehicle Plate"
            value={vehiclePlate}
            onChange={(e)=>{
              setVehiclePlate(e.target.value)
            }}
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
            type="number"
            required
            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            placeholder="Vehicle Capacity"
            value={vehicleCapacity}
            onChange={(e)=>{
              setVehicleCapacity(e.target.value)
            }}
            /> 
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e)=>{
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>


          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Create Captain Account
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-sm leading-tight text-gray-600 mb-4">
         This site is protected by reCAPTCHA and the <span className="underline"> Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};
export default CaptainSignup