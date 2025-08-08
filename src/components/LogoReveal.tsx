import React, { useRef, useEffect } from 'react';

const loadGsap = async () => {
  const { gsap } = await import('gsap');
  return gsap;
};

interface LogoRevealProps {
  logoSrc: string;
}

const LogoReveal: React.FC<LogoRevealProps> = ({ logoSrc }) => {
  const maskRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    loadGsap().then(gsap => {
      if (!maskRef.current) return;
      gsap.fromTo(
        maskRef.current,
        { width: 0 },
        { width: '100%', duration: 2, ease: 'power2.out' }
      );
    });
  }, []);

  return (
    <svg viewBox="0 0 500 200" className="w-64 h-24">
      <defs>
        <mask id="reveal-mask">
          <rect ref={maskRef} x="0" y="0" width="0" height="200" fill="#fff" />
        </mask>
      </defs>
      <image href={logoSrc} x="0" y="0" width="500" height="200" mask="url(#reveal-mask)" />
    </svg>
  );
};

export default LogoReveal;
