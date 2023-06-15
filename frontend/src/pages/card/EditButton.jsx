/* eslint-disable react/prop-types */
import { Button,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

import axios from 'axios';


const EditButton = ({el,getData}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [images,setPho] = useState("");
    const [title,settitle] = useState("");
    const [content,setcontent] = useState("");
    const [category,setcategory] = useState("");
    const [loadin,setLoading] = useState(false);

    const handleEdit = async()=>{
        setLoading(true);
        const form = new FormData();
        form.append("file",images);
        form.append("upload_preset","kqxwsiec");
        form.append("cloud_name","dcpjxtuaw");
    
        fetch("https://api.cloudinary.com/v1_1/dcpjxtuaw/image/upload",{
          method:"POST",
          body:form
        }).then((res)=>res.json()).then(async(res)=>{
            const value = {
              username:el.username,
              images:res.url ? res.url : el.images,
              title:title ? title : el.title,
              content:content ? content : el.content,
              category:category ? category : el.category,
              date:el.date,
              publicurl:res.public_url ? res.public_url: el.publicurl,
              likedBy:el.likedBy,
              author:el.author,
              comments:el.comments
            };
              let response = await axios.patch(`https://iblog-backend-qamo.onrender.com/blogs/update/${el._id}`,value);
        console.log(response.data);
        onClose();
        getData();
        setLoading(false);
    })
}
  return (
    <>
        <Button onClick={onOpen} w="100%">Edit</Button>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input type="file" onChange={(e)=>setPho(e.target.files[0])}/>
            <Input type="text" onChange={(e)=>settitle(e.target.value)} placeholder='Enter Title'/>
            <Input type="text" onChange={(e)=>setcontent(e.target.value)} placeholder='Enter Content'/>
            <Input type="text" onChange={(e)=>setcategory(e.target.value)} placeholder='Enter Category'/>
          </ModalBody>

          <ModalFooter>
            <Button  isLoading={loadin ? true: false} colorScheme='blue' onClick={()=>
             handleEdit()}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditButton;