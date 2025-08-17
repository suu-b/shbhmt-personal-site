import { motion } from "framer-motion"

import collageCover from "/assets/collage-cover.png"
import Article from "../Article"

export default function Giants() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-8 mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0, duration: 1 }}>
                <h1 className="text-4xl text-center mb-2">We are dwarfs perched on the shoulders of giants. [We may see more or farther, however, not of a keener eye or a greater height, but, the giants bear us up].</h1>
                <p className="text-slate-400 text-center italic mb-10 text-base">~ Bernard of Chartres [however, Sir Isaac Newton popularized the quote]</p>
            </motion.div>

            <motion.img
                className="w-full max-w-lg"
                src={collageCover}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                alt="collage cover features- Plato, Pythagoras, Nietzsche, Leonardo Da Vinci, Aristotle, Beethoven, Socrates; Swami Vivekananda, Rabindranath Tagore, M.K. Gandhi, Anne Frank, Led Zeppelin, Albert Einstein; Michael Jackson, Bertrand Russell, Alan Turing, Oscar Wilde, John Keats, Paulo Coelho, Dante—spanning philosophy, science, music, and literature."
            ></motion.img>
            <div id="content" className="w-full max-w-lg text-justify pt-10">
                <Article fileName="giants" />
                <p className="text-slate-300 text-lg  my-5 text-justify">
                    And here are all those (excluding my loved ones and teachers), of whose mosaic I am: Listing from the row from bottom, left to right:
                </p>
                <ul>
                    <li>Plato</li>
                    <li>Pythagoras</li>
                    <li>Nietzsche</li>
                    <li>Leonardo Da Vinci</li>
                    <li>Aristotle</li>
                    <li>Beethoven</li>
                    <li>Socrates</li>
                    ---
                    <li>Swami Vivekanand</li>
                    <li>Rabindra Nath Tagore</li>
                    <li>MK Gandhi</li>
                    <li>Anne Frank</li>
                    <li>Led Zeppelin</li>
                    <li>Albert Einstein</li>
                    ---
                    <li>Michael Jackson</li>
                    <li>Bertrand Russell</li>
                    <li>Alan Turing</li>
                    <li>Oscar Wilde</li>
                    <li>John Keats</li>
                    <li>Paulo Coelho</li>
                    <li>Dante</li>
                </ul>
            </div>
        </div >
    )
}

