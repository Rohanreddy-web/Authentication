import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
import FloatingShape from "./component/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
    className='min-h-screen bg-gradient-to-br
    from-sky-400 via-sky-300 to-blue-500 flex items-center justify-center relative overflow-hidden'
  >
    <FloatingShape color='bg-gray-600' size='w-64 h-64' top='-5%' left='10%' delay={0} />
    <FloatingShape color='bg-gray-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
    <FloatingShape color='bg-red-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

    <Routes>
      <Route
        path='/signup'
        element={
            <SignUpPage />
        }
      />
      <Route
        path='/login'
        element={
            <LoginPage />
        }
      />
      <Route path='/verify-email' element={<EmailVerificationPage />} />

    </Routes>
    
  </div>
);
}

export default App;