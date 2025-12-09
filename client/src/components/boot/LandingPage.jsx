import Introduction from "./Introduction";
import Contents from "./Contents";
import Index from "./Index";
import Banner from "./Banner";

import border from "/assets/border.png";
import Poem from "./Poem";

export default function LandingPage() {
  return (
    <section id="landing-page">
      <Introduction />
      <Contents />
      <img src={border} alt="border" className="w-[40%] my-5 mx-auto" />
      <Banner />
      <img src={border} alt="border" className="w-[40%] my-5 mx-auto" />
      <Index />
      <img src={border} alt="border" className="w-[40%] my-5 mx-auto" />
      <h1 className="text-center text-2xl mb-5">A Beloved Poem</h1>
      <Poem />
    </section>
  );
}
