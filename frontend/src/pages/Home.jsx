import { Box, FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react'
import React from 'react'
import style from "../pages/login.module.css";
import Loader from '../components/loader/Loader';

const Home = () => {
  return (
    <Box display={"grid"} background={"rgb(0,30,58)"} h="auto" backgroundSize={"cover"} backgroundPosition={"center"} backgroundRepeat={"no-repeat"} >
      <Box mt={"100px"} textAlign={"center"}>
        <Heading color={"white"}>IBLOG</Heading>
      </Box>
      <Box className={style.homemain}>
        <Text className={style.hometext}>
        Welcome to our revolutionary blog app, where creativity meets convenience! Whether you're a seasoned blogger or just starting out, our app is designed to enhance your blogging experience and connect you with a vibrant community of like-minded individuals. With an intuitive interface and powerful features, we strive to provide you with the ultimate platform to showcase your thoughts, insights, and passions. Let's dive into what makes our blog app truly exceptional.
        <hr/>
        Simplicity is at the heart of our blog app. We believe that blogging should be effortless and enjoyable, without the need for technical expertise. Our user-friendly interface allows you to create and publish captivating blog posts with ease. From formatting your text to adding images and videos, our intuitive editor empowers you to bring your content to life. No more struggling with complicated tools or spending hours learning coding – with our app, you can focus on what matters most: expressing your ideas.
        <hr/>
        Joining our blog app means becoming part of a dynamic community. Connect with fellow bloggers who share your interests, and engage in vibrant discussions that expand your horizons. Explore a wide range of topics and discover fresh perspectives from people all around the world.
        <hr/>
        To make your blog truly unique, customization is key. Our app offers a wide range of beautifully designed templates and themes to suit your personal style. From minimalist designs that let your words shine to vibrant layouts that capture attention, we have something for everyone. Tailor your blog's appearance to reflect your personality and make a lasting impression on your readers. With our app, you have the freedom to create a blog that stands out from the crowd.
        <hr/>
        But our blog app is more than just a platform – it's a complete ecosystem that empowers you to reach a wider audience. Our built-in SEO optimization tools ensure that your blog posts are discoverable and rank well in search engines. Share your posts seamlessly across social media platforms, and let your voice be heard by readers around the globe. We understand the importance of visibility and growth, and we provide you with the tools to expand your reach and maximize your impact.
        <hr/>
        Whether you're a professional writer, a passionate hobbyist, or an aspiring influencer, our blog app is here to support your journey. Experience the future of blogging today and unleash your creativity like never before. Join our vibrant community, express yourself, and make your mark in the digital world. Welcome to the revolution of blogging. Welcome to our blog app.
        </Text>
      </Box>
      <Box position={"absolute"} zIndex={1}>
        <Loader/>
      </Box>
    </Box>
  )
}

export default Home