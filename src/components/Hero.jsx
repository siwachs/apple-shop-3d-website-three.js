import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowSize from "../hooks/useWindowSize";

import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const { width } = useWindowSize();

  useGSAP(() => {
    gsap.to("#hero-title", {
      opacity: 1,
      delay: 2,
    });

    gsap.to("#call-to-action", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero-title" className="hero-title">
          iPhone 15 Pro
        </p>

        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline
            key={width < 760 ? smallHeroVideo : heroVideo}
          >
            <source
              src={width < 760 ? smallHeroVideo : heroVideo}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div
        id="call-to-action"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
