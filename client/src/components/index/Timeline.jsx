export default function Timeline() {
    return (
        <section id="timeline" className="w-full max-w-2xl px-4 pt-10 mx-auto">
            <h1 className="text-4xl text-center mb-0">Timeline</h1>
            <div id="content">
                <p className="text-slate-300 text-lg  mt-5 mb-8 text-justify">
                    The page is aimed to keep a record of the development of the
                    site. It will be updated as the project progresses.
                    Basically, an index keeping records of every new roll/update
                    major or minor in the site.
                </p>
                <ol className="text-slate-300 text-lg  my-5 text-justify">
                    <li className="my-3">
                        <span className="italic font-light">January 2025:</span>{" "}
                        v1 was deployed. It all happened when I decided to
                        create the portfolio summarizing my technical skills,
                        status, projects and contact info. It was typical,
                        minimalistic, full-stack dev portfolio with nothing
                        interesting.
                    </li>
                    <li className="my-3">
                        <span className="italic font-light">
                            22 March 2025:
                        </span>{" "}
                        v2 was ideated. I was surfing youtube when I ended up
                        somewhere. It inspired me to make the site a preface
                        (not portfolio).
                    </li>
                    <li className="my-3">
                        <span className="italic font-light">
                            30 March 2025:
                        </span>{" "}
                        v2 was deployed on netlify.
                    </li>
                    <li className="my-3">
                        <span className="italic font-light">
                            31 March 2025:
                        </span>{" "}
                        AI page rolled out.
                    </li>
                    <li className="my-3">
                        <span className="italic font-light">8 Jun 2025:</span>{" "}
                        Substack articles section rolled out.
                    </li>
                    <li className="my-3">
                        <span className="italic font-light">16 Jul 2025:</span>
                        Added a section to keep a quote/poem that has put an
                        impact on me lately.
                    </li>
                </ol>
            </div>
        </section>
    );
}
