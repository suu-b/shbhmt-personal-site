import Introduction from "./Introduction";
import Contents from "./Contents";
import Index from "./Index";

export default function LandingPage() {
    return (
        <section id="landing-page">
            <Introduction />
            <Contents />
            <Index/>
        </section>
    );
}
