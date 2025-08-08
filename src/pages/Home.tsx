import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Camera, Award, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParallaxSection from '../components/ParallaxSection';
import LogoReveal from '../components/LogoReveal';

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/api/placeholder/1920/1080/1',
    '/api/placeholder/1920/1080/2',
    '/api/placeholder/1920/1080/3',
    '/api/placeholder/1920/1080/4',
  ];

  const peacockQuotes = [
    {
      quote: "In every peacock's pose, I find a new story of nature's grandeur and elegance.",
      author: "Bharat Bhambhaney"
    },
    {
      quote: "The peacock's dance is nature's poetry, my camera is the translator.",
      author: "Bharat Bhambhaney"
    },
    {
      quote: "400+ poses, each revealing the peacock's soul in a different light.",
      author: "Bharat Bhambhaney"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <>
      <ParallaxSection image="/api/placeholder/1920/1080/5">
        <LogoReveal logoSrc="/logo.svg" />
      </ParallaxSection>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating Feathers Animation */}
          <motion.div
            className="absolute top-20 left-10 w-12 h-12 opacity-30"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-accent-color to-gradient-blue-dark rounded-full shadow-lg" />
          </motion.div>
          
          <motion.div
            className="absolute top-40 right-20 w-8 h-8 opacity-25"
            animate={{
              y: [0, -40, 0],
              x: [0, -25, 0],
              rotate: [0, -360, -720],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-gradient-orange to-accent-color rounded-full shadow-lg" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-40 left-1/4 w-16 h-16 opacity-20"
            animate={{
              y: [0, -35, 0],
              x: [0, 30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-gradient-blue to-accent-color rounded-full shadow-lg" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 right-1/3 w-6 h-6 opacity-35"
            animate={{
              y: [0, -25, 0],
              x: [0, -15, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-accent-color to-gradient-orange-dark rounded-full shadow-lg" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/3 left-1/2 w-10 h-10 opacity-25"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-gradient-blue-dark to-accent-color rounded-full shadow-lg" />
          </motion.div>
        </div>

        {/* Background Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroImages[currentImageIndex]})`,
                filter: 'brightness(0.4)'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center text-white px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-playfair"
          >
            Bharat Bhambhaney
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-2xl md:text-4xl mb-8 text-accent-color"
          >
            Peacock Photography
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-text-secondary"
          >
            Specialized in capturing the majestic beauty of peacocks in 400+ unique poses
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent-color text-primary-color font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                View Gallery
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-accent-color text-accent-color font-semibold rounded-lg hover:bg-accent-color hover:text-primary-color transition-colors"
              >
                About Me
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-8 w-8 text-accent-color" />
          </motion.div>
        </motion.div>
      </section>

      {/* Peacock Quotes Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary-color to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
          >
            Wisdom Through the Lens
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {peacockQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-8 hover-lift"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <Heart className="h-12 w-12 text-accent-color mx-auto mb-4" />
                  <blockquote className="text-lg md:text-xl mb-4 italic">
                    "{quote.quote}"
                  </blockquote>
                  <cite className="text-accent-color font-semibold">
                    — {quote.author}
                  </cite>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Peacock Collections
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Explore my specialized collection of peacock photography across different poses and moods
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Courtship Poses", description: "Majestic displays of courtship and romance" },
              { title: "Feather Displays", description: "The art of peacock feather photography" },
              { title: "Natural Behavior", description: "Capturing peacocks in their natural habitat" }
            ].map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-accent-color to-gradient-blue-dark relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-white opacity-80" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-gray-300">
                    {collection.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent-color text-primary-color font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                View All Collections
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary-color">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Camera, number: "400+", label: "Peacock Poses" },
              { icon: Award, number: "25+", label: "Awards" },
              { icon: Star, number: "50+", label: "Exhibitions" },
              { icon: Heart, number: "15+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-6 hover-lift"
              >
                <stat.icon className="h-12 w-12 text-accent-color mx-auto mb-4" />
                <div className="text-3xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
