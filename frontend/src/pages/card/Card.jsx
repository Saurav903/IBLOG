/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Collapse, Divider, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text,useDisclosure } from '@chakra-ui/react'
import Comment from '../comment/Comment';
import { BiChat,BiShare } from "react-icons/bi";
import {AiOutlineHeart} from "react-icons/ai";
import {FcLike} from "react-icons/fc";
import {BsThreeDotsVertical} from "react-icons/bs"
import axios from 'axios';
import style from "../../pages/blog.module.css";
import EditButton from './EditButton';

// eslint-disable-next-line react/prop-types
const Cards = ({el,getData}) => {
    const { isOpen, onToggle } = useDisclosure()
    let localValues = JSON.parse(localStorage.getItem("user"));
    const [val,setVal] = useState(false);

    const getLikes = async()=>{
      let value = {
        postIds:el._id,
        authorIds:localValues[0]
      }
      let res = await axios.post('https://iblog-backend-qamo.onrender.com/blogs/likes',value);
      // console.log(res);
      if(res.data === "like present in this post"){
        setVal(true);
      }else {
        setVal(false);
      }
    }

    useEffect(()=>{
      getLikes();
    },[]);
    

    const handleDelete = async(id,publicurl)=>{
        let res = await axios.delete(`https://iblog-backend-qamo.onrender.com/blogs/delete?id=${id}&publicurls=${publicurl}`);

        console.log(res);
        getData();
    }

    const handleLikeClick = async(id)=>{
      let value = {
        authorId:localValues[0]
      }
      let res = await axios.post(`https://iblog-backend-qamo.onrender.com/blogs/updatelike/${id}`,value);
      console.log(res);
      getLikes();
      getData();
    }

  
  return (
    <>
        <Card className={style.cards} maxW='md' boxShadow={"inset 0 0 15px rgb(70, 70, 70)"} key={el._id} position={"relative"}>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name={`${el.author.username}`} src={el.author.profile ? el.author.profile: ""} border="1px solid black" />

            <Box>
              <Text size='sm' className={style.name} >{el.author.username}</Text>
              <Text className={style.date}>{el.title}, {el.date}</Text>
            </Box>
          </Flex>
          {el.author._id === localValues[0] ?  <Menu>
          <MenuButton bg="white" as={Button} leftIcon={<BsThreeDotsVertical/>}>
          </MenuButton>
          <MenuList>
            <MenuItem><EditButton el={el} getData={getData} /></MenuItem>
            <MenuItem onClick={()=>handleDelete(el._id,el.publicurl)}><Button w="100%">Delete</Button></MenuItem>
            <MenuItem><Button w="100%">Share</Button></MenuItem>
          </MenuList>
        </Menu> : ""}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text className={style.content}>
          {el.content}
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src={el.images ? el.images : "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
        alt='Chakra UI'
        padding="10px"
        borderRadius={"30px"}
      />

      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex='1' variant='ghost' leftIcon={val ? <FcLike/>:<AiOutlineHeart />} onClick={()=>handleLikeClick(el._id)}>
           {el.likedBy.length}
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={onToggle}>
         {el.comments.length}
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
          Share
        </Button>
        <Divider/>
        <Box w="100%">
        <Collapse in={isOpen} animateOpacity w="100%">
        <Box w="100%" h="auto" display="block" key={el._id}>
          <Comment el={el} getData={getData}/>
        </Box>
        </Collapse>
        </Box>
      </CardFooter>
    </Card>
    </>
  )
}

export default Cards