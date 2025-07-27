import React,{useState,useEffect} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {AnimatePresence, motion} from "framer-motion"
const ProjectImage = ({img}) => {
    const[imageLoad,setImageLoad] = useState(false)
    const handleImg = () => {
        setTimeout(() => {
            setImageLoad(true)
        },3000)
    }
  return (
    <AnimatePresence >
        <div>
            <LazyLoadImage 
                src={img}
                className={`object-cover border-right-ouline transition-all !h-[246px] ${imageLoad ? "load" : ''}`}
                alt="Twitter Clone"
                loading='lazy'
                onLoad={handleImg}
            />
        </div>
    </AnimatePresence>
  )
}

export default ProjectImage
