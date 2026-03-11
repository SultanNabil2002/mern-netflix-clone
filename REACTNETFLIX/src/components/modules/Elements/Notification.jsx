import React from 'react'
import { motion } from 'framer-motion'
import { GoCheckCircle } from 'react-icons/go'

const Notification = ({ message }) => {
    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[999]">
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-3 px-6 py-3 bg-black/90 backdrop-blur-md border border-white/20 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] text-white font-medium min-w-max"
            >
                <GoCheckCircle className="text-green-500" size={24} />
                <span>{message}</span>
            </motion.div>
        </div>
    )
}

export default Notification