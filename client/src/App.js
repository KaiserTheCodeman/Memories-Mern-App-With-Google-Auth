import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import {GoogleOAuthProvider} from '@react-oauth/google'


const App = () => {
    

    


  return (
    <GoogleOAuthProvider clientId='824893042083-5rc7m4id0ui6se7efc1m5phd47o7cgfq.apps.googleusercontent.com' >
      <BrowserRouter>
        <Container maxWidth="lg" >
         <Navbar />
         <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/auth' element= {<Auth />} />
         </Routes>
         
        </Container>
      </BrowserRouter>
   </GoogleOAuthProvider>
    
  )
}

export default App