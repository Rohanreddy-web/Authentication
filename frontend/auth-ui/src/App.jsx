import FloatingShape from "./component/FloatingShape"
function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-sky-300 to-blue-200 flex items-center justify-center relative overflow-hidden">
      <FloatingShape 
      color="bg-gray-900" size="w-64 h-64" top="-5%" left = "10%" delay ={0}
      />
      <FloatingShape 
      color="bg-gray-900" size="w-48 h-48" top="70%" left = "80%" delay ={5}
      />
      <FloatingShape 
      color="bg-gray-900" size="w-32 h-32" top="40%" left = "-10%" delay ={5}
      />
      <Routes>
        <Route path="/" element = {"Home"}/>
        <Route path="/signup" element = {<SignUpPage/>}/>
        <Route path="/login" element = {<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
