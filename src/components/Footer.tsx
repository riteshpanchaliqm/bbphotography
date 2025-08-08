import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-text-primary">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Camera className="h-8 w-8 text-accent-color" />
              <span className="text-2xl font-bold text-gradient">
                Bharat Bhambhaney
              </span>
            </div>
            <p className="text-text-secondary mb-6 max-w-md">
              A passionate journey into the world of peacock photography, capturing the majestic beauty and intricate details of nature's most magnificent birds.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-800 rounded-full text-accent-color hover:bg-accent-color hover:text-primary-color transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gradient">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/gallery', label: 'Gallery' },
                { path: '/about', label: 'About' },
                { path: '/admin', label: 'Admin' }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-accent-color transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-gradient">About</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent-color" />
                <span className="text-text-secondary">Mumbai, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-accent-color" />
                <span className="text-text-secondary">Passion Project</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © {currentYear} Bharat Bhambhaney Photography. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-text-secondary text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-text-secondary text-sm">for photography lovers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
