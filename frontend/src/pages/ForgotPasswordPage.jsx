import React,{ useState } from 'react'
import { motion } from "framer-motion"
import Input from '../component/Input'
import { useAuthStore } from '../store/authStore'
import { ArrowLeft, Mail, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'

function ForgotPasswordPage() {
  const [email,setEmail] = useState("");
  const [isSubmitted,setIsSubmitted] = useState(false);
  const {isLoading,forgotPassword} = useAuthStore();

  const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

  return (
    <motion.div
    initial = {{opacity:0,y:20}}
    animate = {{opacity:1,y:0}}
    transition = {{duration:0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className= "p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>
        {!isSubmitted? (
        <form onSubmit={handleSubmit}>
          <p className='text-gray-300 mb-6 text-center'>
            Enter your email address and we will send you link to reset your password
          </p>
          <Input
          icon={Mail}
          type={"email"}
          placeholder = 'Email Address'
          value = {email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          />
          <motion.button
          whileTap={{scale:0.98}}
          className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold round-lg shadow-lg hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-400 transition duration-200"
          type={'submit'}>
            {isLoading ? <Loader className="size-6 animate-spin mx-auto"/> : "Send Reset Link"}

          </motion.button>
        </form>
        ) : (
          <div className='text-center'>
            <motion.div 
            initial = {{scale:0}}
            animate = {{scale:1}}
            transition = {{type:"spring", stiffness:500, damping:30}}
            className='w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Mail cLassName='h-8 w-8 text-white'/>
            </motion.div>
            <p className='text-gray-300 mb-6'>
              If an account for {email}, you will receive a password reset link shortly
            </p>
          </div>
        )}
      </div>

      <div className='px-8 py-4 bg-gray-800 bg-opacity-40 flex justify-center'>
				<Link to={"/login"} className='text-sm text-sky-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
    </motion.div>
  )
}

export default ForgotPasswordPage