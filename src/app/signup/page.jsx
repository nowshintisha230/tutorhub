"use client"

import { authClient } from "@/lib/auth-client";

 

const SignUpPage = () => {
    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData(e.currentTarget)
        const user=Object.fromEntries(formData.entries());
       
const {data,error}=await authClient.signUp.email({
    email:user.email,
    password:user.password,
    name:user.name,
    image:user.photoURL,

})
console.log({data,error})
}


    
    return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-5">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register Now
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Photo URL
            </label>

            <input
              type="text"
              name="photoURL"
              placeholder="Enter photo URL"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-xl"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    );
};

export default SignUpPage;