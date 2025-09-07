import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router"

import slugify from "../../util/slugifyTitle"
import formatDate from "../../util/convertDate"
import capitalizeFirst from "../../util/capitalizeFirst"


export default function Banner() {
    const title = "On building a Personal Site";
    const thumbnail = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Caillebotte_-_Portrait_of_a_Man_Writing_in_His_Study%2C_1885.jpg";
    const alt ="Caillebotte - Portrait of a Man Writing in His Study 1885 from WikiMedia Commons";
    const desc = "A Confession and a Justification on building this site";
    const date = "2025-09-07";
    const category = "journal";
    const credits = alt;
   
    return (
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mx-auto my-8 px-4 border p-5 border-2 border-[#2D3033] rounded-lg"
        >            <motion.div
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-lg shadow-lg mb-6"
            >
                <img 
                    src={thumbnail}
                    alt={alt}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-[#101010] shadow px-3 py-1 rounded-full text-sm font-medium bg-opacity-90">
                        Featured
                    </span>
                </div>
            </motion.div>
            <div className="space-y-2">
                <h2 className="text-3xl text-slate-400">{title}</h2>
                
                <p className="text-base text-slate-400 leading-relaxed font-light">{desc}</p>
                
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="font-light">{formatDate(date)}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="font-light">{capitalizeFirst(category)}</span>
                </div>

                <div className="pt-3 flex justify-end">
                    <Link 
                        to={`/article/${category}/${date}/${slugify(title)}`}
                        state={{ title: title, description: desc, thumbnail,credits }}
                    >
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="text-base px-3 py-1 border border-slate-400 border-1 rounded-lg bg-slate-400 text-[#101010]"
                        >
                            Read
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.section>
    )
} 