import { Link } from "react-router";
import { GoLinkExternal } from "react-icons/go";

export default function Index() {
  const cardData = [
    {
      title: "Meditations",
      description: "Know Thyself",
      quotedBy: "Aristotle",
      contentType: "meditation",
    },
    {
      title: "Notes from the Cerebrum",
      quotedBy: "John Keating, Dead Poet's Society",
      description:
        "Medicine, law, business, engineering, these are all noble pursuits, and necessary to sustain life...",
      contentType: "cerebrum",
    },
    {
      title: "I am Human",
      quotedBy: "John Keating, Dead Poet's Society",
      description:
        "...But poetry, beauty, romance, love, these are what we stay alive for.",
      contentType: "humanities",
    },
  ];

  return (
    <section id="index" className="w-full">
      <h1 className="text-center text-2xl">My Blogs</h1>
      <div className="flex justify-center gap-6 max-w-8xl mx-auto">
        <Link className="my-5" to={"/content/becoming"}>
          <div
            className="w-full h-[200px] p-5 border border-slate-400 rounded-lg
                        hover:cursor-pointer hover:bg-[#0F0E0E]
                        hover:shadow-[0_4px_10px_#0F0E0E]
                        transition-all duration-300 ease-in-out flex flex-col"
          >
            <div className="flex justify-center items-center">
              <h3 className="mr-2 text-center font-bold text-slate-400">
                Becoming!
              </h3>
              <GoLinkExternal />
            </div>
            <p className="text-base flex-1">
              Man is nothing else but what he purposes, he exists only in so far
              as he realizes himself, he is therefore nothing else but the sum
              of his actions, nothing else but what his life is.
            </p>
            <p className="text-base text-right">~ Jean-Paul Sartre</p>
          </div>
        </Link>
      </div>

      <div className="flex justify-center gap-6 max-w-8xl mx-auto">
        {cardData.map((card, index) => (
          <Link key={index} to={`/content/${card.contentType}`}>
            <div
              className="w-[280px] h-[250px] p-5 border border-slate-400 rounded-lg
                        hover:cursor-pointer hover:bg-[#0F0E0E]
                        hover:shadow-[0_4px_10px_#0F0E0E]
                        transition-all duration-300 ease-in-out flex flex-col"
            >
              <div className="flex mb-5 justify-between">
                <h3 className="mr-2 font-bold text-slate-400">{card.title}</h3>
                <GoLinkExternal />
              </div>
              <p className="text-base flex-1">{card.description}</p>
              <p className="text-base text-right">~ {card.quotedBy}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
