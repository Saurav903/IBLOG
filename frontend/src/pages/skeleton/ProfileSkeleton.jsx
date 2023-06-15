import { Box, Skeleton } from '@chakra-ui/react'
import React from 'react'

const ProfileSkeleton = () => {
  return (
    <>
        <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap="10px">
            <Skeleton height='200px' w="100%"/>
            <Skeleton height='200px'  w="100%"/>
            <Skeleton height='200px'  w="100%"/>
            <Skeleton height='200px' w="100%"/>
            <Skeleton height='200px'  w="100%"/>
            <Skeleton height='200px'  w="100%"/>
            <Skeleton height='200px' w="100%"/>
            <Skeleton height='200px'  w="100%"/>
            <Skeleton height='200px'  w="100%"/>
        </Box>
    </>
  )
}

export default ProfileSkeleton