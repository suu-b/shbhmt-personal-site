import React from "react";
import { Link } from "react-router";
import Poem from "./Poem";

import border from "/assets/border.png";

export default function Contents() {
    const introText1 =
        "This site is about me, my ideas, and my pursuits. Though, it too for the reason I presented previously, would fail to define my true picture. However, I’m certain that it would serve as a good preface to me. Further, in case our ideas resonate, a letter of mine to you so that we can connect.";
    const introText2 =
        "As you might’ve observed until now, the site is not a conventional portfolio – it is not an array of accomplishments, but a repository of whatever I am. Kinda timeline of my intellectual evolution. On top of that, you’ll encounter a dearth of visual elements. If you bear any interest in knowing why (or to understand the whole design philosophy of the site), you can check the article on the site’s design philosophy (head to the compass you see on the top right corner).";
    const introText3 =
        "Thus, I welcome you to my preface. For whatever reason you’re here, I hope you depart with gains, not losses.";

    const interestText =
        "My computer science degree (which I stumbled across without prior thought or planning) has unexpectedly brought me a fate of exploration and intellectual upliftment. Earlier, I was a smart kid but naïve, sincere but mediocre, to sum up– something crude. I am still crude, lesser though, but at least, I realize that. Now, everything seems to fall in place – not the whole life but a sense of purpose. I am grateful for this. I can spend years writing like this about me or probably philosophizing, after all, I am a writer; however, for the sake of your ease, let me list all that is me. Interests are a great representation of one’s personality. Thus, let me list what I am. You can follow any card to dive into my takes, aspirations, and/or my progress in each of my interest fields:";

    const cards = [
        {
            title: "Technology",
            description: "A sum of Computer Science and Software Engineering",
        },
        {
            title: "Artificial Intelligence",
            description:
                "Artifical Intelligence, though could've been covered in Technology, for me it deserves a whole section.",
        },
        {
            title: "Philosophy",
            description:
                "The urgent need of philosophers for the modern world. My reflection.",
        },
        {
            title: "Mythology",
            description: "A sum of myths and why I love them.",
        },
        {
            title: "Learning",
            description:
                "[Under Development] Probably an extension of epistemology subsection of philosophy.",
        },
        {
            title: "Teaching",
            description:
                "[Under Development] Could serve as a pillar with Learning supporting some higher purpose.",
        },
        {
            title: "History",
            description:
                "[Under Development] The father field of everything (for me).",
        },
        {
            title: "Art",
            description:
                "[Under Development] My naive attempts at painting and sketching.",
        },
        {
            title: "Music",
            description:
                "[Under Development] My inner whims to study music theory and learn some instrument",
        },
        {
            title: "Pokémon",
            description:
                "[Under Development] My favourite show (and yeah, games too count).",
        },
        { title: "Literature", description: "[Under Development] A pursuit." },
        {
            title: "Misc.",
            description:
                "[Under Development] When something feels too big to be left but too small to be a section.",
        },
    ];

    return (
        <section className="flex flex-col items-center justify-center w-full max-w-2xl px-4 mx-auto mt-12">
            <p className="text-xl font-light text-justify mb-5">{introText1}</p>
            <p className="text-xl font-light text-justify mb-5">{introText2}</p>
            <p className="text-xl font-light text-justify mb-5">{introText3}</p>
            <Poem />
            <img src={border} alt="border" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg my-5" />
            <p className="text-xl font-light text-justify mb-5">
                {interestText}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-5 mb-8 w-full">
                {cards.map((card, index) => (
                    <Link
                        to={`/${card.title.toLowerCase().replace(" ", "-")}`}
                        key={index}
                        className="p-4 w-full max-w-xs h-[200px] bg-black rounded-lg hover:shadow-xl text-left cursor-pointer"
                    >
                        <h3 className="text-xl font-semibold text-slate-300">
                            {card.title}
                        </h3>
                        <p className="text-base font-light mt-2 text-slate-400">
                            {card.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
