import { useState, useEffect } from "react";
import axios from "axios";

import border from "/assets/border.png";

export default function Substack() {
  const [substackArticles, setSubstackArticles] = useState(null);

  useEffect(() => {
    const fetchSubstackFeed = async () => {
      try {
        const response = await axios.get(`/substack`);
        setSubstackArticles(response.data.simplified.slice(0, 3));
      } catch (e) {
        console.error("Error fetching Substack RSS feed:", e);
      }
    };

    fetchSubstackFeed();
  }, []);

  return (
    <section
      id="substack-section"
      className="flex flex-col items-center justify-center w-full max-w-2xl px-4 mx-auto mt-16"
    >
      <img src={border} alt="border" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-6" />

      {substackArticles ? (
        <div className="w-full">
          <h1 className="text-2xl font-bold text-slate-300 text-center mb-8">
            Some of my recent articles
          </h1>
           <p className="text-xl font-light text-justify mt-3 mb-10">Following are some of my latest articles on Substack. They're totally non-technical dealing with philosophy, art, and literature. If these topics click your interest, do give them a read: </p>
          <div className="bg-black border border-neutral-800 rounded-2xl shadow-md p-6 space-y-6">
            {substackArticles.map((article, index) => (
              <div key={index} className="text-white">
                <h2 className="text-xl md:text-xl font-semibold">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Published on:{" "}
                  {new Date(article.pubDate).toLocaleDateString()}
                </p>
                <p className="text-base text-gray-400 mt-1">
                  {article.description}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-base text-slate-200 hover:text-slate-100 hover:underline hover:underline-offset-4 transition-colors"
                >
                  Read more →
                </a>

                {index < substackArticles.length - 1 && (
                  <hr className="border-t border-neutral-700 mt-6 mb-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic mt-10">Loading articles...</p>
      )}
    </section>
  );
}
