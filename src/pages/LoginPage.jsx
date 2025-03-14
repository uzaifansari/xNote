import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' //for the use of <Link/> tags, instead of traditional <a> tags which reloads the whole page unnecessarily.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function LoginPage() {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailHandler = (event) =>{
    setEmail(event.target.value)
  }
  const passwordHandler = (event) =>{
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    // Retrieve users from database.
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { email, password });

      if (response.status === 200 && response.data.message === "Success!") {
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("currentUser", JSON.stringify(response.data.user));

          toast.success("Login Successful!");
          navigate("/");
      } else {
          toast.error("Invalid Credentials!");
      }
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
          toast.error("Invalid Credentials!");
      } else {
          toast.error("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <div className={`w-full h-screen flex items-center justify-center bg-white`}>
      <div className={`w-fit h-fit p-10 flex flex-col items-center justify-center rounded-xl bg-black text-white`}>
        <h1 className='text-2xl mb-4'>Login</h1>
        <form onSubmit={handleLogin} className={`flex flex-col gap-2 text-lg`}>
            <label htmlFor="email">Email</label>
            <input required onChange={emailHandler} value={email} placeholder='name@example.com' className={`p-1 border-1 bg-transparent rounded-md border-white`} type="email" id='email' />
            <label htmlFor="password">Password</label>
            <input required onChange={passwordHandler} value={password} placeholder='Atleast 8 characters' className={`p-1 border-1 bg-transparent rounded-md border-white`} type="password" id='password' />
            <button className='text-xs m-auto'>forgot your password?</button>
            <button type='submit' className={`w-full p-1 rounded-md ${buttonTransition} text-black bg-white`}>Login</button>
        </form>
        <button onClick={()=>{navigate("/signup")}} className='text-xs mt-2'>Not Registered? <span className='text-blue-300'>Signup Now!</span></button>
      </div>
      {/* Toast Container to render notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
      />
    </div>
  )
}

export default LoginPage
