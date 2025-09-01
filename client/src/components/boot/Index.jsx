import { Link } from "react-router";

export default function Index() {
    const cardData = [
        {
            title: "Journals",
            description: "Reflections on some personal and interpersonal events, learnings, and life updates.",
            contentType: "journal"
        },
        {
            title: "Meditations", 
            description: "Opinions, Ideas, and Philosophical Intrigues.",
            contentType: "meditation"
        },
        {
            title: "Media",
            description: "Books, Films, TV Shows, and Songs",
            contentType: "media"
        },
        {
            title: "Notes from the Cerebrum",
            description: "Disciplines, Meta-disciplines, and nerdy topics.",
            contentType: "cerebrum"
        },
        {
            title: "Art",
            description: "My Artistic Attempts.",
            contentType: "art"
        },
        {
            title: "Poesy",
            description: "Poetry from the Romantic and the Shubham-ic tradition.",
            contentType: "poetry"
        }
    ];

    return (
        <section id="index" className="w-full">
            <h1 className="text-center text-2xl mb-8">Index</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
                {cardData.map((card, index) => (
                    <Link to={`/content/${card.contentType}`}>
                        <div
                            key={index}
                            className="min-h-[15vh] card p-5 border border-slate-400 rounded-lg 
                                      hover:cursor-pointer hover:bg-[#0F0E0E] 
                                      hover:shadow-[0_4px_10px_#0F0E0E] 
                                      transition-all duration-300 ease-in-out">
                        <h3 className="mb-3">{card.title}</h3>
                        <p className="text-base">{card.description}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
