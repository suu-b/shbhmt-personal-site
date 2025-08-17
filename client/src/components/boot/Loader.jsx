import { motion } from "framer-motion"
import BarLoader from "react-spinners/BarLoader"

export default function Loader() {
    const quote = "We are dwarfs perched on the shoulders of giants. [We may see more or farther, however, not of a keener eye or a greater height, but, the giants bear us up]."
    const quoteCredit = "~ Bernard of Chartres [later popularized by Newton]"

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full max-w-2xl px-4 py-8 mx-auto">
            <div className="absolute inset-0 bg-opacity-70" />
            <div className="relative text-center text-slate-300">
                <motion.p
                    className="text-xl sm:text-2xl md:text-3xl leading-snug"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    {quote}
                </motion.p>
                <motion.p
                    className="text-base sm:text-lg font-light mt-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    {quoteCredit}
                </motion.p>
            </div>
            <BarLoader color="#ffffff" className="mt-10" />
        </div>
    )
}
