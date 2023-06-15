import { Avatar, Box, Button, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import style from "./profile.module.css";
import { CChart } from "@coreui/react-chartjs";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import ProfileSkeleton from "./skeleton/ProfileSkeleton";

const Profile = () => {
  const [data1,setData] = useState([]);
  const [user1,setUser] = useState({});
  const [skel,setSkel] = useState(true);
  const [profile,setProfile] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  let localValues = JSON.parse(localStorage.getItem("user"));
  const getData = async()=>{
    let response = await axios.get(`https://iblog-backend-qamo.onrender.com/blogs/posts`);
    let data = response.data.filter(el=> el.author._id == localValues[0]);
    setTimeout(()=>{
      setData(data);
      setSkel(false);
    },1000)
  }
  const getUser = async()=>{
    let response = await axios.get(`https://iblog-backend-qamo.onrender.com/user/get/${localValues[0]}`);
    setUser(response.data);
  }

  const handleUpload = async()=>{
    const form = new FormData();
        form.append("file",profile);
        form.append("upload_preset","kqxwsiec");
        form.append("cloud_name","dcpjxtuaw");
    
        fetch("https://api.cloudinary.com/v1_1/dcpjxtuaw/image/upload",{
          method:"POST",
          body:form
        }).then((res)=>res.json()).then(async(res)=>{
            const value = {
              username:user1.username,
              email:user1.email,
              password:user1.password,
              profile:res.url
              };
    const respond = await axios.patch(`https://iblog-backend-qamo.onrender.com/user/update/${user1._id}`,value);
    console.log(respond.data);
    getData();
    getUser();
    onClose()
    })
}

  useEffect(()=>{
    getData();
    getUser();
  },[])
  return (
    <>
      <Box display={"flex"} pt="80px" background={"rgb(0,30,58)"}>
        <Box
          flex={"2"}
          border={"2px solid black"}
          h="100vh"
          padding={"10px"}
          position={"fixed"}
          w="20%"
        >
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src={user1.profile ? user1.profile :""}
              bg="red.300"
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"} className={style.zoom}><Button bg="none" _hover={{backgroundColor:"none"}} onClick={onOpen}><FaEdit as={Button} color="white" fontSize={"20px"} /></Button></Box>
          <Heading color={"white"} textAlign={"center"}>
            {localValues[1]}
          </Heading>
          <Text color={"white"} textAlign={"center"}>
            {user1.email}
          </Text>
          <Box w={"100%"} mt="20px">
          <CChart
            type="doughnut"
            data={{
              labels: ["Reach", "Blog Engagement", "Likes", "Online"],
              datasets: [
                {
                  backgroundColor: ["#DD1B16", "#E46651", "#00D8FF", "#41B883"],
                  data: [data1.length*10, (Math.floor(Math.random() * 10)+1)*10, (Math.floor(Math.random() * 10)+1)*10, (Math.floor(Math.random() * 10)+1)*10],
                },
              ],
            }}
          />
        </Box>
        </Box>
        
        <Box className={style.right}>
        {skel ? <ProfileSkeleton/> : <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap="10px">
            {data1?.map((el)=>(
              <Box w="100%" className={style.container} key={el._id} borderRadius={"10px"} boxShadow= {"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
              <Text className={style.overlay}>{el.content}</Text>
              <Image
                src={el.images}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                w="100%"
                h="100%"
                objectFit={"cover"}
              />
            </Box>
            ))}
          </Box>}
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
              <Input type="file" onChange={(e)=>setProfile(e.target.files[0])}/>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>handleUpload()}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </>
  );
};

export default Profile;
