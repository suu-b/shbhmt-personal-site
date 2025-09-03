import { Link, useParams } from "react-router";
import { getDataFromContentType } from "../util/getDataFromContentType";
import getArticleList from "../util/getArticleList";
import { useEffect, useState } from "react";

export default function Content(){
    const [cardsData, setCardsData] = useState(null);
    const contentType = useParams().contentType;
    const contentData = getDataFromContentType(contentType);

    useEffect(() => {
      getArticleList(contentType).then(cd => {
        setCardsData(cd);
      });
    }, [contentType]);

    return(
        <section className="py-10">
            <h1 className="text-5xl mt-20">{contentData?.title}</h1>
            <p className="my-2">{contentData?.description}</p>
            <div className="mt-10">
                {cardsData && cardsData.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-lg text-slate-500">No entries yet, awaiting them...</p>
                    </div>
                ) : cardsData && cardsData.map((card, index) => (
                    <Link key={index} to={`/article/${contentType}/${card.date}/${card.title}`}>
                    <div className="card p-5 my-3 border border-slate-400 border-1 rounded-lg hover:cursor-pointer hover:bg-[#0F0E0E] hover:text-white transition-all duration-300 ease-in-out">
                        <h3 className="mb-3 text-lg font-semibold">{card.title}</h3>
                        <p className="text-base mb-2">{card.description}</p>
                        <p className="text-sm text-slate-500">{card.date}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </section>
    )    
}