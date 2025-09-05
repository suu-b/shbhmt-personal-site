import Introduction from "./Introduction";
import Contents from "./Contents";
import Index from "./Index";
import Banner from "./Banner";

import border from "/assets/border.png"; 

export default function LandingPage() {
    return (
        <section id="landing-page">
            <Introduction />
            <Contents />
            <img src={border} alt="border" className="w-[40%] my-5 mx-auto" />
            <Banner />
            <img src={border} alt="border" className="w-[40%] my-5 mx-auto" />
            <Index/>
        </section>
    );
}
