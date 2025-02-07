import React, {FC} from 'react';
import {motion} from "framer-motion";

type Props={
    isVisible: boolean,
}

const TypingAnimatedDots: FC<Props> = ({isVisible}) => {
    return (
        <div className={`${(isVisible)?'d-flex':'d-none'} p-2`}>
            <motion.span animate={{
                y: [0, -8, 0]
            }}
                         transition={{
                             duration: 1.7,
                             repeat: Infinity,
                             ease: "easeInOut"
                         }}
                         className={'fs-3 m-1 bullet bullet-dot'}></motion.span>
            <motion.span animate={{
                y: [0, -8, 0]
            }}
                         transition={{
                             duration: 1.7,
                             repeat: Infinity,
                             ease: "easeInOut",
                             delay: 0.25
                         }}
                         className={'fs-3 m-1 bullet bullet-dot'}></motion.span>
            <motion.span animate={{
                y: [0, -8, 0]
            }}
                         transition={{
                             duration: 1.7,
                             repeat: Infinity,
                             ease: "easeInOut",
                             delay: 0.5
                         }}
                         className={'fs-4 m-1 bullet bullet-dot'}></motion.span>

        </div>
    );
};

export default TypingAnimatedDots;