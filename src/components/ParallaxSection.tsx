import React, { useRef, useEffect, PropsWithChildren } from 'react';

// Load gsap lazily to avoid issues during testing if the package isn't installed.
// This dynamic import will only run in the browser.
const loadGsap = async () => {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
};

interface ParallaxProps extends PropsWithChildren<{}> {
  image: string;
  speed?: number; // Parallax speed factor
}

const ParallaxSection: React.FC<ParallaxProps> = ({ image, speed = 0.5, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    loadGsap().then(({ gsap }) => {
      if (!ref.current) return;
      ctx = gsap.context(() => {
        gsap.to(ref.current, {
          backgroundPositionY: `${speed * 100}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            scrub: true
          }
        });
      }, ref);
    });
    return () => ctx && ctx.revert();
  }, [speed]);

  return (
    <section
      ref={ref}
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
    </section>
  );
};

export default ParallaxSection;
