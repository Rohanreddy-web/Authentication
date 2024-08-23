import { useRef , React, useState, useEffect} from 'react'
import { useNavigate  } from 'react-router-dom';
import { motion } from "framer-motion"


const EmailVerificationPage = ()=> {
    const [code, setCode] = useState(["","","","",""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const isLoading = false;
    
    const handileChange = (index,value)=> {
      const newCode = [...code];
      //handiles pasted content
      if(value.length > 1){
        const pastedCode = value.slice(0,6).split("");
        for(let i=0; i<6; i++){
          newCode[i] = pastedCode[i] || "";
        }
        setCode(newCode);

        //focus on last non empty input or first empty one
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "")
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();
      }
      else{
        newCode[index] = value;
        setCode(newCode);
        //move focus to nxt input if value is entered
        if(value && index < 5 ){
          inputRefs.current[index + 1].focus();
        }
      }
    }
    const handileKeyDown = (index,e)=> {
      if(e.key === 'Backspace' && !code[index] && index > 0){
        inputRefs.current[index-1].focus();
      }
    };

    const handileSubmit = (e) => {
      e.preventDefault();
      const verificationCode = code.join("");
      alert(`Verification Code Submitted : ${verificationCode}`)
      
    }
    //auto Submit when all fields are filled
    useEffect(()=>{
      if(code.every((digit) => digit !== '')){
        handileSubmit(new Event('submit'));
      }
    },[code])
  return (

      <motion.div 
      initial={{opacity:0,y:-60}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.2}}
      whileHover={{scale:1.05}}
      className="max-w-md w-full p-8 backdrop-filter  backdrop-blur-xl rounded-2xl shadow-xl  bg-gray-700 bg-opacity-10 overflow-hidden">
        <h2 className='text-3xl mb-6 font-bold text-center bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text'>
        Verify Your Email</h2>
        <p className='text-center text-gray-700 text-opacity-50 mb-6 '> enter the 6 digit code sent to your email</p>
        <form onSubmit={handileSubmit}
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
                onChange={(e)=> handileChange(index,e.target.value)}
                onKeyDown={(e)=> handileKeyDown(index,e)}
                className='w-12 h-12 text-center text-2xl font-bold bg-gray-600 bg-opacity-50 text-white hover:border
                hover:border-gray-500   rounded-lg shadow-xl focus:border-sky-400 focus:outline-none'
                />
              ))
            }
          </div>
          <motion.button
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          type='submit'
          disabled ={isLoading || code.some((digit)=> !digit)}
          className='w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg font-bold  shadow-lg hover:from-sky-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-500 transition duration-200'
          >Verify Email</motion.button>
        </form>
      </motion.div>
    
  )
}

export default EmailVerificationPage