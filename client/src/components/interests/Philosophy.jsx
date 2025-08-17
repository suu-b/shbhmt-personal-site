import Article from "../Article";

export default function Philosophy() {
    return (
        <section id="philosophy" className="w-full max-w-2xl px-4 pt-10 mx-auto">
            <h1 className="text-4xl text-center mb-0">Philosophy</h1>
            <p className="text-slate-400 text-center italic mb-10 text-base">"Change Has Never Been This Fast. It Will Never Be This Slow Again" ~ Justin Trudeau</p>
            <div id="content"><Article fileName="philosophy" /></div>
        </section>
    )
}
