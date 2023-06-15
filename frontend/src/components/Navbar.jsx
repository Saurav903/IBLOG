import { Box, Button } from '@chakra-ui/react'
// import React from 'react'
import style from "./navbar.module.css";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleClick = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <Box position={"fixed"} display={"flex"} justifyContent={"space-around"} alignItems={"center"} height={"80px"} boxShadow= "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" fontWeight={"bold"}  color={"whiteAlpha.900"} w="100%" fontSize={"larger"} backdropFilter={"blur(20px)"} border={"1px solid rgba(255,255,255,0.3)"} zIndex={"1"}>
        <Link to={"/"} className={style.link}>Home</Link>
        <Link to={"/signup"} className={style.link}>SignUp</Link>
        {token ? <Button onClick={()=>handleClick()} bg="none" _hover={{backgroundColor:"blue.400"}}>Logout</Button> : <Link to={"/login"} className={style.link}>LogIn</Link>}
        <Link to={"/blog"} className={style.link}>Blog</Link>
        <Link to={"/profile"} className={style.link}>Profile</Link>
    </Box>
  )
}

export default Navbar