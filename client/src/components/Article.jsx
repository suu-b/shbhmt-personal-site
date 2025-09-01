import { useEffect, useState } from "react";
import { useParams } from "react-router"
import getArticle from "../util/getArticle";
import formatDate from "../util/convertDate";

export default function Article(){
    const [articleContent, setArticleContent] = useState(null);

    const params = useParams();
    const title = params.title;
    const date = params.date;
    const contentType = params.contentType;

    useEffect(() => {
        getArticle(title, date, contentType).then(content =>{
            setArticleContent(content);
        })
    }, [])

    return(
        <section className="py-10">
            <h1 className="text-5xl mt-20 ">{title}</h1>
            <div className="mb-2 mt-3 flex justify-start items-center">
                <p className="font-light text-base tracking-wide">{formatDate(date)}</p>
                <p className="mx-2 font-light text-base tracking-wide">|</p>
                <p className= "font-light text-base tracking-wide bg-[#9CA3AF] rounded px-2 text-[#101010] bg-opacity-70">{contentType}</p>
            </div>
            {articleContent && <p className="font-light text-justify mt-5 leading-relaxed">{articleContent}</p>}
        </section>
    )
}