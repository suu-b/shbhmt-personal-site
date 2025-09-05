import { Link, useParams } from "react-router";
import { getDataFromContentType } from "../util/getDataFromContentType";
import getArticleList from "../util/getArticleList";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function Content(){
    const [cardsData, setCardsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const contentType = useParams().contentType;
    const contentData = getDataFromContentType(contentType);

    useEffect(() => {
      setLoading(true);
      getArticleList(contentType).then(cd => {
        setCardsData(cd);
        setLoading(false);
      });
    }, [contentType]);

    return(
        <section className="py-10">
            <h1 className="text-5xl mt-20">{contentData?.title}</h1>
            <p className="my-2">{contentData?.description}</p>
            <div className="mt-10">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <PulseLoader 
                            color="#9CA3AF" 
                            size={12} 
                            margin={4}
                        />
                    </div>
                ) : cardsData && cardsData.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-lg text-slate-500">No entries yet, awaiting them...</p>
                    </div>
                ) : cardsData && cardsData.map((card, index) => (
                    <Link 
                        key={index} 
                        to={`/article/${contentType}/${card.date}/${card.title}`}
                        state={{ 
                            description: card.description,
                            thumbnail: card.thumbnail,
                            credits: card.credits
                        }}
                    >
                    <div className="card p-5 my-3 border border-slate-400 border-1 rounded-lg hover:cursor-pointer hover:shadow-lg hover:bg-[#0F0E0E] transition-all duration-300 ease-in-out">
                        <h3 className="hover:text-[#C4C4C4]  mb-1 text-2xl font-semibold">{card.title}</h3>
                        <p className="text-base mb-2">{card.description}</p>
                        <p className="text-sm text-slate-500">{card.date}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </section>
    )    
}