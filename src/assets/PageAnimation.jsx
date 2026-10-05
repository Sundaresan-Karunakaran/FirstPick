import { motion } from "motion/react"
import * as React from "react";

const animation = {
    initial: {opacity: 0, x: 100},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: -100},
}
const PageAnimation = ({children}) => {

    return (
        <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{duration: 1}}
        >
            {children}
        </motion.div>
    )
}


export default PageAnimation