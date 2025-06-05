import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import './index.css';
import RegisterModal from './RegisTer';

function App() {
const [Reg,SetReg]=useState(false)

  return (
    <>
   {Reg && <RegisterModal onClose={() => SetReg(false)}/>}
     <LoginForm RegiButton={()=>SetReg(true)}/>
    </>
  )
}

export default App
