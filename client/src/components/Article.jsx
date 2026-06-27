import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { ClipLoader } from "react-spinners";

import getArticle from "../util/getArticle";
import formatDate from "../util/convertDate";

export default function Article() {
  const [articleContent, setArticleContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const location = useLocation();
  const date = params.date;
  const contentType = params.contentType;

  const { title, description, thumbnail, credits } = location.state || {};

  useEffect(() => {
    setLoading(true);
    getArticle(title, date, contentType).then((content) => {
      setArticleContent(content);
      setLoading(false);
    });
  }, [title, date, contentType]);

  useEffect(() => {
    if (!loading && window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [loading, articleContent]);

  let cleanHTML = null;
  if (articleContent) {
    const renderer = {
      br() {
        return '<p class="tight-br"></p>';
      },
    };

    marked.use({ renderer });
    const dirty = marked.parse(articleContent, { gfm: true, breaks: true });

    cleanHTML = DOMPurify.sanitize(dirty, {
      ADD_ATTR: [
        "href",
        "target",
        "rel",
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "src",
      ],
      ADD_TAGS: ["iframe"],
      ALLOWED_URI_REGEXP: /^https?:\/\//,
    });
  }

  return (
    <section className="article py-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl mt-10 md:mt-20">{title}</h1>

      {description && (
        <p className="text-lg text-slate-400 mt-4 mb-6 leading-relaxed">
          {description}
        </p>
      )}

      <div className="mb-2 mt-3 flex justify-start items-center">
        <p className="font-light text-base tracking-wide">{formatDate(date)}</p>
        <p className="mx-2 font-light text-base tracking-wide">|</p>
        <p className="font-light text-base tracking-wide bg-[#9CA3AF] rounded px-2 text-[#101010] bg-opacity-70">
          {contentType}
        </p>
      </div>

      {thumbnail && (
        <div className="my-6">
          <img
            src={thumbnail}
            alt={credits || "Article thumbnail"}
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
          {credits && (
            <p className="text-sm text-slate-500 mt-2 text-center">{credits}</p>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader color="#9CA3AF" size={35} />
        </div>
      ) : (
        cleanHTML && (
          <div
            className="article-content font-light text-left mt-5 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
        )
      )}
    </section>
  );
}
