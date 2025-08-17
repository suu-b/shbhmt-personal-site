import Article from "../Article";

export default function ArtificialIntelligence() {
    return (
        <section id="ai" className="w-full max-w-2xl px-4 pt-10 mx-auto">
            <h1 className="text-4xl text-center mb-0">Artificial Intelligence</h1>
            <p className="text-slate-400 text-center italic mb-10 text-base">"Can machines think?" ~ Alan M Turing</p>
            <div id="content" className="text-justify"><Article fileName="artificial-intelligence" /></div>
        </section>
    )
}
