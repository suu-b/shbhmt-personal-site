import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaArrowDown } from "react-icons/fa"
import { Anchor } from "../Anchor"
import logo from "/assets/renaissance_man.png"

export default function Introduction() {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const texts = [
        { text: "Hey, I'm Shubham!", element: "h1", className: "text-xl text-slate-400" },
        { text: "As of Spring 2025, I am a CS student.", element: "p", className: "text-xl text-slate-400" },
        { 
            text: (
                <>
                    I aspire to be a{" "}
                    <Anchor text="polymath" link="https://en.wikipedia.org/wiki/Polymath"/>
                    . This site is a preface to me.
                </>
            ), 
            element: "p", 
            className: "text-xl mx-auto text-center font-light text-slate-400" 
        }
    ]

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = logo;
    }, []);

    return (
        <section className="h-screen flex flex-col items-center justify-center text-2xl sm:text-3xl md:text-4xl text-[#f3f3f3] text-justify w-full max-w-[50vw] px-4 mx-auto">
            <motion.a
              href="https://en.wikipedia.org/wiki/Vitruvian_Man"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="block mx-auto mb-5 w-fit h-28 flex items-center justify-center"
            >
                <motion.img
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: imageLoaded ? 1 : 0, y: 0 }}
                    transition={{ delay: 2, duration: 2, ease: "easeOut" }}
                    className="mx-auto w-28 h-28 rounded-xl shadow-lg object-cover"
                    src={logo}
                    alt="The Virtruvian Man, alternatively called as the Renaissance Man"
                />
            </motion.a>
            {texts.map((text, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 1, duration: 0.8 }}
                    className="mb-2"
                >
                    {React.createElement(text.element, { className: text.className }, text.text)}
                </motion.div>
            ))}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="flex flex-col items-center mt-8 animate-bounce"
            >
                <p className="text-sm text-gray-400">Scroll down</p>
                <FaArrowDown className="mt-2" size={20} color="#cad2dc"/>
            </motion.div>
        </section>
    )
}
