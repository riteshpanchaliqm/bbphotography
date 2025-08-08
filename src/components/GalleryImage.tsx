import React, { useRef, useEffect } from 'react';

const loadGsap = async () => {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return gsap;
};

interface GalleryImageProps {
  src: string;
  title: string;
  onClick?: () => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ src, title, onClick }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    loadGsap().then(gsap => {
      if (!imgRef.current) return;
      gsap.from(imgRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top 80%'
        }
      });
      const enter = () => gsap.to(imgRef.current, { scale: 1.05, duration: 0.3 });
      const leave = () => gsap.to(imgRef.current, { scale: 1, duration: 0.3 });
      imgRef.current.addEventListener('mouseenter', enter);
      imgRef.current.addEventListener('mouseleave', leave);
      return () => {
        imgRef.current?.removeEventListener('mouseenter', enter);
        imgRef.current?.removeEventListener('mouseleave', leave);
      };
    });
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={title}
      loading="lazy"
      onClick={onClick}
      className="w-full h-full object-cover cursor-pointer"
    />
  );
};

export default GalleryImage;
