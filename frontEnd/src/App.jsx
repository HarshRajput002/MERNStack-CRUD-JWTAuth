import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import './index.css';
import RegisterModal from './RegisTer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';

function App() {

const [Reg,SetReg]=useState(false)

  return (
    <Router>
    <>
   {Reg && <RegisterModal onClose={() => SetReg(false)}/>}
    <Routes>
      <Route path="/" element={<LoginForm RegiButton={()=>SetReg(true)}/>}></Route>
      <Route path="/Home" element={<MainPage></MainPage>} ></Route>
      </Routes> 
    </>
    </Router>
  )
}

export default App
