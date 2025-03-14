import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' //for using <Link> tags
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const SignupPage = () => {
  const buttonTransition = "transition active:scale-95 ease-in-out hover:scale-105"
  const navigate = useNavigate()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const nameHandler = (event) => {
    setName(event.target.value)
  }
  const emailHandler = (event) =>{
    setEmail(event.target.value)
  }
  const passwordHandler = (event) =>{
    setPassword(event.target.value)
  }

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please Fill All Fields!');
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success('Signup Successful!');
        setTimeout(() => navigate("/"), 1000); // Redirect after 1s
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email is already registered. Please use a different email.');
      } else {
        toast.error("Signup failed. Please try again later.");
      }
      console.error("Error posting data", error);
    }
  };

  return (
    <div className={`w-full h-screen flex items-center justify-center bg-white`}>
      <div className={`w-fit h-fit p-10 px-5 flex flex-col items-center justify-center rounded-xl bg-black`}>
        <h1 className={`text-2xl mb-4 text-white`}>Signup</h1>
        <form onSubmit={handleSignup} className={`flex flex-col text-lg gap-2 text-white mx-10`} action="">
            <label htmlFor="name">Name</label>
            <input onChange={nameHandler} required value={name} className={`p-1 border-1 bg-transparent rounded-md border-white`} type='text' id='name' />
            <label htmlFor="email">Email</label>
            <input onChange={emailHandler} required value={email} placeholder='name@example.com' className={`p-1 border-1 bg-transparent rounded-md border-white`} type="email" id='email' />
            <label htmlFor="password">Password</label>
            <input onChange={passwordHandler} required value={password} placeholder='Atleast 8 characters' className={`p-1 border-1 bg-transparent rounded-md border-white`} type="password" id='password' />
            <button type='submit' className={`w-full p-1 rounded-md ${buttonTransition} text-black bg-white`}>Signup</button>
        </form>
        <button onClick={()=>{navigate("/")}} className='text-white text-xs mt-2'>Registered? <span className='text-blue-300'>Login Now!</span></button>
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

export default SignupPage
