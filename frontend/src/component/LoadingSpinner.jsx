import { motion } from "framer-motion"

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-sky-300 to-sky-400 flex items-center justify-center relative overflow-hidden">
            {/* simple loading spinner */}
            <motion.div className="w-16 h-16 border-2 border-t-4 border-t-sky-400 border-gray-300 rounded-full"
            animate={{rotate: 360}}
            transition={{duration:1,ease:"linear", repeat:Infinity}}/>
        </div>
    );
};
export default LoadingSpinner