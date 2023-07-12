import { useState } from 'react'
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import style from "./login.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loginSuccess,setloginSuccess] = useState(false);
  const handleClick = async()=>{
    let value = {
      email,
      password
    }
    let response = await axios.post("https://cute-lime-magpie-hem.cyclic.app/user/login",value);
    console.log(response);
    localStorage.setItem("token",response.data.token);
    let val = [];
    if(response.data){
      setloginSuccess(true);
    }
    val.push(response.data.user[0]._id);
    val.push(response.data.user[0].username)
    localStorage.setItem("user",JSON.stringify(val));
    setTimeout(()=>{
      setloginSuccess(false);
      navigate("/blog")
    },2000)
    
  }
  return (
    <Box bg="#1a202c" height={"100vh"} background={"rgb(0,30,58)"} backgroundSize={"cover"} backgroundPosition={"center"} zIndex={"0"}>
    <Box width={"30%"} margin={"auto"} pt="90px">
    <Box display={loginSuccess ? "block":"none"}><Alert status='success'>
    <AlertIcon />
    Login Successful!
  </Alert></Box>
    <Heading textAlign={"center"} color={"whiteAlpha.900"}>LogIn Page</Heading>
      <FormControl isRequired className={style.main}>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        <FormLabel>Enter Password</FormLabel>
        <Input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        <Button mt="20px" color={"#2d3748"} onClick={()=>handleClick()}>Login</Button>
      </FormControl>
    </Box>
    </Box>
  )
}

export default Login