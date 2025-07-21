import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header'
import HomePage from './components/homeComponent';
import Footer from './components/footer';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/register";
import ChatPage from './pages/chatPage';

function App()
{
  const[darkMode, setDarkMode] = useState("");
  useEffect(()=>{
    const themeResult = window.matchMedia("(prefers-color-scheme:dark)").matches
    console.log(themeResult);
    setDarkMode(themeResult);

  },[])
  
  const bg = darkMode ? "dark": ""
  console.log(`bg is : ${bg}`)
  return (
    <div className={`${bg}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div><Header/><Outlet/><Footer/></div>}>
            <Route index element={<HomePage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="chat" element={<ChatPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
