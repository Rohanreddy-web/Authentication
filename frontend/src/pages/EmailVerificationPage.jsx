import  React,{ useRef , useState, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import { motion } from "framer-motion"
import { useAuthStore } from '../store/authStore';
import toast from "react-hot-toast"

const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { error, isLoading, verifyEmail } = useAuthStore();

	const handleChange = (index, value) => {
    const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}

	};

	const handleSubmit = async (e) => {
    e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			navigate("/");
			toast.success("Email verified successfully");
		} catch (error) {
			console.log(error);
		}
	};

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);
  return (

      <motion.div 
      initial={{opacity:0,y:-60}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.2}}
      // whileHover={{scale:1.05}}
      className="max-w-md w-full p-8 backdrop-filter  backdrop-blur-xl rounded-2xl shadow-xl  bg-gray-700 bg-opacity-10 overflow-hidden">
        <h2 className='text-3xl mb-6 font-bold text-center bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text'>
        Verify Your Email</h2>
        <p className='text-center text-gray-700 text-opacity-50 mb-6 '> enter the 6 digit code sent to your email</p>
        <form onSubmit={handleSubmit}
        className='space-y-6 '
        type="submit">
          <div
          className='flex justify-between'>
            {
              code.map((digit,index)=>(
                <input
                key={index}
                ref={(el)=> (inputRefs.current[index] = el)}
                type="text"
                maxLength='6'
                value={digit}
                onChange={(e)=> handleChange(index,e.target.value)}
                onKeyDown={(e)=> handleKeyDown(index,e)}
                className='w-12 h-12 text-center text-2xl font-bold bg-gray-600 bg-opacity-50 text-white border-2 border-gray-400 hover:border-gray-500   rounded-lg shadow-xl focus:border-sky-400 focus:outline-none'
                />
              ))
            }
          </div>
          {error && <p className='text-red-600 font-thick mt-2'>{error}</p>}
          <motion.button
          // whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          type='submit'
          disabled ={isLoading || code.some((digit)=> !digit)}
          className='w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg font-bold  shadow-lg hover:from-sky-500 hover:to-blue-600 focus:outline-none transition duration-200'
          >
          {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
  )
}

export default EmailVerificationPage