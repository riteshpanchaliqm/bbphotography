import React from 'react';
import { motion } from 'framer-motion';
import { Award, Camera, Heart, Star, Users, Calendar, MapPin, Mail, Phone } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    {
      icon: Award,
      title: "National Wildlife Photography Award",
      year: "2023",
      description: "Recognized for outstanding contribution to peacock photography"
    },
    {
      icon: Star,
      title: "International Exhibition",
      year: "2022",
      description: "Featured in prestigious wildlife photography exhibitions across 5 countries"
    },
    {
      icon: Users,
      title: "500+ Happy Viewers",
      year: "2021",
      description: "Artwork appreciated by hundreds of photography enthusiasts worldwide"
    },
    {
      icon: Camera,
      title: "Specialized Expertise",
      year: "2020",
      description: "15+ years of dedicated peacock photography experience"
    }
  ];

  const skills = [
    { name: "Portrait Photography", percentage: 95 },
    { name: "Landscape Photography", percentage: 90 },
    { name: "Event Photography", percentage: 88 },
    { name: "Photo Editing", percentage: 92 },
    { name: "Studio Lighting", percentage: 85 },
    { name: "Drone Photography", percentage: 80 }
  ];

  const peacockQuotes = [
    "Like the peacock's magnificent display, I capture the true colors of life through my lens.",
    "Every photograph is a story waiting to be told, just like every feather tells a tale of beauty.",
    "In the dance of light and shadow, we find the poetry of existence."
  ];

  return (
    <div className="min-h-screen pt-20 bg-primary-color">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              About Bharat Bhambhaney
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              A specialized peacock photographer with over 15 years of experience capturing the majestic beauty of peacocks in 400+ unique poses
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-accent-color to-gradient-blue-dark rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-32 w-32 text-white opacity-80" />
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-4 text-gradient">
                The Story Behind the Lens
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                With over 15 years of experience in specialized peacock photography, I have dedicated my life to capturing the majestic beauty and intricate details of these magnificent birds. My journey began with a fascination for the peacock's natural elegance and has evolved into a career marked by patience, precision, and an unwavering commitment to showcasing nature's artistry.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                Specializing exclusively in peacock photography, I believe that every pose tells a unique story. Whether it's the dramatic courtship display, the subtle feather movements, or the natural behavior in their habitat, I strive to capture the essence of these magnificent creatures in their most authentic moments.
              </p>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent-color" />
                  <span className="text-text-secondary">bharat@bbphotography.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent-color" />
                  <span className="text-text-secondary">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-accent-color" />
                  <span className="text-text-secondary">Mumbai, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-accent-color" />
                  <span className="text-text-secondary">Available for bookings</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Peacock Quotes Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary-color to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gradient"
          >
            Philosophy Through the Lens
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {peacockQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-8 text-center hover-lift"
              >
                <Heart className="h-12 w-12 text-accent-color mx-auto mb-4" />
                <blockquote className="text-lg italic text-text-primary">
                  "{quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gradient"
          >
            Awards & Achievements
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-6 text-center hover-lift"
              >
                <achievement.icon className="h-12 w-12 text-accent-color mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <div className="text-accent-color font-bold mb-2">{achievement.year}</div>
                <p className="text-text-secondary text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-primary-color">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gradient"
          >
            Technical Expertise
          </motion.h2>
          
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{skill.name}</span>
                  <span className="text-accent-color font-semibold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-accent-color to-yellow-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artistic Focus Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-primary-color">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-gradient"
          >
            Artistic Focus
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Courtship Displays",
                description: "Capturing the dramatic courtship displays and poses",
                icon: Users
              },
              {
                title: "Feather Artistry",
                description: "Close-up shots of intricate feather patterns and colors",
                icon: Heart
              },
              {
                title: "Natural Moments",
                description: "Peacocks in their natural habitat and daily activities",
                icon: Camera
              }
            ].map((focus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-8 text-center hover-lift"
              >
                <focus.icon className="h-16 w-16 text-accent-color mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">{focus.title}</h3>
                <p className="text-text-secondary">{focus.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Passion Statement */}
      <section className="py-20 px-4 bg-primary-color">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gradient">
              A Passion for Peacock Photography
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              This is not a business, but a lifelong passion for capturing the majestic beauty of peacocks. Every photograph is a labor of love, dedicated to showcasing nature's most magnificent displays.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block px-8 py-4 border-2 border-accent-color text-accent-color font-semibold rounded-lg"
            >
              Artistic Journey
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
