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
      <div className="flex justify-center items-center">
        <div className="p-8 text-base">
          <h1 className="text-center text-2xl">
            'Hope' is the thing with feathers
          </h1>
          ~{" "}
          <Anchor
            text="Emily Dickinson"
            link="https://en.wikipedia.org/wiki/Emily_Dickinson"
          />
          <img
            src={bird}
            alt=""
            className="rounded-full h-[300px] w-[300px] mx-auto my-auto mt-8"
          />
          <a
            href="https://youtu.be/g5wEqF7NtcI?list=PLE2EF7yo6iH3O8a3QkUn9F8bQEYOb51sg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full flex mt-5 justify-center items-center text-base px-3 py-1 border border-slate-400 border-1 rounded-lg bg-slate-400 text-[#101010]"
            >
              Recitation by Mairin O'Hagan <GoLinkExternal className="ml-3" />
            </motion.button>
          </a>
        </div>
        <p className="text-justify w-fit mx-auto">
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
