import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState(false)
    const navigate=useNavigate()
    function submithandler(e){  
        e.preventDefault()
        axios.post('http://localhost:3000/user/signin',{email,password})
        .then(res=>{
            if(res.data.error){
                seterror(true)
            }
            else{
                localStorage.setItem('user',res.data.msg)
                navigate('/')
            }

        })
        .catch(err=>console.log(err))
    }
   return (
     <>
       {error ? (
         <p className="text-center bg-red-300 text-red-600 p-3 mt-3 w-max absolute left-1/2 translate-x-[-50%] ">
           Email or Password is Invalid
         </p>
       ) : null}
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
             Sign in to your account
           </h2>
         </div>

         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           <form onSubmit={(e) => submithandler(e)} className="space-y-6">
             <div>
               <label
                 htmlFor="email"
                 className="block text-sm/6 font-medium text-gray-900"
               >
                 Email address
               </label>
               <div className="mt-2">
                 <input
                   value={email}
                   onChange={(e) => setemail(e.target.value)}
                   id="email"
                   name="email"
                   type="email"
                   required
                   autoComplete="email"
                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                 />
               </div>
             </div>

             <div>
               <div className="flex items-center justify-between">
                 <label
                   htmlFor="password"
                   className="block text-sm/6 font-medium text-gray-900"
                 >
                   Password
                 </label>
                 <div className="text-sm">
                   <a
                     href="#"
                     className="font-semibold text-indigo-600 hover:text-indigo-500"
                   >
                     Forgot password?
                   </a>
                 </div>
               </div>
               <div className="mt-2">
                 <input
                   value={password}
                   onChange={(e) => setpassword(e.target.value)}
                   id="password"
                   name="password"
                   type="password"
                   required
                   autoComplete="current-password"
                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                 />
               </div>
             </div>

             <div>
               <button
                 type="submit"
                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                 Sign in
               </button>
             </div>
           </form>

           <p className="mt-10 text-center text-sm/6 text-gray-500">
             Not a member?{" "}
             <a
               href="#"
               className="font-semibold text-indigo-600 hover:text-indigo-500"
             >
               Start a 14 day free trial
             </a>
           </p>
         </div>
       </div>
     </>
   );

  
}

export default Login