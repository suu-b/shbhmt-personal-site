import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router"

import formatDate from "../../util/convertDate"


export default function Banner() {

    const thumbnail = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-Ij63pIkCbTs%2FX7WZfJKpkdI%2FAAAAAAAG4K0%2Fbs-4HA2HRkwt-z_Zyolc6lsZ-vbbDwNpACPcBGAsYHg%2Fs16000%2FVincent-van-Gogh-The-Starry-Night-Saint-Remy-June-1889-MoMa-detail.jpg&f=1&nofb=1&ipt=9336ef758a54a129bd7eb88885a1726d709161b672b7df197b288b9d7ef104f4";
    const alt = "Van Gogh's The Starry Night 1889 - The painting I had in my mind while writing this essay";
    const desc = "My meditation on art and a condolence to myself for yet another rejection from a journal";    
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
                <h2 className="text-3xl text-slate-400">
                    On Art and for the Artist
                </h2>
                
                <p className="text-base text-slate-400 leading-relaxed font-light">{desc}</p>
                
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="font-light">{formatDate("2025-09-04")}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="font-light">journal</span>
                </div>

                <div className="pt-3 flex justify-end">
                    <Link 
                        to="http://localhost:5000/article/meditation/2025-09-04/On%20Art%20and%20for%20the%20Artist"
                        state={{ description: desc, thumbnail,credits }}
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