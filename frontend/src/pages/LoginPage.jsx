import { React, useState } from 'react'
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from '../component/input';

 
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;
  const handleLogin = (e) => {
    e.preventDefault();
  }
  return (
    <motion.div
    initial = {{ opacity: 0, y:20 }}
    animate = {{ opacity: 1, y:0 }}
    transition = {{ duration : 0.5 }}
    // whileHover={{scale:1.03}}
    className = " max-w-md w-full bg-gray-800 bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden "
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text'>
          Welcome Back
        </h2>
        <form 
        onSubmit={handleLogin}
        >
          <Input 
          type="email"
          icon = {Mail}
          placeholder = "Email Address"
          value={email}
          onChange = {(e)=>setEmail(e.target.value)}
          />
          <Input 
          type="password"
          icon = {Lock}
          placeholder = "Password Dude..?"
          value={password}
          onChange = {(e)=>setPassword(e.target.value)}
          />
          <div className='flex items-center mb-6'>
            <Link to='/forgot-password' className='text-sm text-gray-300 hover:underline'>Forgot password?</Link>
          </div>
          <motion.button 
          // whileHover={{scale:1.02}}
          whileTap={{scale:0.98}}
          className="w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg font-bold  shadow-lg hover:from-sky-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-500 transition duration-200"
          type="submit"
          disabled={isLoading}>
            {isLoading ? <Loader className='w-6 h-6 mx-auto animate-spin hover:text-black'/>: "Login"}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-500 bg-opacity-40 flex justify-center'>
        <p className='text-sm text-gray-300'>Don't have an account?{" "}
        <Link to='/signup' className='text-sky-300 hover:underline'>Sign Up</Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage
