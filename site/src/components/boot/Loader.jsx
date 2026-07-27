import { motion } from "framer-motion"
import BarLoader from "react-spinners/BarLoader"

export default function Loader() {
    const quote = "We've all got both light and dark inside us. What matters is the part we choose to act on. That's who we really are."
    const quoteCredit = "~ Sirius Black (from Harry Potter and the Order of the Phoenix)"

    return (
        <div className="bg-[#101010] absolute inset-0 flex flex-col items-center justify-center w-full max-w-full md:max-w-[50vw] px-6 py-8 mx-auto">
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
