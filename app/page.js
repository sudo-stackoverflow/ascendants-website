import Image from "next/image";
import GenesisGems from "./components/genesisgems";
import AscendantsSection from "./components/ascendantsSection";
import LoreSection from "./components/loreSection";
import RoadMapSection from "./components/RoadMapSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import LeaderboardSection from "./components/leaderboardSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import StakeSection from "./components/StakeSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GenesisGems
        bgTexture="/assets/genesisBg.png"
        // shardsOverlay="/images/red-shards.png"
        gemArt="/assets/allgems.gif"
      />
      <AscendantsSection />
      <LeaderboardSection />
      <LoreSection />
      <RoadMapSection />
      <FaqSection />
      {/* <StakeSection /> */}
      <Footer />
    </>
  );
}
