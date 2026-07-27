import { Link } from "react-router";
import bird from "/assets/bird.jpg";
import { motion } from "framer-motion";
import { GoLinkExternal } from "react-icons/go";
import { Anchor } from "../Anchor";

export default function Poem() {
  return (
    <section
      id="index"
      className="w-full border border-slate-400 rounded-lg pt-3 pb-8"
    >
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 p-6 md:p-8">
        <div className="text-base flex flex-col items-center text-center max-w-sm">
          <h1 className="text-center text-2xl font-semibold">
            'Hope' is the thing with feathers
          </h1>
          <p className="text-slate-400 mt-1">
            ~{" "}
            <Anchor
              text="Emily Dickinson"
              link="https://en.wikipedia.org/wiki/Emily_Dickinson"
            />
          </p>
          <img
            src={bird}
            alt="Emily Dickinson's poem illustration"
            className="rounded-full h-[240px] w-[240px] md:h-[300px] md:w-[300px] mx-auto mt-6 object-cover shadow-md"
          />
          <a
            href="https://youtu.be/g5wEqF7NtcI?list=PLE2EF7yo6iH3O8a3QkUn9F8bQEYOb51sg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block mt-5"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full flex justify-center items-center text-base px-3 py-2 border border-slate-400 border-1 rounded-lg bg-slate-400 text-[#101010] font-medium"
            >
              Recitation by Mairin O'Hagan <GoLinkExternal className="ml-3" />
            </motion.button>
          </a>
        </div>
        <p className="text-left w-fit mx-auto leading-relaxed text-slate-300 px-4 md:px-0">
          'Hope' is the thing with feathers -<br />
          That perches in the soul -<br />
          And sings the tune without the words -<br />
          And never stops - at all - <br /> <br />
          And sweetest - in the Gale - is heard -<br />
          And sore must be the storm -<br />
          That could abash the little Bird
          <br />
          That kept so many warm -<br />
          <br />
          I’ve heard it in the chillest land -<br />
          And on the strangest Sea -<br />
          Yet - never - in Extremity,
          <br />
          It asked a crumb - of me.
          <br />
        </p>
      </div>
    </section>
  );
}
