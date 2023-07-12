/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Divider, Input, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import style from "./comment.module.css";
import axios from 'axios';
const Comment = ({el,getData}) => {
  
  const [displays,setDisplays] = useState(false);
  const [contents,setcontents] = useState("");
  let localValues = JSON.parse(localStorage.getItem("user"));
  let localValuestoken = localStorage.getItem("token");
  const handleCommentdisplay = ()=>{
    setDisplays(!displays);
  }
  const handleSubmit = async()=>{
    let value = {
      blog_id:el._id,
      username:localValues[1],
      content:contents
    }

    let res= await axios.post(`https://cute-lime-magpie-hem.cyclic.app/blogs/comment`,value,{headers:{Authorization:localValuestoken}});
    setcontents("")
    console.log(res.data);
    getData();
    
  }
  return (
    <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding="10px" w="100%">
            <Text fontSize="15px" fontWeight={"bold"}>Comments..</Text>
            <Button onClick={()=>handleCommentdisplay()}>Show</Button>
        </Box>
        <Divider/>
        <>
          <Box className={style.scrolls} display={displays ? "grid": "none"}>
            {el.comments?.map((els)=>(
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding="10px" w="100%" key={els._id}>
            <Box display="grid">
              <Avatar name={`${els.username}`} />
              <Text fontWeight={"bold"}>{els.username}</Text>
            </Box>
            <Textarea value={`${els.content}`} />
            </Box>
            ))}
          </Box>
        </>
        <Divider/>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap="5px">
        <Input onChange={(e)=>setcontents(e.target.value)} value={contents} placeholder='comment here'/>
        <Button onClick={()=>handleSubmit()}>comment</Button>
        </Box>
    </Box>
  )
}

export default Comment