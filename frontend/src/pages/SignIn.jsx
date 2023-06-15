import { Box, Button, FormControl, FormLabel, Heading, Input,useToast } from '@chakra-ui/react'
import { useState } from 'react'
import style from "./login.module.css";
import axios from 'axios';
const SignIn = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username,setusername] = useState("");
  const toast = useToast()
  const handleClick = async()=>{
    let value = {
      username:username,
      email:email,
      password:password,
      profile:""
    }
    let response = await axios.post("https://iblog-backend-qamo.onrender.com/user/register",value);
    console.log(response);
    toast({
      title: 'Account created.',
      description: "We've created your account, now login first.",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    setEmail("");
    setPassword("");
    setusername("");
  }
  return (
    <Box bg="#1a202c" height={"100vh"} background={"rgb(0,30,58)"} backgroundSize={"cover"} backgroundPosition={"center"} zIndex={"0"}>
    <Box width={"30%"} margin={"auto"} pt="90px">
    <Heading textAlign={"center"} color={"white"}>SignUp Page</Heading>
      <FormControl isRequired className={style.main}>
        <FormLabel>Username</FormLabel>
        <Input placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)}/>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <FormLabel>Enter Password</FormLabel>
        <Input placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <FormLabel>Confirm Password</FormLabel>
        <Input placeholder='Confirm Password' type="password"/>
        <Button color={"#2d3748"} onClick={()=>handleClick()}>SignUp</Button>
      </FormControl>
    </Box>
    </Box>
  )
}

export default SignIn