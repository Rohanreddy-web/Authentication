import {motion} from "framer-motion";
import Input from '../component/Input';
import {React,useState} from 'react'
import {User,Mail,Lock, Loader} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../component/PasswordStrengthMeter';
import  {useAuthStore}  from '../store/authStore';

const SignUpPage = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const {signup , error, isLoading}=useAuthStore();
  const handileSignup = async (e)=>{
    e.preventDefault();
    try {
       await signup(email,password,name);
       navigate('/verify-email');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <motion.div
    initial = {{opacity:0,y:20}}
    animate = {{opacity:1,y:0}}
    transition = {{duration:0.5}}
    whileHover={{scale:1.03}}
    className = 'max-w-md w-full bg-gray-500 bg-opacity-30 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-xl mb-6 font-bold text-center bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text'>
          Create Account
        </h2>
        <form onSubmit={handileSignup}>
          <Input
          icon ={User}
          type="text"
          placeholder = "Full Name"
          value = {name}
          onChange={(e) => (setName(e.target.value))}
          />
          <Input
          icon ={Mail}
          type="email"
          placeholder = "Email Address"
          value = {email}
          onChange={(e) => (setEmail(e.target.value))}
          />
          <Input
          icon ={Lock}
          type="password"
          placeholder = "password"
          value = {password}
          onChange={(e) => (setPassword(e.target.value))}
          />

          {error && <p className='text-red-500 font-semibold mt-2 '>{error}</p>}
          <PasswordStrengthMeter password={password} />

          <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg font-bold shadow-lg hover:from-sky-5 00 hover:to-blue-400 focus:outline-none focus-ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-600 transition duration-200'
          whileHover={{scale:1.03}}
          whileTap={{scale:0.98}}
          type="submit"
          disabled = { isLoading }
          >
          {isLoading ? <Loader className='animate-spin mx-auto ' size={24} />: "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-700 bg-opacity-60 flex justify-center'>
        <p className='text-sm text-gray-300'>
          Already have an account ?{" "}
          <Link to = {"/login"} className='text-sky-300 hover:underline ' 
          >Login</Link>
        </p>
      </div>
    
    </motion.div>
  )
}

export default SignUpPage