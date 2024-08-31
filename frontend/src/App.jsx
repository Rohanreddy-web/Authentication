import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./component/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect,React } from "react";

import  LoadingSpinner  from "./component/LoadingSpinner";

//protect routes that are authenticated
const ProtectedRoute = ({ children })=>{
  const {isAuthenticated, user} = useAuthStore();
      if(!isAuthenticated){
          return (<Navigate to ='/login' replace />)
      }
      if(!user.isVerified){
          return (<Navigate to ='/verify-email' replace />)
      }

    return children; //return the actual route the protected page
};
//redirect authenticated user to home page 
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
  const {isCheckingAuth, checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth){
    return <LoadingSpinner/>
  }

  return (
    <div
    className='min-h-screen bg-gradient-to-br
    from-sky-400 via-sky-300 to-blue-500 flex items-center justify-center relative overflow-hidden'>
        <FloatingShape color='bg-gray-600' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatingShape color='bg-gray-700' size='w-48 h-48' top='70%' left='70%' delay={4} />
        <FloatingShape color='bg-red-600' size='w-32 h-32' top='40%' left='-5%' delay={2} />

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute> || "home"
            }
          />
          <Route
            path='/signup'
            element={
              <RedirectAuthenticatedUser>
                    <SignUpPage />
              </RedirectAuthenticatedUser> 
            }
          />
          <Route
            path='/login'
            element={
              <RedirectAuthenticatedUser>
                    <LoginPage />
              </RedirectAuthenticatedUser> 
            }
          />
          
          <Route path='/verify-email' element={  
              <RedirectAuthenticatedUser>
                <EmailVerificationPage />
              </RedirectAuthenticatedUser> 
          } 
          />
          <Route path='/forgot-password' element={  
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser> 
          } 
          />
          <Route
              path='/reset-password/:token'
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />
          {/* catch all routes */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Toaster />
  </div>
);
}

export default App;