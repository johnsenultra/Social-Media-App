import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Layout from "./pages/Layout";
import Home from "./pages/Home";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={ <Signin />} />
        <Route path="signup" element={ <Signup />} />
        <Route path="/" element={ <Layout />} >
          <Route index element={ <Home />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
