import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useState } from 'react'
import axios from "axios";
const CreatePost = ({isOpen,onClose,getData}) => {
    const [image,setPho] = useState("");
    const [title,settitle] = useState("");
    const [content,setcontent] = useState("");
    const [category,setcategory] = useState("");
    const [loadin,setLoading] = useState(false);
    let localValues = JSON.parse(localStorage.getItem("user"));
    const handleClick = ()=>{
        setLoading(true);
        const form = new FormData();
        form.append("file",image);
        form.append("upload_preset","kqxwsiec");
        form.append("cloud_name","dcpjxtuaw");
    
        fetch("https://api.cloudinary.com/v1_1/dcpjxtuaw/image/upload",{
          method:"POST",
          body:form
        }).then((res)=>res.json()).then(async(res)=>{
            let value = {
                username:localValues[1],
                images:res.url,
                title:title,
                content:content,
                category:category,
                date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                publicurl:res.public_id,
                likes:0,
                author:`${localValues[0]}`
              }
              let response = await axios.post('https://iblog-backend-qamo.onrender.com/post',value);
        console.log(response.data);
        onClose();
        getData();
        setLoading(false);
        })
      }

  return (
    <>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={(e)=>setPho(e.target.files[0])}/>
            <Input type="text" onChange={(e)=>settitle(e.target.value)} placeholder='Enter Title'/>
            <Input type="text" onChange={(e)=>setcontent(e.target.value)} placeholder='Enter Content'/>
            <Input type="text" onChange={(e)=>setcategory(e.target.value)} placeholder='Enter Category'/>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>
              Close
            </Button>
            <Button isLoading={loadin ? true: false} colorScheme='blue' ml={3} onClick={()=>handleClick()}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost