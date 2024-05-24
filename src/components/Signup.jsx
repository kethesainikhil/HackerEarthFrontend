import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch , useSelector} from "react-redux"
import { authApiSignupAsync } from '../features/auth/authSlice'
import toast, { Toaster } from 'react-hot-toast'
const Signup = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state)=>state.user.userData)
    const{
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
  
const [loading,setLoading] = useState(false);
const onSubmit = (data) => {
    if(data.phone.length > 10 || data.phone.length < 10){
        toast.error("Phone number should be 10 digits")
        return
    }
    if(data.password.length < 6 ){
        toast.error("Password should be atleast 6 characters")
        return
    }
  dispatch(authApiSignupAsync(data))
  setLoading(true);
}
useEffect(()=>{
    if(userData?.error){
        toast.error(userData?.error)
        setLoading(false)
        
      }
  if(userData.id){
    setLoading(false)
    localStorage.setItem("userId",userData.id)
    toast.success("Successfully signed up ")
    navigate("/")
  }
  

},[userData])
  return (
    <div>

{
    loading ? <h1>Signing Up...</h1> :
    <div className="bg-grey-lighter min-h-screen flex flex-col">
        
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div><Toaster /> </div>
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <div className='flex justify-between'>
                    <input 
                    {...register("firstName")}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="firstName"
                        placeholder="First Name" />
                    <input 
                    {...register("lastName")}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="lastName"
                    placeholder="lastName Name" />
                    </div>

                    <input 
                        {...register("email")}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />
                     <input 
                    {...register("phone")}
                    type="number"


                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="phone"
                    placeholder="phone" />
                    <input 
                        {...register("password")}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
    

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green text-black bg-blue-600 hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>
                </div>
                </form>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <Link className="no-underline text-blue-600 border-b border-blue text-blue" to="/login">
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
}
    </div>
  )
}

export default Signup