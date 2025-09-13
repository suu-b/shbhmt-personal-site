import React from "react";
import { Anchor } from "../Anchor";
import x from "../../../public/assets/mai_na_bhoolunga_hero.jpg"

export default function Contents() {
    return (
        <section className="flex flex-col items-center justify-center w-full px-4 mx-auto mt-12 text-slate-400">
            <p className="text-justify mb-5"><Anchor text="Nietzsche" link="https://en.wikipedia.org/wiki/Friedrich_Nietzsche" /> quotes: <i>Man is something that shall be overcome</i>, which essentially signals that we humans are in a permanent process of making ourselves. This site is dedicated to my making. It will consist of journals, life updates, meditations, research interests, media I liked (films and songs), book reviews, sketches, poems, opinions, and ideas. In a few words: it will log my intellectual evolution.
            </p>
        </section>
    );
}
