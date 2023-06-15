import { Box, Button,useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import style from "./blog.module.css";
import CreatePost from './createPost/CreatePost';
import Cards from './card/Card';
import Loader from '../components/loader/Loader';
const Blog = () => {
  const [data,setdata] = useState([]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getData = async()=>{
    let res =await axios.get(`https://iblog-backend-qamo.onrender.com/blogs/posts`);
     setdata(res.data.reverse());
  }


  useEffect(()=>{
    getData();
  },[])

  console.log(data);
  return (
    <Box>
    <Box className={style.main}>
    <Box position={"absolute"} display={"grid"} gap="10px" justifyContent={"center"} alignItems={"center"} pt="100px" left={"0"} right={"0"} >
    <CreatePost isOpen={isOpen} onClose={onClose} getData={getData} />
    <Button onClick={onOpen}>Create Post</Button>
      {data?.map((el)=>(
        <Cards key={el._id} el={el} getData={getData} />
      ))}
      
    </Box>
      <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
    <path fill="#12f7ff">
      <animate attributeName='d' dur="20000ms" repeatCount="indefinite" values="M390,334.5Q347,419,238.5,438.5Q130,458,75.5,354Q21,250,81,155.5Q141,61,241,77Q341,93,387,171.5Q433,250,390,334.5Z;

      M395.5,330Q342,410,238.5,430Q135,450,76,350Q17,250,83.5,163.5Q150,77,244,87Q338,97,393.5,173.5Q449,250,395.5,330Z;
      
      M386,331.5Q344,413,238,433.5Q132,454,89,352Q46,250,101.5,169.5Q157,89,250,89Q343,89,385.5,169.5Q428,250,386,331.5Z;
      
      M410.5,332.5Q345,415,235,440.5Q125,466,90,358Q55,250,101,160.5Q147,71,245,80Q343,89,409.5,169.5Q476,250,410.5,332.5Z;
      
      M412,330Q342,410,236.5,433Q131,456,98,353Q65,250,112,171.5Q159,93,262.5,71Q366,49,424,149.5Q482,250,412,330Z;
      
      M404.5,355Q371,460,249.5,460.5Q128,461,77,355.5Q26,250,79,148Q132,46,249.5,46.5Q367,47,402.5,148.5Q438,250,404.5,355Z;
      
      M390,334.5Q347,419,238.5,438.5Q130,458,75.5,354Q21,250,81,155.5Q141,61,241,77Q341,93,387,171.5Q433,250,390,334.5Z;"></animate>
    </path>
  </svg>
      </Box>
    </Box>
  )
}

export default Blog