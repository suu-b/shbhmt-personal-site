import React from "react"
import { motion } from "framer-motion"
import { FaArrowDown } from "react-icons/fa"
import { Link } from "react-router"

export default function Introduction() {
    const texts = [
        { text: "Hi👋", element: "h1", className: "text-xl" },
        { text: "I'm Shubham (suu-b).", element: "h1", className: "text-xl text-slate-200" },
        { text: "As of Spring 2025, I’m an undergrad student pursuing a degree in Computer Science. But this degree is not all that defines me (and I’m sure that perhaps, this is the case for you too). We, as humans, are like Oceans – deeper than anything in the world. Wild are our dreams, wishes, and imaginations, as the bellowing waves of oceans, yet, we remain fragile in all terms, as frail reeds near river banks. Moreover, we’re not monochromatic. We’re not static. We’re colorful, abstract, random! Constantly changing – absorbing new characteristics and forgetting, intentionally or unintentionally, our previous selves.", element: "p", className: "text-xl text-justify font-light text-slate-300" },
    ]

    return (
        <section className="h-screen flex flex-col items-center justify-center text-2xl sm:text-3xl md:text-4xl text-[#f3f3f3] text-justify w-full max-w-2xl px-4 mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute left-3 top-0"
            >
                <Link to="/welcome-quote" className="text-sm text-gray-400 underline cursor-pointer">In case you missed the welcome quote, visit here (there's a collage attached!)</Link>
            </motion.div>
            {texts.map((text, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 1, duration: 0.8 }}
                    className="mb-4"
                >
                    {React.createElement(text.element, { className: text.className }, text.text)}
                </motion.div>
            ))}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="flex flex-col items-center mt-8  animate-bounce"
            >
                <p className="text-sm text-gray-400">Scroll down</p>
                <FaArrowDown className="mt-2" size={20} />
            </motion.div>
        </section>

    )
}
