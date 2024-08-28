import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./component/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuthStore } from "./store/authStore";
import { useEffect,React } from "react";
import HomePage from "./pages/HomePage";

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
  const {isCheckingAuth, checkAuth,isAuthenticated,user} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  return (
    <div
    className='min-h-screen bg-gradient-to-br
    from-sky-400 via-sky-300 to-blue-500 flex items-center justify-center relative overflow-hidden'>
    <FloatingShape color='bg-gray-600' size='w-64 h-64' top='-5%' left='10%' delay={0} />
    <FloatingShape color='bg-gray-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
    <FloatingShape color='bg-red-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

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
      <Route path='/verify-email' element={ <EmailVerificationPage /> } />
      {/* catch all routes */}
      {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
    </Routes>
  </div>
);
}

export default App;